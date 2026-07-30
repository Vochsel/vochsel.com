import { type FormEvent, useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { countries } from '../data/countries'

export type WaitlistVariant = 'art' | 'object' | 'music'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const copy: Record<WaitlistVariant, { heading: string; description: string; success: string }> = {
  art: {
    heading: 'Curious about buying one?',
    description: "I'm still working out what these will be. Leave your details and I'll let you know when they're real.",
    success: "You're on the list. I'll let you know when they're ready.",
  },
  object: {
    heading: 'Interested in the first pieces?',
    description: "They're still taking shape. Leave your details and I'll let you know when there's something you can buy.",
    success: "You're on the list. I'll let you know when the first pieces are ready.",
  },
  music: {
    heading: 'Want to hear the next thing?',
    description: "Leave your details and I'll let you know when I release something new.",
    success: "You're on the list. I'll let you know when something new is out.",
  },
}

export default function Waitlist({
  variant,
  source,
}: {
  variant: WaitlistVariant
  source?: string
}) {
  const joinWaitlist = useMutation(api.waitlist.join)
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')
  const content = copy[variant]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormState('submitting')
    setMessage('')

    try {
      const result = await joinWaitlist({
        email,
        country,
        variant,
        source: source ?? window.location.pathname,
      })

      setFormState('success')
      setMessage(result.status === 'already_joined'
        ? "You're already on this list."
        : content.success)
      setEmail('')
      setCountry('')
    } catch {
      setFormState('error')
      setMessage('Something went wrong. Check your details and try again.')
    }
  }

  const disabled = formState === 'submitting' || formState === 'success'
  const emailId = `${variant}-waitlist-email`
  const countryId = `${variant}-waitlist-country`

  return (
    <aside className="not-prose my-10 border-y border-gray-200 py-7">
      <p className="font-serif text-2xl text-gray-900">{content.heading}</p>
      <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">{content.description}</p>

      <form className="mt-5 flex max-w-2xl flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={emailId}>Email address</label>
        <input
          id={emailId}
          className="min-w-0 flex-1 border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={event => setEmail(event.target.value)}
          disabled={disabled}
          required
        />

        <label className="sr-only" htmlFor={countryId}>Country</label>
        <select
          id={countryId}
          className="border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 sm:w-48"
          name="country"
          autoComplete="country"
          value={country}
          onChange={event => setCountry(event.target.value)}
          disabled={disabled}
          required
        >
          <option value="" disabled>Country</option>
          {countries.map(option => (
            <option key={option.code} value={option.code}>{option.name}</option>
          ))}
        </select>

        <button
          className="bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="submit"
          disabled={disabled}
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
