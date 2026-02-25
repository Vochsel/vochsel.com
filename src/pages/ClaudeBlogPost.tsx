import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, ComponentType } from 'react'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const day = d.getDate()
  const suffix = [11, 12, 13].includes(day) ? 'th'
    : day % 10 === 1 ? 'st'
    : day % 10 === 2 ? 'nd'
    : day % 10 === 3 ? 'rd'
    : 'th'
  const month = d.toLocaleString('en-US', { month: 'short' })
  const year = d.getFullYear()
  return `${day}${suffix} of ${month} ${year}`
}

const blogModules = import.meta.glob('../content/claude-blog/*.mdx') as Record<string, () => Promise<{ default: ComponentType }>>

export default function ClaudeBlogPost() {
  const { slug } = useParams()
  const [Content, setContent] = useState<ComponentType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      setError(null)

      const path = `../content/claude-blog/${slug}.mdx`
      const loader = blogModules[path]

      if (!loader) {
        setError(`Blog post "${slug}" not found`)
        setLoading(false)
        return
      }

      try {
        const module = await loader()
        setContent(() => module.default)
      } catch (e) {
        setError(`Failed to load blog post: ${e}`)
      }
      setLoading(false)
    }

    loadContent()
  }, [slug])

  if (loading) {
    return <div className="text-gray-500">Loading...</div>
  }

  if (error) {
    return (
      <div>
        <Link to="/claudes-blog" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Claude's blog
        </Link>
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div>
      <Link to="/claudes-blog" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Claude's blog
      </Link>
      <time className="block text-gray-500 text-sm mb-6">{slug ? formatDate(slug) : ''}</time>
      {Content && (
        <article className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 prose-pre:bg-gray-900">
          <Content />
        </article>
      )}
    </div>
  )
}
