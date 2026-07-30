import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const SITE_URL = 'https://vochsel.com'

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) {
      meta[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '')
    }
  }
  return meta
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

interface ContentPost {
  slug: string
  title: string
  date: string
  excerpt: string
  visible: boolean
}

function readPosts(directory: string): ContentPost[] {
  const contentDir = resolve(__dirname, 'src', 'content', directory)
  return readdirSync(contentDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const slug = f.replace('.mdx', '')
      const content = readFileSync(resolve(contentDir, f), 'utf-8')
      const meta = parseFrontmatter(content)
      return {
        slug,
        title: meta.title ?? slug,
        date: meta.date ?? slug,
        excerpt: meta.excerpt ?? '',
        visible: meta.visible !== 'false',
      }
    })
}

function generateFeed(): string {
  const posts = readPosts('blog')
    .filter(p => p.visible)
    .filter(p => p.date <= new Date().toISOString().slice(0, 10))
    .sort((a, b) => b.date.localeCompare(a.date))

  const items = posts.map(post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>vochsel blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Ben Skinner's blog</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`
}

function rssPlugin(): Plugin {
  return {
    name: 'rss-feed',
    configureServer(server) {
      server.middlewares.use('/feed.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/rss+xml')
        res.end(generateFeed())
      })
    },
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      mkdirSync(distDir, { recursive: true })
      writeFileSync(resolve(distDir, 'feed.xml'), generateFeed())
      console.log('Generated dist/feed.xml')
    },
  }
}

function generateSitemap(): string {
  const today = new Date().toISOString().slice(0, 10)
  const staticPaths = [
    '/',
    '/art',
    '/music',
    '/objects',
    '/clothing',
    '/blog',
    '/blog/3d-printing',
    '/wiki',
    '/claudes-blog',
    '/recs',
  ]

  const entries: Array<{ path: string; lastmod?: string }> = staticPaths.map(path => ({ path }))

  for (const post of readPosts('blog').filter(post => post.visible && post.date <= today)) {
    entries.push({ path: `/blog/${post.slug}`, lastmod: post.date })
  }

  for (const post of readPosts('claude-blog').filter(post => post.visible && post.date <= today)) {
    entries.push({ path: `/claudes-blog/${post.slug}`, lastmod: post.date })
  }

  const wikiDir = resolve(__dirname, 'src', 'content', 'wiki')
  for (const file of readdirSync(wikiDir).filter(file => file.endsWith('.mdx')).sort()) {
    entries.push({ path: `/wiki/${file.replace('.mdx', '')}` })
  }

  const urls = entries.map(entry => `  <url>
    <loc>${escapeXml(`${SITE_URL}${entry.path}`)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

function sitemapPlugin(): Plugin {
  return {
    name: 'sitemap',
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/xml')
        res.end(generateSitemap())
      })
    },
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      mkdirSync(distDir, { recursive: true })
      writeFileSync(resolve(distDir, 'sitemap.xml'), generateSitemap())
      console.log('Generated dist/sitemap.xml')
    },
  }
}

function setHtmlTitle(template: string, title: string): string {
  const escapedTitle = escapeXml(title)
  return template
    .replace(/<title>.*?<\/title>/, `<title>${escapedTitle}</title>`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapedTitle}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapedTitle}" />`)
}

function blogMetaPlugin(): Plugin {
  return {
    name: 'blog-meta-pages',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8')
      const today = new Date().toISOString().slice(0, 10)

      for (const directory of ['blog', 'claude-blog']) {
        const outputDirectory = directory === 'claude-blog' ? 'claudes-blog' : directory
        const outputPath = resolve(distDir, outputDirectory)
        mkdirSync(outputPath, { recursive: true })

        for (const post of readPosts(directory).filter(post => post.visible && post.date <= today)) {
          writeFileSync(
            resolve(outputPath, `${post.slug}.html`),
            setHtmlTitle(template, post.title),
          )
        }
      }

      writeFileSync(resolve(distDir, 'art.html'), setHtmlTitle(template, '3D art'))
      writeFileSync(resolve(distDir, 'music.html'), setHtmlTitle(template, 'Music'))
      writeFileSync(resolve(distDir, 'objects.html'), setHtmlTitle(template, 'Objects'))
      writeFileSync(resolve(distDir, 'clothing.html'), setHtmlTitle(template, 'Clothing'))
      writeFileSync(resolve(distDir, 'blog', '3d-printing.html'), setHtmlTitle(template, '3D printing'))

      console.log('Generated page metadata')
    },
  }
}

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeSlug],
    }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    rssPlugin(),
    sitemapPlugin(),
    blogMetaPlugin(),
  ],
  assetsInclude: ['**/*.md'],
})
