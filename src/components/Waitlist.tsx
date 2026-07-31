import { type FormEvent, useState } from 'react'
import { ConvexProvider, ConvexReactClient, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { countries } from '../data/countries'

export type WaitlistVariant = 'art' | 'object' | 'music'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

type WaitlistProps = {
  variant: WaitlistVariant
  source?: string
}

type SavedWaitlistProfile = {
  email: string
  country: string
  interests: WaitlistVariant[]
}

const storageKey = 'vochsel-waitlist-profile'
const waitlistVariants: WaitlistVariant[] = ['art', 'object', 'music']

function loadSavedProfile(): SavedWaitlistProfile | null {
  try {
    const value = localStorage.getItem(storageKey)
    if (!value) return null

    const parsed = JSON.parse(value) as Partial<SavedWaitlistProfile>
    if (typeof parsed.email !== 'string' || typeof parsed.country !== 'string') return null

    return {
      email: parsed.email,
      country: parsed.country,
      interests: Array.isArray(parsed.interests)
        ? parsed.interests.filter((interest): interest is WaitlistVariant => waitlistVariants.includes(interest as WaitlistVariant))
        : [],
    }
  } catch {
    return null
  }
}

function saveProfile(profile: SavedWaitlistProfile) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(profile))
  } catch {
    // The signup still succeeds when browser storage is unavailable.
  }
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

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
    description: "Leave your details and I'll let you know about new music, vinyl, and physical releases.",
    success: "You're on the list. I'll let you know when something new is out.",
  },
}

function WaitlistForm({ variant, source }: WaitlistProps) {
  const joinWaitlist = useMutation(api.waitlist.join)
  const [profile, setProfile] = useState<SavedWaitlistProfile | null>(loadSavedProfile)
  const [email, setEmail] = useState(profile?.email ?? '')
  const [country, setCountry] = useState(profile?.country ?? '')
  const [formState, setFormState] = useState<FormState>(profile?.interests.includes(variant) ? 'success' : 'idle')
  const [message, setMessage] = useState(profile?.interests.includes(variant) ? "You're already on this list." : '')
  const content = copy[variant]
  const addingAnotherInterest = Boolean(profile?.interests.length && !profile.interests.includes(variant))

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

      const normalizedEmail = email.trim().toLowerCase()
      const normalizedCountry = country.trim().toUpperCase()
      const previousInterests = profile?.email === normalizedEmail ? profile.interests : []
      const nextProfile: SavedWaitlistProfile = {
        email: normalizedEmail,
        country: normalizedCountry,
        interests: [...new Set([...previousInterests, variant])],
      }

      saveProfile(nextProfile)
      setProfile(nextProfile)
      setEmail(normalizedEmail)
      setCountry(normalizedCountry)
      setFormState('success')
      setMessage(result.status === 'already_joined'
        ? "You're already on this list."
        : content.success)
    } catch {
      setFormState('error')
      setMessage('Something went wrong. Check your details and try again.')
    }
  }

  const disabled = formState === 'submitting' || formState === 'success'
  const emailId = `${variant}-waitlist-email`
  const countryId = `${variant}-waitlist-country`

  return (
    <aside className="not-prose my-10 w-full border-y border-gray-200 py-7 dark:border-gray-800">
      <p className="font-serif text-2xl text-gray-900">{content.heading}</p>
      <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">{content.description}</p>

      <form className="mt-5 flex w-full flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={emailId}>Email address</label>
        <input
          id={emailId}
          className="min-w-0 flex-1 border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-400"
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
        <div className="relative shrink-0 sm:w-48">
          <select
            id={countryId}
            className="w-full appearance-none border border-gray-300 bg-white py-3 pl-4 pr-11 text-sm text-gray-900 outline-none transition focus:border-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-400"
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
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path d="m3.5 5.25 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <button
          className="primary-action justify-center disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
          type="submit"
          disabled={disabled}
        >
          {formState === 'submitting'
            ? 'Joining…'
            : formState === 'success'
              ? 'Joined'
              : addingAnotherInterest
                ? 'Add this too'
                : 'Keep me posted'}
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

export default function Waitlist(props: WaitlistProps) {
  return (
    <ConvexProvider client={convex}>
      <WaitlistForm {...props} />
    </ConvexProvider>
  )
}
