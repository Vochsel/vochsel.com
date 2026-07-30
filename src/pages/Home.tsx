import { Link } from 'react-router-dom'
import { posts } from '../content/blog/posts'
import { usePageTitle } from '../hooks/usePageTitle'

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

export default function Home() {
  usePageTitle('Blog')

  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col">
      <div className="flex-1">
        <header>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">/blog</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
          <p className="mt-4 text-gray-500">Writing, plus a running log of things coming off the printer.</p>
        </header>

        <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Blog sections">
          <a
            href="#writing"
            className="group flex min-h-32 flex-col justify-between rounded-sm border border-gray-200 p-5 transition hover:border-gray-400"
          >
            <span className="text-xs uppercase tracking-wider text-gray-400">Thoughts</span>
            <span className="flex items-end justify-between text-2xl font-medium">
              Writing
              <span className="text-base text-gray-400" aria-hidden="true">↓</span>
            </span>
          </a>
          <Link
            to="/blog/3d-printing"
            className="group flex min-h-32 flex-col justify-between rounded-sm border border-gray-200 p-5 transition hover:border-gray-400"
          >
            <span className="text-xs uppercase tracking-wider text-gray-400">From the workshop</span>
            <span className="flex items-end justify-between text-2xl font-medium">
              3D printing
              <span className="text-base text-gray-400 transition group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </span>
          </Link>
        </nav>

        <section className="mt-14" id="writing">
          <h2 className="mb-8 text-xs font-medium uppercase tracking-wider text-gray-400">Writing</h2>
          {sortedPosts.length === 0 ? (
            <p className="text-gray-600">No posts yet.</p>
          ) : (
            <div className="space-y-8">
              {sortedPosts.map(post => (
                <article key={post.slug} className="border-b pb-8">
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="mb-2 text-2xl font-semibold hover:text-gray-600">{post.title}</h3>
                  </Link>
                  <time className="text-sm text-gray-500">{formatDate(post.date)}</time>
                  {post.excerpt && <p className="mt-2 text-gray-600">{post.excerpt}</p>}
                  <Link to={`/blog/${post.slug}`} className="mt-2 inline-block text-blue-600 hover:underline">
                    Read more &rarr;
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <footer className="flex justify-center gap-4 border-t pt-4 text-sm">
        <Link to="/claudes-blog" className="text-gray-400 hover:text-gray-600">Published by Claude</Link>
        <span className="text-gray-300">|</span>
        <Link to="/recs" className="text-gray-400 hover:text-gray-600">Recs</Link>
      </footer>
    </div>
  )
}
