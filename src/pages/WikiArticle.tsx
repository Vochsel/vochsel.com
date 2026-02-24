import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, ComponentType } from 'react'
import TableOfContents from '../components/TableOfContents'

// Import all wiki MDX files
const wikiModules = import.meta.glob('../content/wiki/*.mdx') as Record<string, () => Promise<{ default: ComponentType }>>

export default function WikiArticle() {
  const { slug } = useParams()
  const [Content, setContent] = useState<ComponentType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      setError(null)
      setReady(false)

      const path = `../content/wiki/${slug}.mdx`
      const loader = wikiModules[path]

      if (!loader) {
        setError(`Wiki page "${slug}" not found`)
        setLoading(false)
        return
      }

      try {
        const module = await loader()
        setContent(() => module.default)
      } catch (e) {
        setError(`Failed to load wiki page: ${e}`)
      }
      setLoading(false)
    }

    loadContent()
  }, [slug])

  // Trigger TOC render after content is in DOM
  useEffect(() => {
    if (!loading && Content) {
      const timer = setTimeout(() => setReady(true), 50)
      return () => clearTimeout(timer)
    }
  }, [loading, Content])

  if (loading) {
    return <div className="text-gray-500">Loading...</div>
  }

  if (error) {
    return (
      <div>
        <Link to="/wiki" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to wiki
        </Link>
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <>
      {ready && <TableOfContents />}
      <div>
        <Link to="/wiki" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to wiki
        </Link>
        {Content && (
          <article className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 prose-pre:bg-gray-900 prose-table:text-sm prose-th:bg-gray-100 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-td:border prose-th:border">
            <Content />
          </article>
        )}
      </div>
    </>
  )
}
