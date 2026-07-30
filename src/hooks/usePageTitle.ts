import { useEffect } from 'react'

const SITE_URL = 'https://vochsel.com'
const SITE_NAME = 'vochsel'
const DEFAULT_TITLE = 'Ben Skinner — 3D Art, Music, Objects & Writing'
const DEFAULT_DESCRIPTION = 'The creative work of Ben Skinner: 3D art, music, objects, clothing, writing, and software projects.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

export interface PageMetaOptions {
  description?: string
  type?: 'website' | 'article'
  date?: string
  author?: string
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setPageMeta(title: string, options: PageMetaOptions = {}, path = '/') {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | ${SITE_NAME}`
  const description = options.description ?? DEFAULT_DESCRIPTION
  const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`
  const imageUrl = DEFAULT_IMAGE

  document.title = fullTitle
  setMeta('meta[name="description"]', 'name', 'description', description)
  setMeta('meta[property="og:type"]', 'property', 'og:type', options.type ?? 'website')
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
  setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
  setMeta('meta[property="og:description"]', 'property', 'og:description', description)
  setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = canonicalUrl

  document.head.querySelector('#page-structured-data')?.remove()
  document.head.querySelector('meta[property="article:published_time"]')?.remove()

  if (options.type === 'article' && options.date) {
    setMeta('meta[property="article:published_time"]', 'property', 'article:published_time', options.date)

    const schema = document.createElement('script')
    schema.id = 'page-structured-data'
    schema.type = 'application/ld+json'
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      datePublished: options.date,
      dateModified: options.date,
      mainEntityOfPage: canonicalUrl,
      url: canonicalUrl,
      image: imageUrl,
      author: {
        '@type': 'Person',
        name: options.author ?? 'Ben Skinner',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#ben-skinner`,
        name: 'Ben Skinner',
      },
    })
    document.head.appendChild(schema)
  }
}

export function usePageTitle(title?: string, options: PageMetaOptions = {}) {
  useEffect(() => {
    if (!title) return

    setPageMeta(title, options, window.location.pathname)
    return () => setPageMeta(DEFAULT_TITLE, { description: DEFAULT_DESCRIPTION }, '/')
  }, [title, options.description, options.type, options.date, options.author])
}
