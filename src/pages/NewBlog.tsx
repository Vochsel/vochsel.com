import { useState, useEffect, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const STORAGE_KEY = 'new-blog-draft'

interface Draft {
  title: string
  excerpt: string
  content: Record<string, unknown>
}

function jsonToMarkdown(doc: Record<string, unknown>): string {
  const content = doc.content as Array<Record<string, unknown>> | undefined
  if (!content) return ''
  return content.map(nodeToMd).join('\n\n')
}

function nodeToMd(node: Record<string, unknown>): string {
  const type = node.type as string
  const content = node.content as Array<Record<string, unknown>> | undefined
  const attrs = node.attrs as Record<string, unknown> | undefined

  switch (type) {
    case 'paragraph':
      return content ? inlineToMd(content) : ''
    case 'heading': {
      const level = (attrs?.level as number) || 1
      const prefix = '#'.repeat(level)
      return `${prefix} ${content ? inlineToMd(content) : ''}`
    }
    case 'bulletList':
      return (content || []).map(li => listItemToMd(li, '-')).join('\n')
    case 'orderedList':
      return (content || []).map((li, i) => listItemToMd(li, `${i + 1}.`)).join('\n')
    case 'codeBlock': {
      const lang = (attrs?.language as string) || ''
      const text = content ? inlineToMd(content) : ''
      return '```' + lang + '\n' + text + '\n```'
    }
    case 'blockquote':
      return (content || []).map(n => '> ' + nodeToMd(n)).join('\n')
    case 'horizontalRule':
      return '---'
    default:
      return content ? inlineToMd(content) : ''
  }
}

function listItemToMd(node: Record<string, unknown>, bullet: string): string {
  const content = node.content as Array<Record<string, unknown>> | undefined
  if (!content) return bullet + ' '
  return content.map((child, i) => {
    const text = nodeToMd(child)
    return i === 0 ? `${bullet} ${text}` : `  ${text}`
  }).join('\n')
}

function inlineToMd(nodes: Array<Record<string, unknown>>): string {
  return nodes.map(node => {
    if (node.type === 'text') {
      let text = node.text as string
      const marks = node.marks as Array<Record<string, unknown>> | undefined
      if (marks) {
        for (const mark of marks) {
          if (mark.type === 'bold') text = `**${text}**`
          else if (mark.type === 'italic') text = `*${text}*`
          else if (mark.type === 'code') text = '`' + text + '`'
          else if (mark.type === 'strike') text = `~~${text}~~`
        }
      }
      return text
    }
    if (node.type === 'hardBreak') return '  \n'
    return ''
  }).join('')
}

function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveDraft(draft: Draft) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
}

export default function NewBlog() {
  const draft = loadDraft()
  const [title, setTitle] = useState(draft?.title || '')
  const [excerpt, setExcerpt] = useState(draft?.excerpt || '')
  const [copied, setCopied] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: draft?.content || undefined,
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[300px]',
      },
    },
  })

  const save = useCallback(() => {
    if (!editor) return
    saveDraft({ title, excerpt, content: editor.getJSON() })
  }, [editor, title, excerpt])

  useEffect(() => {
    if (!editor) return
    editor.on('update', save)
    return () => { editor.off('update', save) }
  }, [editor, save])

  useEffect(() => { save() }, [title, excerpt, save])

  function handleExport() {
    if (!editor) return
    const date = new Date().toISOString().slice(0, 10)
    const md = jsonToMarkdown(editor.getJSON())
    const frontmatter = [
      '---',
      `title: ${title}`,
      `date: "${date}"`,
      excerpt ? `excerpt: ${excerpt}` : null,
      '---',
    ].filter(Boolean).join('\n')
    const mdx = frontmatter + '\n\n' + md + '\n'
    navigator.clipboard.writeText(mdx)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleClear() {
    localStorage.removeItem(STORAGE_KEY)
    setTitle('')
    setExcerpt('')
    editor?.commands.clearContent()
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">New Blog Post</h1>

      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full text-xl font-semibold border-b border-gray-300 py-2 mb-4 outline-none focus:border-gray-600 bg-transparent"
      />

      <input
        type="text"
        placeholder="Excerpt (optional)"
        value={excerpt}
        onChange={e => setExcerpt(e.target.value)}
        className="w-full text-base border-b border-gray-300 py-2 mb-6 outline-none focus:border-gray-600 bg-transparent text-gray-600"
      />

      <div className="prose prose-lg max-w-none mb-6 border border-gray-200 rounded-lg p-4">
        <EditorContent editor={editor} />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors text-sm"
        >
          {copied ? 'Copied to clipboard!' : 'Export MDX'}
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm"
        >
          Clear draft
        </button>
      </div>
    </div>
  )
}
