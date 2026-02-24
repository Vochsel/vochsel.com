import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, ComponentType } from 'react'

// Import all blog MDX files
const blogModules = import.meta.glob('../content/blog/*.mdx') as Record<string, () => Promise<{ default: ComponentType }>>

export default function BlogPost() {
  const { slug } = useParams()
  const [Content, setContent] = useState<ComponentType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      setError(null)

      const path = `../content/blog/${slug}.mdx`
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
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to blog
        </Link>
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div>
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to blog
      </Link>
      <time className="block text-gray-500 text-sm mb-6">{slug}</time>
      {Content && (
        <article className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 prose-pre:bg-gray-900">
          <Content />
        </article>
      )}
    </div>
  )
}
