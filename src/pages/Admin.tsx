import { type FormEvent, useMemo, useState } from 'react'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../convex/_generated/api'
import { usePageTitle } from '../hooks/usePageTitle'

type WaitlistEntry = {
  id: string
  email: string
  country?: string
  variant?: 'art' | 'object' | 'music'
  source?: string
  createdAt: number
}

const convex = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL)

const interestLabels = {
  art: 'Art',
  object: 'Objects',
  music: 'Music & vinyl',
} as const

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleString('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""')}"`
}

export default function Admin() {
  usePageTitle('Waitlist Admin', {
    description: 'Private waitlist administration.',
  })

  const [password, setPassword] = useState('')
  const [entries, setEntries] = useState<WaitlistEntry[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const counts = useMemo(() => {
    const rows = entries ?? []
    return {
      people: new Set(rows.map(entry => entry.email)).size,
      art: rows.filter(entry => entry.variant === 'art').length,
      object: rows.filter(entry => entry.variant === 'object').length,
      music: rows.filter(entry => entry.variant === 'music').length,
    }
  }, [entries])

  async function loadEntries(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await convex.query(api.waitlist.list, { password })
      setEntries(result)
    } catch {
      setEntries(null)
      setError('That password did not work.')
    } finally {
      setLoading(false)
    }
  }

  function downloadCsv() {
    if (!entries) return

    const header = ['email', 'country', 'interest', 'source', 'joined_at']
    const rows = entries.map(entry => [
      entry.email,
      entry.country ?? '',
      entry.variant ?? '',
      entry.source ?? '',
      new Date(entry.createdAt).toISOString(),
    ])
    const csv = [header, ...rows].map(row => row.map(escapeCsv).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `vochsel-waitlist-${new Date().toISOString().slice(0, 10)}.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  if (!entries) {
    return (
      <section className="mx-auto max-w-md pt-8 sm:pt-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">Private</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight">Waitlist admin</h1>
        <p className="mt-4 text-sm leading-6 text-gray-500">Enter the admin password to view signups.</p>

        <form className="mt-8 space-y-3" onSubmit={loadEntries}>
          <label className="sr-only" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-400"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            autoFocus
            required
          />
          <button className="primary-action w-full justify-center" type="submit" disabled={loading}>
            {loading ? 'Opening…' : 'Open admin'}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
      </section>
    )
  }

  return (
    <section className="pb-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">Private</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight">Waitlist</h1>
        </div>
        <div className="flex gap-2">
          <button className="text-link text-sm" type="button" onClick={() => loadEntries()} disabled={loading}>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
          <button className="primary-action" type="button" onClick={downloadCsv}>Download CSV</button>
        </div>
      </header>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800 sm:grid-cols-4">
        {[
          ['People', counts.people],
          ['Art', counts.art],
          ['Objects', counts.object],
          ['Music & vinyl', counts.music],
        ].map(([label, value]) => (
          <div className="bg-white p-4 dark:bg-gray-950" key={label}>
            <dt className="text-xs text-gray-400">{label}</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 overflow-x-auto border-y border-gray-200 dark:border-gray-800">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-gray-400">
            <tr>
              <th className="py-3 pr-5 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Interest</th>
              <th className="px-3 py-3 font-medium">Country</th>
              <th className="px-3 py-3 font-medium">Source</th>
              <th className="py-3 pl-5 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {entries.map(entry => (
              <tr key={entry.id}>
                <td className="py-4 pr-5 font-medium">
                  <a className="text-link" href={`mailto:${entry.email}`}>{entry.email}</a>
                </td>
                <td className="px-3 py-4">{entry.variant ? interestLabels[entry.variant] : 'Legacy'}</td>
                <td className="px-3 py-4 text-gray-500">{entry.country ?? '—'}</td>
                <td className="max-w-48 truncate px-3 py-4 text-gray-500" title={entry.source}>{entry.source ?? '—'}</td>
                <td className="whitespace-nowrap py-4 pl-5 text-gray-500">{formatDate(entry.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {entries.length === 0 && <p className="py-12 text-center text-sm text-gray-400">No signups yet.</p>}
    </section>
  )
}
