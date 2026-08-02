import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { archiveLinks, currentProjects, pastProjects, type CurrentProject, type PastProject } from '../data/siteLinks'

const externalProps = (href: string) => href.startsWith('http')
  ? { target: '_blank', rel: 'noopener noreferrer' }
  : {}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function ProjectCard({
  project,
  tint,
  wide = false,
  eager = false,
}: {
  project: CurrentProject
  tint: string
  wide?: boolean
  eager?: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const handlePointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') return

    const card = cardRef.current
    if (!card) return

    const bounds = card.getBoundingClientRect()
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5

    card.style.setProperty('--glow-x', `${horizontal * 34}px`)
    card.style.setProperty('--glow-y', `${vertical * 28}px`)
    card.style.setProperty('--content-x', `${horizontal * 7}px`)
    card.style.setProperty('--content-y', `${vertical * 6}px`)
  }

  const resetParallax = () => {
    const card = cardRef.current
    if (!card) return

    card.style.setProperty('--glow-x', '0px')
    card.style.setProperty('--glow-y', '0px')
    card.style.setProperty('--content-x', '0px')
    card.style.setProperty('--content-y', '0px')
  }

  return (
    <Link
      ref={cardRef}
      to={project.href}
      onPointerMove={handlePointerMove}
      onPointerDown={resetParallax}
      onPointerLeave={resetParallax}
      onPointerCancel={resetParallax}
      className={`home-project-card group relative isolate flex min-h-64 min-w-0 overflow-hidden border border-white/65 p-5 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/40 dark:border-white/10 dark:focus-visible:ring-white/40 sm:min-h-72 sm:p-8 ${wide ? 'md:col-span-2' : ''} ${tint}`}
    >
      <img
        className="home-project-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-multiply saturate-125 contrast-105 dark:opacity-55 dark:mix-blend-normal dark:saturate-110"
        src={project.image}
        alt={project.imageAlt}
        style={{ objectPosition: project.imagePosition }}
        loading={eager ? 'eager' : 'lazy'}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-white/0 to-white/5 dark:from-black/60 dark:via-black/5 dark:to-black/10" />
      <span
        className="pointer-events-none absolute -left-14 -top-20 h-64 w-64 rounded-full bg-white/35 blur-3xl transition-transform duration-150 ease-out dark:bg-white/5"
        style={{ transform: 'translate3d(var(--glow-x, 0px), var(--glow-y, 0px), 0) scale(1.1)' }}
      />
      <span className="pointer-events-none absolute inset-2 rounded-[1.55rem] border border-white/45 shadow-[inset_0_0_48px_rgba(255,255,255,0.16)] dark:border-white/10 dark:shadow-[inset_0_0_48px_rgba(255,255,255,0.04)]" />
      <span
        className="relative flex w-full flex-col justify-between transition-transform duration-150 ease-out"
        style={{ transform: 'translate3d(var(--content-x, 0px), var(--content-y, 0px), 0)' }}
      >
        <span className="flex items-start justify-end">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/45 bg-white/45 backdrop-blur-md transition-colors group-hover:bg-white/75 dark:border-white/10 dark:bg-black/25 dark:group-hover:bg-white/15">
            <Arrow />
          </span>
        </span>
        <span>
          <span className="block text-[2.15rem] font-medium tracking-[-0.06em] sm:text-5xl">{project.name}</span>
          <span className="mt-3 block max-w-sm text-sm leading-6 text-black/50 dark:text-white/55">{project.description}</span>
        </span>
      </span>
    </Link>
  )
}

function ProjectIcon({ project }: { project: PastProject }) {
  if (project.favicon) {
    return <img src={project.favicon} alt="" width="20" height="20" className="h-5 w-5 object-contain" />
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 4.5 7.2 12 11.5l7.5-4.3L12 3Z" />
      <path d="m4.5 7.2.1 8.7L12 21v-9.5" />
      <path d="m19.5 7.2-.1 8.7L12 21" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

export default function Landing() {
  const cardColours = [
    'bg-[#d7e2ff]/70 dark:bg-[#17233d]/85',
    'bg-[#ffd9ee]/70 dark:bg-[#3a1d30]/85',
    'bg-[#ddf1d5]/70 dark:bg-[#20301f]/85',
    'bg-[#ffe1bd]/70 dark:bg-[#3a2a1a]/85',
    'bg-[#e6ddff]/70 dark:bg-[#28213d]/85',
  ]

  return (
    <div className="relative min-h-screen bg-[#f5f5f3] text-[#20201e] selection:bg-[#1f4eea] selection:text-white dark:bg-[#10110f] dark:text-[#f1f1ec]">
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-10 sm:py-10">
        <header className="flex items-center justify-between">
          <span className="font-serif text-xl font-bold">vochsel</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-white/70 bg-white/55 px-2.5 py-2 text-[10px] backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:gap-2 sm:px-3 sm:text-[11px]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#4eb869]" />
              <span className="whitespace-nowrap">33.8997° S, 151.1710° E</span>
            </div>
            <ThemeToggle subtle />
          </div>
        </header>

        <h1 className="sr-only">Ben Skinner — 3D art, music, objects and writing</h1>

        <section className="pt-10 sm:pt-16">
          <div className="mb-5">
            <h2 className="text-sm font-semibold">Currently</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {currentProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                tint={cardColours[index]}
                wide={index === currentProjects.length - 1}
                eager={index < 2}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 sm:mt-28">
          <div className="mb-5">
            <h2 className="text-sm font-semibold">Previously</h2>
          </div>
          <div className="rounded-[2rem] border border-white/65 bg-white/55 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:p-8">
            <div className="grid sm:grid-cols-2 sm:gap-x-8">
              {pastProjects.map(project => (
                <div
                  key={project.name}
                  className="flex min-w-0 items-center justify-between gap-4 border-b border-black/10 py-5 dark:border-white/10"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-black/8 bg-white/60 dark:border-white/10 dark:bg-white/5">
                      <ProjectIcon project={project} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{project.name}</span>
                      <span className="mt-1 block truncate text-xs text-black/40 dark:text-white/40">{project.description}</span>
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} on GitHub`}
                        title="GitHub"
                        className="grid h-9 w-9 place-items-center rounded-full text-black/35 transition-colors hover:bg-white/70 hover:text-black dark:text-white/35 dark:hover:bg-white/10 dark:hover:text-white"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                    <a
                      href={project.href}
                      {...externalProps(project.href)}
                      aria-label={`Open ${project.name}`}
                      title={`Open ${project.name}`}
                      className="grid h-9 w-9 place-items-center rounded-full text-black/35 transition-colors hover:bg-white/70 hover:text-black dark:text-white/35 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <Arrow />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-black/10 py-8 text-xs text-black/45 dark:border-white/10 dark:text-white/45 sm:mt-20 sm:flex-row sm:items-center">
          <span>© 2026 Ben Skinner</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {archiveLinks.map(link => (
              <a key={link.name} href={link.href} {...externalProps(link.href)} className="hover:text-black dark:hover:text-white">
                {link.name}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  )
}
