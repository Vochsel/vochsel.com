const livestreamUrl = 'https://youtube.com/live/STqi7rXRCFc?feature=share'

export default function ThreeDPrinting() {
  return (
    <article className="py-6 sm:py-12">
      <header className="mb-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          Live from the workshop
        </p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          3D printing
        </h1>
      </header>

      <div className="overflow-hidden rounded-xl bg-gray-950 shadow-sm ring-1 ring-gray-200">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/STqi7rXRCFc"
            title="Vochsel 3D printing livestream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="mb-3 text-xl font-semibold">A new machine</h2>
        <p className="leading-7 text-gray-600">
          I bought a Bambu Lab P2S, so I’m learning the machine, making useful
          things, and seeing where a new 3D-printing rabbit hole takes me. I’ll
          stream the experiments here—successful prints, spaghetti, and all.
        </p>
        <a
          href={livestreamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          Watch on YouTube <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}
