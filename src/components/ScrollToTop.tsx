import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    // Back/forward keeps whatever position the browser restores.
    if (navigationType === 'POP') return

    if (hash) {
      // Lazy routes render a frame or two later, so retry briefly.
      let frames = 0
      let raf = 0
      const findAnchor = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (el) {
          el.scrollIntoView()
        } else if (frames++ < 10) {
          raf = requestAnimationFrame(findAnchor)
        }
      }
      findAnchor()
      return () => cancelAnimationFrame(raf)
    }

    window.scrollTo(0, 0)
  }, [pathname, hash, navigationType])

  return null
}
