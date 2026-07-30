import { useEffect, useState } from 'react'

const storageKey = 'theme'

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
}

export default function ThemeToggle({ subtle = false }: { subtle?: boolean }) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = () => {
      if (localStorage.getItem(storageKey)) return
      setIsDark(media.matches)
      applyTheme(media.matches)
    }

    media.addEventListener('change', handleSystemChange)
    return () => media.removeEventListener('change', handleSystemChange)
  }, [])

  function toggleTheme() {
    const nextIsDark = !isDark
    localStorage.setItem(storageKey, nextIsDark ? 'dark' : 'light')
    setIsDark(nextIsDark)
    applyTheme(nextIsDark)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={subtle
        ? 'grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/45 text-black/55 transition hover:bg-white/75 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white'
        : 'grid h-8 w-8 place-items-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-100'}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
        </svg>
      )}
    </button>
  )
}
