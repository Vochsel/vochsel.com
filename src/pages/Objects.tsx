import Waitlist from '../components/Waitlist'
import { usePageTitle } from '../hooks/usePageTitle'

const objectStudies = [
  {
    src: '/objects/smart-drink-coaster.webp',
    alt: 'Green stone-like smart drink coaster with a subtle display',
  },
  {
    src: '/objects/ambient-wall-display.webp',
    alt: 'Circular stone-like smart home display mounted on a wall',
  },
  {
    src: '/objects/bedside-smart-display.webp',
    alt: 'Pink stone-like circular smart display on a bedside table',
  },
  {
    src: '/objects/smart-speaker-display.webp',
    alt: 'Pink stone-like smart speaker with an integrated display',
  },
]

export default function Objects() {
  usePageTitle('Objects')

  return (
    <article className="py-6 sm:py-12">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">/objects</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Objects for the home</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          I'm working on a small collection of beautifully designed smart-home pieces. Useful, connected objects that feel like part of the room rather than another gadget asking for attention.
        </p>
        <p className="mt-4 text-sm leading-6 text-gray-500">
          These are early studies. Materials, shapes, and exactly what they do are still being worked out.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {objectStudies.map(image => (
          <img
            key={image.src}
            className="aspect-square w-full rounded-sm object-cover"
            src={image.src}
            alt={image.alt}
            width="1254"
            height="1254"
          />
        ))}
      </div>

      <Waitlist variant="object" source="objects-page" />
    </article>
  )
}
