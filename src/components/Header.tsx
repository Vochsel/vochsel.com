import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4 max-w-4xl flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          vochsel
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-600">
            Blog
          </Link>
          <Link to="/wiki" className="hover:text-gray-600">
            Wiki
          </Link>
        </div>
      </nav>
    </header>
  )
}
