import { type FormEvent, useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ArtWaitlist() {
  const joinWaitlist = useMutation(api.waitlist.join)
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormState('submitting')
    setMessage('')

    try {
      const result = await joinWaitlist({
        email,
        source: 'unprompted-optimism',
      })

      setFormState('success')
      setMessage(result.status === 'already_joined'
        ? "You're already on the list."
        : "You're on the list. I'll let you know when they're ready.")
      setEmail('')
    } catch {
      setFormState('error')
      setMessage('Something went wrong. Check your email and try again.')
    }
  }

  return (
    <aside className="not-prose my-10 border-y border-gray-200 py-7">
      <p className="font-serif text-2xl text-gray-900">Curious about buying one?</p>
      <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
        I'm still working out what these will be. Leave your email and I'll let you know when they're real.
      </p>

      <form className="mt-5 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="art-waitlist-email">Email address</label>
        <input
          id="art-waitlist-email"
          className="min-w-0 flex-1 border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={event => setEmail(event.target.value)}
          disabled={formState === 'submitting' || formState === 'success'}
          required
        />
        <button
          className="bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="submit"
          disabled={formState === 'submitting' || formState === 'success'}
        >
          {formState === 'submitting' ? 'Joining…' : formState === 'success' ? 'Joined' : 'Keep me posted'}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${formState === 'error' ? 'text-red-600' : 'text-gray-600'}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </aside>
  )
}
