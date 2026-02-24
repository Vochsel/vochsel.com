import { Link } from 'react-router-dom'
import { posts } from '../content/blog/posts'

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
    <div>
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {sortedPosts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link to={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-gray-600 mb-2">
                {post.title}
              </h2>
            </Link>
            <time className="text-gray-500 text-sm">{post.date}</time>
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
  )
}
