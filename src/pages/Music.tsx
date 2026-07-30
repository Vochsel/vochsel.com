import Waitlist from '../components/Waitlist'
import { usePageTitle } from '../hooks/usePageTitle'

const musicLinks = [
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/2wwOqc2fFVZj7D06QzxrrJ',
    description: 'Released music',
  },
  {
    name: 'SoundCloud',
    href: 'https://soundcloud.com/vochsel',
    description: 'Sketches and other bits',
  },
]

export default function Music() {
  usePageTitle('Music')

  return (
    <article className="py-6 sm:py-12">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">/music</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Music</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">Heavily inspired, Fred Again.. knockoff.</p>
      </header>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {musicLinks.map(link => (
          <a
            key={link.name}
            className="group flex min-h-36 flex-col justify-between rounded-sm border border-gray-200 p-5 transition hover:border-gray-400"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-sm text-gray-500">{link.description}</span>
            <span className="flex items-end justify-between text-2xl font-medium">
              {link.name}
              <span className="text-base text-gray-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </div>

      <Waitlist variant="music" source="music-page" />
    </article>
  )
}
