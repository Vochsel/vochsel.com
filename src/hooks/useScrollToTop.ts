import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Start every new page at the top, the way a full page load would.
 *
 * Two navigations are left alone: going back or forward, where the browser
 * restores the offset the reader left behind, and links that carry a hash,
 * which are meant to land on a heading rather than the top.
 */
export function useScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (navigationType === 'POP') return
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash, navigationType])
}
