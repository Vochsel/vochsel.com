import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, ComponentType } from 'react'
import TableOfContents from '../components/TableOfContents'
import { usePageTitle } from '../hooks/usePageTitle'

// Import all wiki MDX files
const wikiModules = import.meta.glob('../content/wiki/*.mdx') as Record<string, () => Promise<{ default: ComponentType }>>

const wikiMeta: Record<string, { title: string; description: string }> = {
  houdini: { title: 'Houdini Wiki', description: 'Useful Houdini HScript, Python, VEX, HDAs, Solaris, and LOPs snippets.' },
  usd: { title: 'Pixar USD Wiki', description: 'Practical Pixar Universal Scene Description notes and C++ and Python snippets for CG pipelines.' },
  blender: { title: 'Blender Wiki', description: 'Blender C++ development snippets and technical reference notes.' },
  cmake: { title: 'CMake Reference', description: 'Practical CMake refreshers covering paths, packages, targets, and common build tasks.' },
  omniverse: { title: 'NVIDIA Omniverse Wiki', description: 'NVIDIA Omniverse development notes, gotchas, extensions, and Python snippets.' },
  ue4: { title: 'Unreal Engine Wiki', description: 'Useful Unreal Engine 4 and UE5 console commands, Python calls, and development notes.' },
}

export default function WikiArticle() {
  const { slug } = useParams()
  const [Content, setContent] = useState<ComponentType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const pageMeta = slug ? wikiMeta[slug] : undefined

  usePageTitle(pageMeta?.title, { description: pageMeta?.description })

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
          <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:bg-gray-900 prose-table:text-sm prose-th:bg-gray-100 dark:prose-th:bg-gray-900 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-td:border prose-th:border">
            <Content />
          </article>
        )}
      </div>
    </>
  )
}
