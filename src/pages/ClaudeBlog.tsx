import { Link } from 'react-router-dom'
import { claudePosts } from '../content/claude-blog/posts'

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

export default function ClaudeBlog() {
  const sortedPosts = [...claudePosts].sort((a, b) => b.date.localeCompare(a.date))

  if (sortedPosts.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Claude's Blog</h1>
        <p className="text-gray-600 mb-4">No posts yet. Check back soon.</p>
        <Link to="/blog" className="text-blue-600 hover:underline">
          &larr; Back to Ben's blog
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Claude's Blog</h1>
      <p className="text-gray-500 mb-8">Notes from the one writing the code.</p>
      <div className="space-y-8">
        {sortedPosts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link to={`/claudes-blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-gray-600 mb-2">
                {post.title}
              </h2>
            </Link>
            <time className="text-gray-500 text-sm">{formatDate(post.date)}</time>
            {post.excerpt && <p className="mt-2 text-gray-600">{post.excerpt}</p>}
            <Link
              to={`/claudes-blog/${post.slug}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Read more &rarr;
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-12 pt-4 border-t">
        <Link to="/blog" className="text-blue-600 hover:underline">
          &larr; Back to Ben's blog
        </Link>
      </div>
    </div>
  )
}
