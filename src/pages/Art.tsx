import { useRef } from 'react'
import Waitlist from '../components/Waitlist'
import { usePageTitle } from '../hooks/usePageTitle'

const instagramUrl = 'https://www.instagram.com/vochsel'

const artwork = [
  {
    src: '/blog/unprompted-optimism/framed-colour-study.webp',
    alt: 'Colourful 3D artwork mocked up in a timber frame',
    width: 1402,
    height: 1122,
  },
  {
    src: '/blog/unprompted-optimism/framed-white-sculpture.webp',
    alt: 'White sculptural artwork mocked up in a timber frame',
    width: 1197,
    height: 1314,
  },
  {
    src: '/blog/unprompted-optimism/framed-warm-study.webp',
    alt: 'Warm abstract 3D artwork mocked up in a timber frame',
    width: 1122,
    height: 1402,
  },
]

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Art() {
  usePageTitle('3D art')
  const carouselRef = useRef<HTMLDivElement>(null)

  function scrollCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current
    if (!carousel) return
    carousel.scrollBy({ left: carousel.clientWidth * 0.72 * direction, behavior: 'smooth' })
  }

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
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
          More work on Instagram <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="mt-10" aria-labelledby="recent-renders-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="recent-renders-heading" className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Recent renders
          </h2>
          <div className="flex gap-2">
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-400 hover:text-gray-900"
              type="button"
              aria-label="Previous render"
              onClick={() => scrollCarousel(-1)}
            >
              ←
            </button>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-400 hover:text-gray-900"
              type="button"
              aria-label="Next render"
              onClick={() => scrollCarousel(1)}
            >
              →
            </button>
          </div>
        </div>

        <div ref={carouselRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
          {artwork.map(image => (
            <a
              key={image.src}
              className="w-[82%] shrink-0 snap-start sm:w-[58%]"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View more artwork on Instagram"
            >
              <img
                className="aspect-[4/5] w-full rounded-sm object-cover"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            </a>
          ))}
        </div>
      </section>

      <Waitlist variant="art" source="art-page" />
    </article>
  )
}
