// Dynamically pull Claude's blog post metadata from MDX frontmatter
const modules = import.meta.glob('./*.mdx', { eager: true }) as Record<
  string,
  { frontmatter?: { title?: string; date?: string; excerpt?: string; visible?: boolean } }
>

export interface ClaudePost {
  slug: string
  title: string
  date: string
  excerpt?: string
}

const today = new Date().toISOString().slice(0, 10)

export const claudePosts: ClaudePost[] = Object.entries(modules)
  .filter(([, mod]) => mod.frontmatter?.visible !== false)
  .map(([path, mod]) => {
    const slug = path.replace('./', '').replace('.mdx', '')
    const fm = mod.frontmatter ?? {}
    return {
      slug,
      title: fm.title ?? slug,
      date: fm.date ?? slug,
      excerpt: fm.excerpt,
    }
  })
  .filter(p => p.date <= today)
