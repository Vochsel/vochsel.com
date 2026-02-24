import { useState, useEffect, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const STORAGE_KEY = 'blog-drafts'
const OLD_STORAGE_KEY = 'new-blog-draft'

interface Draft {
  name: string
  title: string
  excerpt: string
  content: Record<string, unknown>
}

type DraftsDict = Record<string, Draft>

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

function loadDrafts(): DraftsDict {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }

  // Migrate old single-draft format
  try {
    const old = localStorage.getItem(OLD_STORAGE_KEY)
    if (old) {
      const parsed = JSON.parse(old) as { title: string; excerpt: string; content: Record<string, unknown> }
      const id = Date.now().toString()
      const migrated: DraftsDict = {
        [id]: { name: parsed.title || 'Untitled', ...parsed },
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
      localStorage.removeItem(OLD_STORAGE_KEY)
      return migrated
    }
  } catch { /* ignore */ }

  return {}
}

function saveDrafts(drafts: DraftsDict) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
}

function sortedIds(drafts: DraftsDict): string[] {
  return Object.keys(drafts).sort((a, b) => Number(b) - Number(a))
}

export default function NewBlog() {
  const [drafts, setDrafts] = useState<DraftsDict>(loadDrafts)
  const [activeId, setActiveId] = useState<string | null>(() => {
    const ids = sortedIds(loadDrafts())
    return ids.length > 0 ? ids[0] : null
  })

  const activeDraft = activeId ? drafts[activeId] ?? null : null

  const editor = useEditor({
    extensions: [StarterKit],
    content: activeDraft?.content || undefined,
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[300px]',
      },
    },
  })

  // Sync editor content when switching drafts
  useEffect(() => {
    if (!editor) return
    const newContent = activeDraft?.content || { type: 'doc', content: [] }
    const current = JSON.stringify(editor.getJSON())
    const next = JSON.stringify(newContent)
    if (current !== next) {
      editor.commands.setContent(newContent)
    }
  }, [activeId, editor]) // eslint-disable-line react-hooks/exhaustive-deps

  const save = useCallback(() => {
    if (!editor || !activeId) return
    setDrafts(prev => {
      const current = prev[activeId]
      if (!current) return prev
      const updated = {
        ...prev,
        [activeId]: { ...current, content: editor.getJSON() },
      }
      saveDrafts(updated)
      return updated
    })
  }, [editor, activeId])

  useEffect(() => {
    if (!editor) return
    editor.on('update', save)
    return () => { editor.off('update', save) }
  }, [editor, save])

  // Save field changes (name, title, excerpt)
  useEffect(() => {
    if (!activeId || !drafts[activeId]) return
    saveDrafts(drafts)
  }, [drafts, activeId])

  const [copied, setCopied] = useState(false)

  function updateField(field: keyof Draft, value: string) {
    if (!activeId) return
    setDrafts(prev => ({
      ...prev,
      [activeId]: { ...prev[activeId], [field]: value },
    }))
  }

  function handleNew() {
    const id = Date.now().toString()
    const newDraft: Draft = { name: 'Untitled', title: '', excerpt: '', content: { type: 'doc', content: [] } }
    setDrafts(prev => {
      const updated = { ...prev, [id]: newDraft }
      saveDrafts(updated)
      return updated
    })
    setActiveId(id)
  }

  function handleDelete(id: string) {
    setDrafts(prev => {
      const { [id]: _, ...rest } = prev
      saveDrafts(rest)
      if (activeId === id) {
        const remaining = sortedIds(rest)
        setActiveId(remaining.length > 0 ? remaining[0] : null)
      }
      return rest
    })
  }

  function handleExport() {
    if (!editor || !activeDraft) return
    const date = new Date().toISOString().slice(0, 10)
    const md = jsonToMarkdown(editor.getJSON())
    const frontmatter = [
      '---',
      `title: ${activeDraft.title}`,
      `date: "${date}"`,
      activeDraft.excerpt ? `excerpt: ${activeDraft.excerpt}` : null,
      '---',
    ].filter(Boolean).join('\n')
    const mdx = frontmatter + '\n\n' + md + '\n'
    navigator.clipboard.writeText(mdx)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex max-w-5xl mx-auto py-8 px-4 gap-6">
      {/* Sidebar */}
      <div className="w-52 shrink-0">
        <button
          onClick={handleNew}
          className="w-full px-3 py-2 mb-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors text-sm"
        >
          + New draft
        </button>
        <ul className="space-y-1">
          {sortedIds(drafts).map(id => (
            <li
              key={id}
              className={`group flex items-center rounded px-2 py-1.5 cursor-pointer text-sm transition-colors ${
                id === activeId ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveId(id)}
            >
              <span className="truncate flex-1">{drafts[id].name || 'Untitled'}</span>
              <button
                onClick={e => { e.stopPropagation(); handleDelete(id) }}
                className="opacity-0 group-hover:opacity-100 ml-1 text-gray-400 hover:text-gray-700 transition-opacity text-xs"
                title="Delete draft"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        {Object.keys(drafts).length === 0 && (
          <p className="text-sm text-gray-400 mt-2">No drafts yet</p>
        )}
      </div>

      {/* Editor area */}
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold mb-6">New Blog Post</h1>

        {activeDraft ? (
          <>
            <input
              type="text"
              placeholder="Draft name"
              value={activeDraft.name}
              onChange={e => updateField('name', e.target.value)}
              className="w-full text-lg font-medium border-b border-gray-300 py-2 mb-4 outline-none focus:border-gray-600 bg-transparent"
            />

            <input
              type="text"
              placeholder="Post title"
              value={activeDraft.title}
              onChange={e => updateField('title', e.target.value)}
              className="w-full text-xl font-semibold border-b border-gray-300 py-2 mb-4 outline-none focus:border-gray-600 bg-transparent"
            />

            <input
              type="text"
              placeholder="Excerpt (optional)"
              value={activeDraft.excerpt}
              onChange={e => updateField('excerpt', e.target.value)}
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
                onClick={() => activeId && handleDelete(activeId)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm"
              >
                Delete draft
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400 mt-12 text-center">Create a new draft to get started.</p>
        )}
      </div>
    </div>
  )
}
