import { useEffect } from 'react'

const DEFAULT_TITLE = 'vochsel.com'

function setTitleMeta(title: string) {
  document.title = title

  const tags = [
    { selector: 'meta[property="og:title"]', attribute: 'property', key: 'og:title' },
    { selector: 'meta[name="twitter:title"]', attribute: 'name', key: 'twitter:title' },
  ]

  for (const { selector, attribute, key } of tags) {
    let tag = document.head.querySelector<HTMLMetaElement>(selector)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute(attribute, key)
      document.head.appendChild(tag)
    }
    tag.content = title
  }
}

export function usePageTitle(title?: string) {
  useEffect(() => {
    if (!title) return

    setTitleMeta(title)
    return () => setTitleMeta(DEFAULT_TITLE)
  }, [title])
}
