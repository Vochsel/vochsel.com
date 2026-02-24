import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 bg-white/80 backdrop-blur-sm transition-colors ${scrolled ? 'border-b' : ''}`}>
      <nav className="container mx-auto px-4 py-4 max-w-4xl flex items-center justify-between">
        <Link to="/" className="text-xl font-bold font-serif">
          vochsel
        </Link>
        <div className="flex items-center gap-1">
          <Link to="/blog" className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors">
            Blog
          </Link>
          <Link to="/wiki" className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors">
            Wiki
          </Link>
          <a href="/feed.xml" className="ml-1 p-1.5 text-gray-400 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors" title="RSS Feed">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  )
}
