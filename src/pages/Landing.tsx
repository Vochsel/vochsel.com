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
            <div>
              <a
                href="https://dump.page"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group"
              >
                <span className="flex items-center gap-2 font-medium group-hover:text-gray-500 transition-colors"><img src="https://dump.page/favicon.ico" alt="" width="16" height="16" />dump</span>
                <span className="text-gray-400 text-sm">dump.page</span>
              </a>
              <p className="text-sm text-gray-500">shared context for humans and ai</p>
            </div>
            <div>
              <a
                href="https://get-hoo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group"
              >
                <span className="flex items-center gap-2 font-medium group-hover:text-gray-500 transition-colors"><img src="https://www.get-hoo.com/favicon.svg" alt="" width="16" height="16" />Hoo</span>
                <span className="text-gray-400 text-sm">get-hoo.com</span>
              </a>
              <p className="text-sm text-gray-500">spatial agent and web orchestrator</p>
            </div>
            <div>
              <a
                href="https://walkie-talkie.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group"
              >
                <span className="flex items-center gap-2 font-medium group-hover:text-gray-500 transition-colors"><img src="https://walkie-talkie.dev/icon.svg" alt="" width="16" height="16" />walkie-talkie</span>
                <span className="text-gray-400 text-sm">walkie-talkie.dev</span>
              </a>
              <p className="text-sm text-gray-500">access your local terminal from your web browser</p>
            </div>
            <div>
              <a
                href="https://procgeo.vochsel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group"
              >
                <span className="flex items-center gap-2 font-medium group-hover:text-gray-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></svg>rs-procgeo</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">procgeo.vochsel.com</span>
                  <a
                    href="https://github.com/Vochsel/rs-procgeo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                    title="GitHub"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                </div>
              </a>
              <p className="text-sm text-gray-500">rust based procedural geometry, texturing, and scene library</p>
            </div>
            <div>
              <a
                href="https://kanban-cli.vochsel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group"
              >
                <span className="flex items-center gap-2 font-medium group-hover:text-gray-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>kanban-cli</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">kanban-cli.vochsel.com</span>
                  <a
                    href="https://github.com/Vochsel/kanban-cli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                    title="GitHub"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                </div>
              </a>
              <p className="text-sm text-gray-500">one line ui for markdown kanban files</p>
            </div>
            <div>
              <a
                href="/blog"
                className="flex items-center justify-between group"
              >
                <span className="font-medium group-hover:text-gray-500 transition-colors">blog</span>
                <span className="text-gray-400 text-sm">/blog</span>
              </a>
              <p className="text-sm text-gray-500">random thoughts from a human</p>
            </div>
            <div>
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
              <p className="text-sm text-gray-500">heavily inspired, Fred Again.. knockoff</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Past Life</h2>
          <div className="space-y-3">
            <div>
              <a
                href="https://magpai.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group"
              >
                <span className="flex items-center gap-2 font-medium group-hover:text-gray-500 transition-colors"><img src="https://magpai.app/favicon.ico" alt="" width="16" height="16" />magpai</span>
                <span className="text-gray-400 text-sm">magpai.app</span>
              </a>
              <p className="text-sm text-gray-500">your business's AI operating system</p>
            </div>
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
