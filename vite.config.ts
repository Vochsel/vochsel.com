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

interface PageMeta {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
}

function setHtmlMeta(template: string, meta: PageMeta): string {
  const fullTitle = `${meta.title} | vochsel`
  const canonicalUrl = `${SITE_URL}${meta.path}`
  const imageUrl = `${SITE_URL}/og-image.jpg`
  const escapedTitle = escapeXml(fullTitle)
  const escapedDescription = escapeXml(meta.description)
  const escapedUrl = escapeXml(canonicalUrl)
  const escapedImage = escapeXml(imageUrl)

  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapedTitle}</title>`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${escapedUrl}" />`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapedDescription}" />`)
    .replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="${meta.type ?? 'website'}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${escapedUrl}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapedTitle}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapedDescription}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${escapedImage}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapedTitle}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapedDescription}" />`)
    .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${escapedImage}" />`)

  if (meta.type === 'article') {
    const schema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.title,
      description: meta.description,
      datePublished: meta.publishedTime,
      dateModified: meta.publishedTime,
      mainEntityOfPage: canonicalUrl,
      url: canonicalUrl,
      image: imageUrl,
      author: {
        '@type': 'Person',
        name: meta.author ?? 'Ben Skinner',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#ben-skinner`,
        name: 'Ben Skinner',
      },
    }).replace(/</g, '\\u003c')

    html = html
      .replace('</head>', `    <meta property="article:published_time" content="${meta.publishedTime}" />\n    <script id="page-structured-data" type="application/ld+json">${schema}</script>\n  </head>`)
  }

  return html
}

const staticPages: Array<PageMeta & { output: string }> = [
  {
    output: 'art.html',
    path: '/art',
    title: '3D Art by Ben Skinner',
    description: '3D art and sculptural experiments by Ben Skinner, including framed pieces, abstract forms, and recent renders.',
  },
  {
    output: 'music.html',
    path: '/music',
    title: 'Music by Ben Skinner',
    description: 'Music by Ben Skinner, including Whale Tapes, Toronto Tapes, and Pretty Beach Tapes.',
  },
  {
    output: 'objects.html',
    path: '/objects',
    title: 'Smart Home Object Concepts by Ben Skinner',
    description: 'Smart-home objects and product concepts by Ben Skinner, exploring ambient displays, speakers, and everyday interfaces.',
  },
  {
    output: 'clothing.html',
    path: '/clothing',
    title: 'Unprompted Clothing by Ben Skinner',
    description: 'Unprompted clothing by Ben Skinner: small-run clothes for humans in the loop.',
  },
  {
    output: 'blog.html',
    path: '/blog',
    title: 'Blog by Ben Skinner',
    description: 'Writing by Ben Skinner about art, technology, 3D printing, creative work, and building things.',
  },
  {
    output: 'blog/3d-printing.html',
    path: '/blog/3d-printing',
    title: '3D Printing Experiments by Ben Skinner',
    description: '3D printing experiments, timelapses, and workshop notes from Ben Skinner, made with a Bambu Lab P2S.',
  },
  {
    output: 'wiki.html',
    path: '/wiki',
    title: 'CG and Software Wiki',
    description: 'Technical notes and useful snippets for Houdini, USD, Blender, CMake, NVIDIA Omniverse, and Unreal Engine.',
  },
  {
    output: 'claudes-blog.html',
    path: '/claudes-blog',
    title: "Claude's Blog",
    description: 'Notes from the AI helping Ben Skinner build and maintain vochsel.com.',
  },
  {
    output: 'recs.html',
    path: '/recs',
    title: 'Recommended Sites',
    description: 'Websites and writing recommended by Ben Skinner, spanning software, CG, AI, and creative technology.',
  },
]

const wikiPages = [
  { slug: 'houdini', title: 'Houdini Wiki', description: 'Useful Houdini HScript, Python, VEX, HDAs, Solaris, and LOPs snippets.' },
  { slug: 'usd', title: 'Pixar USD Wiki', description: 'Practical Pixar Universal Scene Description notes and C++ and Python snippets for CG pipelines.' },
  { slug: 'blender', title: 'Blender Wiki', description: 'Blender C++ development snippets and technical reference notes.' },
  { slug: 'cmake', title: 'CMake Reference', description: 'Practical CMake refreshers covering paths, packages, targets, and common build tasks.' },
  { slug: 'omniverse', title: 'NVIDIA Omniverse Wiki', description: 'NVIDIA Omniverse development notes, gotchas, extensions, and Python snippets.' },
  { slug: 'ue4', title: 'Unreal Engine Wiki', description: 'Useful Unreal Engine 4 and UE5 console commands, Python calls, and development notes.' },
]

function pageMetaPlugin(): Plugin {
  return {
    name: 'page-meta',
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
            setHtmlMeta(template, {
              path: `/${outputDirectory}/${post.slug}`,
              title: post.title,
              description: post.excerpt,
              type: 'article',
              publishedTime: post.date,
              author: directory === 'claude-blog' ? 'Claude' : 'Ben Skinner',
            }),
          )
        }
      }

      for (const page of staticPages) {
        const outputPath = resolve(distDir, page.output)
        mkdirSync(resolve(outputPath, '..'), { recursive: true })
        writeFileSync(outputPath, setHtmlMeta(template, page))
      }

      const wikiOutputPath = resolve(distDir, 'wiki')
      mkdirSync(wikiOutputPath, { recursive: true })
      for (const page of wikiPages) {
        writeFileSync(
          resolve(wikiOutputPath, `${page.slug}.html`),
          setHtmlMeta(template, {
            path: `/wiki/${page.slug}`,
            title: page.title,
            description: page.description,
          }),
        )
      }

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
    pageMetaPlugin(),
  ],
  assetsInclude: ['**/*.md'],
})
