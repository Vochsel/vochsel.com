import { useRef, useState, useEffect, type ReactNode, type HTMLAttributes } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function QuoteParagraph({ children, ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [copied, setCopied] = useState(false)
  const [searchParams] = useSearchParams()
  const [highlighted, setHighlighted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const q = searchParams.get('q')
    if (!q) return
    const text = el.textContent?.trim() ?? ''
    if (text.startsWith(q)) {
      setHighlighted(true)
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
    }
  }, [searchParams])

  const handleCopy = () => {
    const text = ref.current?.textContent?.trim() ?? ''
    let snippet = text.slice(0, 120)
    if (text.length > 120) {
      const lastSpace = snippet.lastIndexOf(' ')
      if (lastSpace > 60) snippet = snippet.slice(0, lastSpace)
    }
    const url = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(snippet)}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group/quote">
      <p
        ref={ref}
        {...props}
        className={highlighted ? 'bg-amber-50/80 border-l-2 border-amber-300 pl-4 -ml-4 rounded-r transition-colors duration-500' : undefined}
      >
        {children}
      </p>
      <button
        onClick={handleCopy}
        className="absolute -left-8 top-1 opacity-0 group-hover/quote:opacity-60 hover:!opacity-100 transition-opacity cursor-pointer p-1"
        title="Copy quote link"
        type="button"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        )}
      </button>
    </div>
  )
}
