---
name: publish-3d-print
description: Add a completed 3D print to vochsel.com's /3d-printing log, including preparing attached photos or timelapses, updating the print entry, validating the site, and deploying it. Use when Ben asks to upload, add, log, or publish a new 3D print he has made.
---

# Publish a 3D print

Add one finished print to the site's existing print log without redesigning the page.

## Workflow

1. Work from the `vochsel_site` repository root. Read `src/pages/ThreeDPrinting.tsx` and inspect `git status` before editing; the live schema may have changed since this skill was written.
2. Collect the print details and attached/local media. Avoid unnecessary questions: infer straightforward details from the prompt and visible media.
3. Prepare the media in `public/prints/` with the bundled script.
4. Prepend a `PrintEntry` to the `prints` array so the newest print appears first.
5. Build, inspect the diff, commit only relevant files, and push `master` to deploy.

## Details to collect

- **Name:** Required. Use sentence case consistent with the existing entries.
- **Description:** Write one short, factual sentence describing what the object is or why it was made. Avoid marketing language. Ask only if the object or purpose cannot be inferred.
- **Completion date:** Prefer a date stated by Ben, then photo EXIF creation date, then today's local date. Include a time only when Ben explicitly supplies one. Format the visible date like `30 July 2026`; use ISO 8601 for `dateTime`.
- **Media:** Require at least one photo or timelapse. If none is available, ask Ben to attach or identify it.
- **Printa/model URL:** Optional. Include it only when supplied or clearly available; do not invent one.

Treat a newly added item as `Printed` unless Ben explicitly requests another status. For `Printed`, always use:

```tsx
status: 'Printed',
statusClassName: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
```

## Prepare media

Create a short lowercase kebab-case slug from the print name. Keep filenames descriptive and unique.

Run the helper from the repository root:

```bash
python3 .agents/skills/publish-3d-print/scripts/prepare_media.py \
  --slug <print-slug> \
  --image /path/to/photo-one \
  --image /path/to/photo-two \
  --video /path/to/timelapse
```

Omit unused flags. The script:

- auto-orients images, strips private metadata, limits them to 2000 px, and writes web-ready JPEGs;
- converts one optional video to muted H.264 MP4 with `faststart` and a maximum 1920×1080 bounding box;
- refuses to overwrite existing files;
- prints JSON containing final web paths and image dimensions.

It requires ImageMagick (`magick` and `identify`) for photos and FFmpeg (`ffmpeg` and `ffprobe`) for video. If a required command is unavailable, install it or perform an equivalent conversion—do not merely copy HEIC, MOV, HEVC, or oversized media into the site.

For multiple photos, the script creates numbered names. Rename them to meaningful suffixes such as `-front` and `-back` when the views are obvious, and keep the entry paths in sync.

## Add the entry

Prepend an object inside `const prints: PrintEntry[] = [` using only applicable optional fields:

```tsx
{
  name: '<name>',
  description: '<one-sentence description>',
  status: 'Printed',
  statusClassName: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  date: '<D Month YYYY>',
  dateTime: '<YYYY-MM-DD>',
  linkLabel: 'Open in Printa', // only with href
  href: '<url>',               // only with linkLabel
  video: {                     // omit when absent
    src: '/prints/<slug>.mp4',
    label: '<concise accessible description of the timelapse>',
  },
  images: [                    // omit when absent
    {
      src: '/prints/<filename>.jpg',
      alt: '<concise description of the visible object and view>',
      width: <actual width>,
      height: <actual height>,
    },
  ],
},
```

Use dimensions reported by the helper, not guessed dimensions. Make every `alt` and video `label` specific enough to distinguish the media. Escape apostrophes correctly in TypeScript strings. Do not change the page layout or older entries unless required to keep the current schema working.

## Verify and deploy

1. Confirm every new `/prints/...` path maps to a file under `public/prints/`, names are unique, and the new entry is first.
2. Run `npm run build`.
3. Review `git diff --check`, `git diff -- src/pages/ThreeDPrinting.tsx`, and `git status --short`. Do not stage `dist`, `.walkie-talkie`, or unrelated work.
4. Stage the updated page and only the new media files. Commit with a concise message such as `Add <name> to 3D print log`.
5. Push to `origin master`. Report the published print and media added.
