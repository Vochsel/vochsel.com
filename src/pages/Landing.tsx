import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { archiveLinks, currentProjects, pastProjects, type CurrentProject, type PastProject } from '../data/siteLinks'

const externalProps = (href: string) => href.startsWith('http')
  ? { target: '_blank', rel: 'noopener noreferrer' }
  : {}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function ProjectCard({ project, tint, wide = false }: { project: CurrentProject; tint: string; wide?: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const handlePointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
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
    <a
      ref={cardRef}
      href={project.href}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
      className={`group relative isolate flex min-h-72 overflow-hidden rounded-[2rem] border border-white/65 p-6 backdrop-blur-xl sm:p-8 ${wide ? 'md:col-span-2' : ''} ${tint}`}
    >
      <span
        className="pointer-events-none absolute -left-14 -top-20 h-64 w-64 rounded-full bg-white/60 blur-3xl transition-transform duration-150 ease-out"
        style={{ transform: 'translate3d(var(--glow-x, 0px), var(--glow-y, 0px), 0) scale(1.1)' }}
      />
      <span className="pointer-events-none absolute inset-2 rounded-[1.55rem] border border-white/45 shadow-[inset_0_0_48px_rgba(255,255,255,0.28)]" />
      <span
        className="relative flex w-full flex-col justify-between transition-transform duration-150 ease-out"
        style={{ transform: 'translate3d(var(--content-x, 0px), var(--content-y, 0px), 0)' }}
      >
        <span className="flex items-start justify-between">
          <span className="rounded-full border border-white/45 bg-white/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md">
            {project.type}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/45 bg-white/45 backdrop-blur-md transition-colors group-hover:bg-white/75">
            <Arrow />
          </span>
        </span>
        <span>
          <span className="block text-4xl font-medium tracking-[-0.06em] sm:text-5xl">{project.name}</span>
          <span className="mt-3 block max-w-sm text-sm leading-6 text-black/50">{project.description}</span>
        </span>
      </span>
    </a>
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
    'bg-[#d7e2ff]/70',
    'bg-[#ffd9ee]/70',
    'bg-[#ddf1d5]/70',
    'bg-[#ffe1bd]/70',
    'bg-[#e6ddff]/70',
  ]

  return (
    <div className="relative min-h-screen bg-[#f5f5f3] text-[#20201e] selection:bg-[#1f4eea] selection:text-white">
      <main className="relative z-10 mx-auto max-w-7xl px-5 py-6 sm:px-10 sm:py-10">
        <header className="flex items-center justify-between">
          <span className="text-lg font-semibold tracking-[-0.04em]">vochsel</span>
          <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-3 py-2 text-[11px] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#4eb869]" />
            Making things in Sydney
          </div>
        </header>

        <section className="pt-20 sm:pt-28">
          <div className="mb-5 flex items-end justify-between">
            <h1 className="text-sm font-semibold">Current life</h1>
            <span className="text-xs text-black/35">Five places to start</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {currentProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                tint={cardColours[index]}
                wide={index === currentProjects.length - 1}
              />
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] border border-white/65 bg-white/55 p-6 backdrop-blur-xl sm:mt-28 sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
            <div>
              <h2 className="text-sm font-semibold">Past life</h2>
              <p className="mt-2 text-sm text-black/40">Things that taught me something.</p>
            </div>
            <div className="grid sm:grid-cols-2">
              {pastProjects.map(project => (
                <div
                  key={project.name}
                  className="flex min-w-0 items-center justify-between gap-4 border-b border-black/10 py-5 sm:odd:mr-8"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-black/8 bg-white/60">
                      <ProjectIcon project={project} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{project.name}</span>
                      <span className="mt-1 block truncate text-xs text-black/40">{project.description}</span>
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
                        className="grid h-9 w-9 place-items-center rounded-full text-black/35 transition-colors hover:bg-white/70 hover:text-black"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                    <a
                      href={project.href}
                      {...externalProps(project.href)}
                      aria-label={`Open ${project.name}`}
                      title={`Open ${project.name}`}
                      className="grid h-9 w-9 place-items-center rounded-full text-black/35 transition-colors hover:bg-white/70 hover:text-black"
                    >
                      <Arrow />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 py-8 text-xs text-black/45">
          <span>© 2026 Ben Skinner</span>
          <div className="flex gap-5">
            {archiveLinks.map(link => (
              <a key={link.name} href={link.href} {...externalProps(link.href)} className="hover:text-black">
                {link.name}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  )
}
