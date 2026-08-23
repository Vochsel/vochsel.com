#!/usr/bin/env python3
"""Prepare photos and one timelapse for the vochsel.com 3D print log."""

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

IMAGE_EXTENSIONS = {'.avif', '.heic', '.heif', '.jpeg', '.jpg', '.png', '.tif', '.tiff', '.webp'}
VIDEO_EXTENSIONS = {'.avi', '.m4v', '.mkv', '.mov', '.mp4', '.webm'}


def fail(message: str) -> None:
    print(f'error: {message}', file=sys.stderr)
    raise SystemExit(1)


def require_command(name: str) -> None:
    if shutil.which(name) is None:
        fail(f'required command not found: {name}')


def run(command: list[str]) -> str:
    result = subprocess.run(command, check=True, text=True, capture_output=True)
    return result.stdout.strip()


def dimensions(path: Path, command: str) -> tuple[int, int]:
    if command == 'identify':
        output = run(['identify', '-format', '%w %h', str(path)])
    else:
        output = run([
            'ffprobe', '-v', 'error', '-select_streams', 'v:0',
            '-show_entries', 'stream=width,height', '-of', 'csv=s=x:p=0', str(path),
        ]).replace('x', ' ')
    width, height = output.split()
    return int(width), int(height)


def probe_float(path: Path, entries: str) -> str:
    return run([
        'ffprobe', '-v', 'error', '-select_streams', 'v:0',
        '-show_entries', entries, '-of', 'default=nokey=1:noprint_wrappers=1', str(path),
    ]).splitlines()[0].strip()


def source_fps(path: Path) -> float:
    rate = probe_float(path, 'stream=r_frame_rate')
    numerator, _, denominator = rate.partition('/')
    denominator_value = float(denominator) if denominator else 1.0
    if denominator_value == 0:
        return 30.0
    return float(numerator) / denominator_value


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--slug', required=True, help='lowercase kebab-case print slug')
    parser.add_argument('--image', action='append', default=[], type=Path, help='photo path; repeat as needed')
    parser.add_argument('--video', type=Path, help='optional timelapse path')
    parser.add_argument('--output-dir', type=Path, default=Path('public/prints'))
    parser.add_argument('--url-prefix', default='/prints')
    parser.add_argument(
        '--max-duration', type=float, default=10.0,
        help='cap the timelapse at this many seconds by speeding it up (0 disables)',
    )
    args = parser.parse_args()

    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', args.slug):
        fail('--slug must contain only lowercase letters, numbers, and single hyphens')
    if not args.image and not args.video:
        fail('provide at least one --image or --video')

    for image in args.image:
        if not image.is_file():
            fail(f'image not found: {image}')
        if image.suffix.lower() not in IMAGE_EXTENSIONS:
            fail(f'unsupported image extension: {image.suffix}')
    if args.video:
        if not args.video.is_file():
            fail(f'video not found: {args.video}')
        if args.video.suffix.lower() not in VIDEO_EXTENSIONS:
            fail(f'unsupported video extension: {args.video.suffix}')

    if args.image:
        require_command('magick')
        require_command('identify')
    if args.video:
        require_command('ffmpeg')
        require_command('ffprobe')

    args.output_dir.mkdir(parents=True, exist_ok=True)
    image_outputs = [
        args.output_dir / (f'{args.slug}.jpg' if len(args.image) == 1 else f'{args.slug}-{index:02d}.jpg')
        for index in range(1, len(args.image) + 1)
    ]
    video_output = args.output_dir / f'{args.slug}.mp4' if args.video else None
    outputs = image_outputs + ([video_output] if video_output else [])
    collisions = [str(path) for path in outputs if path.exists()]
    if collisions:
        fail('refusing to overwrite: ' + ', '.join(collisions))

    result: dict[str, object] = {'slug': args.slug, 'images': []}
    created: list[Path] = []
    try:
        for source, output in zip(args.image, image_outputs):
            run([
                'magick', str(source), '-auto-orient', '-resize', '2000x2000>',
                '-strip', '-quality', '85', str(output),
            ])
            created.append(output)
            width, height = dimensions(output, 'identify')
            result['images'].append({
                'src': f"{args.url_prefix.rstrip('/')}/{output.name}",
                'width': width,
                'height': height,
            })

        if args.video and video_output:
            scale = "scale=w='min(1920,iw)':h='min(1080,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2"
            source_duration = float(probe_float(args.video, 'format=duration'))
            speedup = 1.0
            if args.max_duration > 0 and source_duration > args.max_duration:
                speedup = source_duration / args.max_duration
            filters = [scale]
            if speedup > 1.0:
                filters.append(f'setpts=PTS/{speedup:.6f}')
                filters.append(f'fps={source_fps(args.video):.6f}')
            run([
                'ffmpeg', '-y', '-i', str(args.video), '-map', '0:v:0', '-an',
                '-vf', ','.join(filters),
                '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p',
                '-movflags', '+faststart', str(video_output),
            ])
            created.append(video_output)
            width, height = dimensions(video_output, 'ffprobe')
            result['video'] = {
                'src': f"{args.url_prefix.rstrip('/')}/{video_output.name}",
                'width': width,
                'height': height,
                'duration': round(float(probe_float(video_output, 'format=duration')), 2),
                'sourceDuration': round(source_duration, 2),
                'speedup': round(speedup, 2),
            }
    except (subprocess.CalledProcessError, ValueError) as error:
        for path in created:
            path.unlink(missing_ok=True)
        details = error.stderr.strip() if isinstance(error, subprocess.CalledProcessError) and error.stderr else str(error)
        fail(f'media conversion failed: {details}')

    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
