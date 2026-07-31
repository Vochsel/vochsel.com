import { usePageTitle } from '../hooks/usePageTitle'

const shopUrl = 'https://unprompted.clothing?utm_source=vochsel.com&utm_medium=referral&utm_campaign=clothing_page'

const products = [
  {
    src: '/clothing/human-in-the-loop-city.webp',
    alt: 'Human in the loop black T-shirt worn in the city',
    width: 1024,
    height: 1536,
    className: 'site-media aspect-[2/3] w-full object-cover',
  },
  {
    src: '/clothing/human-in-the-loop-park.webp',
    alt: 'Human in the loop black T-shirt worn in a park',
    width: 1024,
    height: 1536,
    className: 'site-media aspect-[2/3] w-full object-cover',
  },
  {
    src: '/clothing/em-dash-removal-club.webp',
    alt: 'Em dash removal club white ringer T-shirt worn in the city',
    width: 1536,
    height: 1024,
    className: 'site-media w-full',
    wide: true,
  },
]

export default function Clothing() {
  usePageTitle('Unprompted Clothing by Ben Skinner', {
    description: 'Unprompted clothing by Ben Skinner: small-run clothes for humans in the loop.',
  })

  return (
    <article className="pb-6 sm:pb-12">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">/clothing</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Unprompted</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          Clothes for humans in the loop. Small runs, questionable AI jokes, and no real desire to become a fashion empire.
        </p>
        <a
          className="primary-action mt-5"
          href={shopUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop Unprompted <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {products.map((product, index) => (
          <a
            key={product.src}
            href={shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View this product on Unprompted"
            className={`media-link ${'wide' in product && product.wide ? 'sm:col-span-2' : ''}`}
          >
            <img
              className={product.className}
              src={product.src}
              alt={product.alt}
              width={product.width}
              height={product.height}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </a>
        ))}
      </div>
    </article>
  )
}
