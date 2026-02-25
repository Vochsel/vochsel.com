export default function Landing() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1">Ben Skinner</h1>
        <p className="text-gray-400 text-sm mb-1">vochsel <span className="text-gray-300">/ˈvɒk.səl/</span></p>
        <p className="text-gray-500 mb-10">software engineer & creative technologist</p>

        <section className="mb-10">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Current Life</h2>
          <div className="space-y-3">
            <a
              href="https://magpai.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <span className="font-medium group-hover:text-gray-500 transition-colors">magpai</span>
              <span className="text-gray-400 text-sm">magpai.app</span>
            </a>
            <a
              href="/blog"
              className="flex items-center justify-between group"
            >
              <span className="font-medium group-hover:text-gray-500 transition-colors">blog</span>
              <span className="text-gray-400 text-sm">/blog</span>
            </a>
            <div className="flex items-center justify-between">
              <span className="font-medium">music</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://open.spotify.com/artist/2wwOqc2fFVZj7D06QzxrrJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-900 transition-colors"
                  title="Spotify"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                </a>
                <a
                  href="https://soundcloud.com/vochsel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-900 transition-colors"
                  title="SoundCloud"
                >
                  <img src="/soundcloud-logo.png" alt="SoundCloud" width="16" height="16" className="opacity-40 hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Past Life</h2>
          <div className="space-y-3">
            <a
              href="/wiki"
              className="flex items-center justify-between group"
            >
              <span className="font-medium group-hover:text-gray-500 transition-colors">wiki</span>
              <span className="text-gray-400 text-sm">/wiki</span>
            </a>
            <a
              href="https://benjaminskinner.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <span className="font-medium group-hover:text-gray-500 transition-colors">portfolio</span>
              <span className="text-gray-400 text-sm">benjaminskinner.com.au</span>
            </a>
            <a
              href="https://www.shadertoy.com/user/vochsel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <span className="font-medium group-hover:text-gray-500 transition-colors">shaders</span>
              <span className="text-gray-400 text-sm">shadertoy.com</span>
            </a>
            <a
              href="https://www.instagram.com/vochsel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <span className="font-medium group-hover:text-gray-500 transition-colors">3D art</span>
              <span className="text-gray-400 text-sm">instagram.com</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
