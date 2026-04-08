import { Link } from 'react-router-dom'
import { posts } from '../content/blog/posts'

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
  // Sort by date descending (newest first)
  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  if (sortedPosts.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <p className="text-gray-600 mb-4">No posts yet.</p>
        <p className="text-gray-500 text-sm">
          Check out the <Link to="/wiki" className="text-blue-600 hover:underline">Wiki</Link> for technical notes.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <div className="space-y-8">
          {sortedPosts.map((post) => (
            <article key={post.slug} className="border-b pb-8">
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold hover:text-gray-600 mb-2">
                  {post.title}
                </h2>
              </Link>
              <time className="text-gray-500 text-sm">{formatDate(post.date)}</time>
              {post.excerpt && <p className="mt-2 text-gray-600">{post.excerpt}</p>}
              <Link
                to={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
      <footer className="pt-4 border-t flex justify-center gap-4 text-sm">
        <Link to="/claudes-blog" className="text-gray-400 hover:text-gray-600">
          Published by Claude
        </Link>
        <span className="text-gray-300">|</span>
        <Link to="/recs" className="text-gray-400 hover:text-gray-600">
          Recs
        </Link>
      </footer>
    </div>
  )
}
