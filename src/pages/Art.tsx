import Waitlist from '../components/Waitlist'
import { usePageTitle } from '../hooks/usePageTitle'

const artwork = [
  {
    src: '/blog/unprompted-optimism/framed-colour-study.webp',
    alt: 'Colourful 3D artwork mocked up in a timber frame',
    width: 1402,
    height: 1122,
    className: 'w-full rounded-sm sm:col-span-2',
  },
  {
    src: '/blog/unprompted-optimism/framed-white-sculpture.webp',
    alt: 'White sculptural artwork mocked up in a timber frame',
    width: 1197,
    height: 1314,
    className: 'aspect-[4/5] h-full w-full rounded-sm object-cover',
  },
  {
    src: '/blog/unprompted-optimism/framed-warm-study.webp',
    alt: 'Warm abstract 3D artwork mocked up in a timber frame',
    width: 1122,
    height: 1402,
    className: 'aspect-[4/5] h-full w-full rounded-sm object-cover',
  },
]

export default function Art() {
  usePageTitle('3D art')

  return (
    <article className="py-6 sm:py-12">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">/art</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">3D art</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          Experiments in form, light, and procedural worlds. I'm currently working out how to turn some of them into physical, floating canvas-style prints.
        </p>
        <a
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900"
          href="https://www.instagram.com/vochsel"
          target="_blank"
          rel="noopener noreferrer"
        >
          More work on Instagram <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {artwork.map(image => (
          <img
            key={image.src}
            className={image.className}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        ))}
      </div>

      <Waitlist variant="art" source="art-page" />
    </article>
  )
}
