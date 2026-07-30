import { useRef } from 'react'
import Waitlist from '../components/Waitlist'
import { usePageTitle } from '../hooks/usePageTitle'

const instagramUrl = 'https://www.instagram.com/vochsel'

const framedArtwork = [
  {
    src: '/blog/unprompted-optimism/framed-colour-study.webp',
    alt: 'Colourful 3D artwork mocked up in a timber frame',
    width: 1402,
    height: 1122,
    className: 'site-media w-full sm:col-span-2',
  },
  {
    src: '/blog/unprompted-optimism/framed-white-sculpture.webp',
    alt: 'White sculptural artwork mocked up in a timber frame',
    width: 1197,
    height: 1314,
    className: 'site-media aspect-[4/5] h-full w-full object-cover',
  },
  {
    src: '/blog/unprompted-optimism/framed-warm-study.webp',
    alt: 'Warm abstract 3D artwork mocked up in a timber frame',
    width: 1122,
    height: 1402,
    className: 'site-media aspect-[4/5] h-full w-full object-cover',
  },
]

const recentRenders = [
  {
    src: '/art/folded-white-sculpture.webp',
    alt: 'Close-up render of a folded white sculptural form',
    width: 2048,
    height: 2048,
  },
  {
    src: '/art/folded-blue-sculpture.webp',
    alt: 'Blue folded sculptural form on a green background',
    width: 512,
    height: 512,
  },
  {
    src: '/art/glitched-tree.webp',
    alt: 'Tree distorted into horizontal digital streaks',
    width: 1842,
    height: 1840,
  },
  {
    src: '/art/colour-rings.webp',
    alt: 'Colourful floating rings forming an abstract sphere',
    width: 1768,
    height: 1726,
  },
  {
    src: '/art/chrome-folded-sculpture.webp',
    alt: 'Chrome folded sculptural form on white',
    width: 1714,
    height: 1774,
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
  usePageTitle('3D Art by Ben Skinner', {
    description: '3D art and sculptural experiments by Ben Skinner, including framed pieces, abstract forms, and recent renders.',
  })
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
          className="text-link mt-5 inline-flex items-center gap-2 text-sm"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
          More work on Instagram <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="mt-10" aria-labelledby="framed-art-heading">
        <h2 id="framed-art-heading" className="mb-4 text-xs font-medium uppercase tracking-wider text-gray-400">
          Framed art preview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {framedArtwork.map((image, index) => (
            <img
              key={image.src}
              className={image.className}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="recent-renders-heading">
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
          {recentRenders.map(image => (
            <a
              key={image.src}
              className="media-link w-[82%] shrink-0 snap-start sm:w-[46%]"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View more artwork on Instagram"
            >
              <img
                className="site-media aspect-square w-full object-cover"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </section>

      <Waitlist variant="art" source="art-page" />
    </article>
  )
}
