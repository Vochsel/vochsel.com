import Waitlist from '../components/Waitlist'
import { albums } from '../data/albums'
import { usePageTitle } from '../hooks/usePageTitle'

const spotifyArtistUrl = 'https://open.spotify.com/artist/2wwOqc2fFVZj7D06QzxrrJ'

function SpotifyIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0Zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02Zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.6 9.9 15 10.56 18.72 12.84c.36.18.54.78.24 1.2Zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3Z" />
    </svg>
  )
}

function SoundCloudIcon() {
  return (
    <svg width="32" height="28" viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
      <rect x="0" y="13" width="1.5" height="6" rx="0.75" />
      <rect x="3" y="10" width="1.5" height="9" rx="0.75" />
      <rect x="6" y="7" width="1.5" height="12" rx="0.75" />
      <rect x="9" y="5" width="1.5" height="14" rx="0.75" />
      <path d="M12 19V4.6A8.2 8.2 0 0 1 26.5 9.8 4.6 4.6 0 1 1 27.4 19H12Z" />
    </svg>
  )
}

const musicLinks = [
  {
    name: 'Spotify',
    href: spotifyArtistUrl,
    description: 'Released music',
    icon: <SpotifyIcon />,
  },
  {
    name: 'SoundCloud',
    href: 'https://soundcloud.com/vochsel',
    description: 'Sketches and other bits',
    icon: <SoundCloudIcon />,
  },
]

function formatDuration(durationMs: number) {
  const seconds = Math.floor(durationMs / 1000)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

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
            <span className="flex items-start justify-between text-gray-900">
              {link.icon}
              <span className="text-base text-gray-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
            </span>
            <span>
              <span className="block text-sm text-gray-500">{link.description}</span>
              <span className="mt-1 block text-2xl font-medium">{link.name}</span>
            </span>
          </a>
        ))}
      </div>

      <section className="mt-16" aria-labelledby="albums-heading">
        <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-4">
          <h2 id="albums-heading" className="font-serif text-3xl font-bold">Albums</h2>
          <span className="text-sm text-gray-400">{albums.length} releases</span>
        </div>

        <div className="space-y-16">
          {albums.map(album => {
            const albumUrl = `https://open.spotify.com/album/${album.spotifyId}`

            return (
              <section key={album.spotifyId} className="grid gap-6 sm:grid-cols-[12rem_1fr]">
                <div>
                  <a href={albumUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      className="aspect-square w-full rounded-sm object-cover"
                      src={album.cover}
                      alt={`${album.title} album cover`}
                      width="640"
                      height="640"
                    />
                  </a>
                  <a
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    href={albumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SpotifyIcon size={17} /> Listen on Spotify
                  </a>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-semibold tracking-tight">{album.title}</h3>
                    <span className="text-sm text-gray-400">{album.year} · {album.tracks.length} tracks</span>
                  </div>

                  <ol className="divide-y divide-gray-100">
                    {album.tracks.map((track, index) => (
                      <li key={track.spotifyId}>
                        <a
                          className="group grid grid-cols-[2rem_1fr_auto] items-center gap-2 py-3 text-sm"
                          href={`https://open.spotify.com/track/${track.spotifyId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="text-xs tabular-nums text-gray-400">{String(index + 1).padStart(2, '0')}</span>
                          <span className="min-w-0 truncate font-medium text-gray-700 transition group-hover:text-gray-900">
                            {track.title}
                            {track.explicit && (
                              <span className="ml-2 rounded-sm bg-gray-200 px-1 py-0.5 text-[9px] font-semibold uppercase text-gray-500">E</span>
                            )}
                          </span>
                          <span className="tabular-nums text-gray-400">{formatDuration(track.durationMs)}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )
          })}
        </div>
      </section>

      <Waitlist variant="music" source="music-page" />
    </article>
  )
}
