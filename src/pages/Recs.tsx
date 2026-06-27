import { Link } from 'react-router-dom'

const sites = [
  {
    name: 'Simon Willison',
    url: 'https://simonwillison.net/',
    description: 'AI, Python, and open source',
    links: [
      {
        name: 'Agentic Engineering Patterns',
        url: 'https://simonwillison.net/guides/agentic-engineering-patterns/',
      },
    ],
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
  {
    name: 'Alexey Pelykh',
    url: 'https://alexey-pelykh.com/blog/',
    description: 'Software engineering and technology',
  },
]

export default function Recs() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Recommended Sites</h1>
      <div className="space-y-4">
        {sites.map((site) => (
          <div key={site.url} className="border-b pb-4">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <h2 className="text-xl font-semibold group-hover:text-gray-500 transition-colors">
                {site.name}
              </h2>
              <p className="text-gray-500 text-sm">{site.description}</p>
              <span className="text-gray-400 text-sm">{site.url}</span>
            </a>
            {site.links && (
              <div className="ml-4 mt-2 space-y-1">
                {site.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ↳ {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>
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
