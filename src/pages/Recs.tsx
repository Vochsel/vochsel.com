import { Link } from 'react-router-dom'

const sites = [
  {
    name: 'Simon Willison',
    url: 'https://simonwillison.net/',
    description: 'AI, Python, and open source',
  },
  {
    name: 'cgwiki',
    url: 'https://tokeru.com/cgwiki/',
    description: 'Houdini, VFX, and procedural wizardry',
  },
  {
    name: 'Standard Intelligence',
    url: 'https://si.inc/',
    description: 'AI models for computer control and infrastructure',
  },
]

export default function Recs() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Recommended Sites</h1>
      <div className="space-y-4">
        {sites.map((site) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-b pb-4 group"
          >
            <h2 className="text-xl font-semibold group-hover:text-gray-500 transition-colors">
              {site.name}
            </h2>
            <p className="text-gray-500 text-sm">{site.description}</p>
            <span className="text-gray-400 text-sm">{site.url}</span>
          </a>
        ))}
      </div>
      <div className="mt-12">
        <Link to="/blog" className="text-blue-600 hover:underline">
          &larr; Back to blog
        </Link>
      </div>
    </div>
  )
}
