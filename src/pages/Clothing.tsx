import { usePageTitle } from '../hooks/usePageTitle'

const shopUrl = 'https://unprompted.clothing?utm_source=vochsel.com&utm_medium=referral&utm_campaign=clothing_page'

const products = [
  {
    src: '/clothing/human-in-the-loop-city.webp',
    alt: 'Human in the loop black T-shirt worn in the city',
    width: 1024,
    height: 1536,
    className: 'aspect-[2/3] w-full rounded-sm object-cover',
  },
  {
    src: '/clothing/human-in-the-loop-park.webp',
    alt: 'Human in the loop black T-shirt worn in a park',
    width: 1024,
    height: 1536,
    className: 'aspect-[2/3] w-full rounded-sm object-cover',
  },
  {
    src: '/clothing/em-dash-removal-club.webp',
    alt: 'Em dash removal club white ringer T-shirt worn in the city',
    width: 1536,
    height: 1024,
    className: 'w-full rounded-sm',
    wide: true,
  },
]

export default function Clothing() {
  usePageTitle('Clothing')

  return (
    <article className="py-6 sm:py-12">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">/clothing</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Unprompted</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          Clothes for humans in the loop. Small runs, questionable AI jokes, and no real desire to become a fashion empire.
        </p>
        <a
          className="mt-5 inline-flex items-center gap-2 bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          href={shopUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop Unprompted <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {products.map(product => (
          <a
            key={product.src}
            href={shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View this product on Unprompted"
            className={'wide' in product && product.wide ? 'sm:col-span-2' : undefined}
          >
            <img
              className={product.className}
              src={product.src}
              alt={product.alt}
              width={product.width}
              height={product.height}
            />
          </a>
        ))}
      </div>
    </article>
  )
}
