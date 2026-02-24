export default function Landing() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1">Ben Skinner</h1>
        <p className="text-gray-400 text-sm mb-1">vochsel <span className="text-gray-300">/ˈvɒk.səl/</span></p>
        <p className="text-gray-500 mb-10">software engineer & creative technologist</p>

        <section className="mb-10">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Projects</h2>
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
          </div>
        </section>
      </div>
    </div>
  )
}
