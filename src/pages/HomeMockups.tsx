import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { archiveLinks, currentProjects, pastProjects } from '../data/siteLinks'

const externalProps = (href: string) => href.startsWith('http')
  ? { target: '_blank', rel: 'noopener noreferrer' }
  : {}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function MockupSwitcher({ dark = false }: { dark?: boolean }) {
  const { concept } = useParams()

  return (
    <nav
      aria-label="Homepage concepts"
      className={`fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border p-1 text-xs shadow-lg backdrop-blur-md ${
        dark
          ? 'border-white/15 bg-black/75 text-white'
          : 'border-black/10 bg-white/80 text-black'
      }`}
    >
      <Link
        to="/"
        className={`whitespace-nowrap rounded-full px-3 py-2 transition-colors ${
          dark ? 'hover:bg-white/15' : 'hover:bg-black/5'
        }`}
      >
        ← Home
      </Link>
      <span className={`h-4 w-px ${dark ? 'bg-white/20' : 'bg-black/10'}`} />
      {[1, 2, 3, 4, 5].map((number) => {
        const isActive = concept === String(number)

        return (
          <Link
            key={number}
            to={`/mockups/${number}`}
            aria-label={`View concept ${number}`}
            aria-current={isActive ? 'page' : undefined}
            className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
              isActive
                ? dark ? 'bg-white text-black' : 'bg-black text-white'
                : dark ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'
            }`}
          >
            {number}
          </Link>
        )
      })}
    </nav>
  )
}

function ConceptOne() {
  return (
    <div className="min-h-screen bg-[#f0ede5] pb-28 text-[#1e1d19]">
      <main className="mx-auto max-w-[1440px] px-5 sm:px-10">
        <header className="flex items-center justify-between border-b border-black/20 py-6 text-[11px] font-medium uppercase tracking-[0.18em]">
          <span>Vochsel / Ben Skinner</span>
          <span className="hidden sm:block">Sydney, Australia · 2026</span>
          <span>Index 01</span>
        </header>

        <section className="grid gap-10 border-b border-black/20 py-16 sm:py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-8">
            <p className="mb-8 text-xs uppercase tracking-[0.2em] text-black/45">Independent practice</p>
            <h1 className="font-serif text-[clamp(4rem,11vw,10rem)] leading-[0.78] tracking-[-0.055em]">
              Ben<br />Skinner<span className="text-[#c7462d]">.</span>
            </h1>
          </div>
          <div className="flex items-end lg:col-span-4">
            <p className="max-w-sm text-xl leading-snug tracking-tight sm:text-2xl">
              Software engineer and creative technologist working between code,
              sound, images, and physical things.
            </p>
          </div>
        </section>

        <section className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">Current life</h2>
              <span className="text-xs text-black/45">Four ongoing threads</span>
            </div>
            <div className="border-t border-black">
              {currentProjects.map((project, index) => (
                <a
                  key={project.name}
                  href={project.href}
                  {...externalProps(project.href)}
                  className="group grid gap-3 border-b border-black/20 py-5 transition-[padding] hover:pl-3 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
                >
                  <span className="text-xs text-black/40">0{index + 1}</span>
                  <span>
                    <span className="block text-2xl tracking-tight sm:text-3xl">{project.name}</span>
                    <span className="mt-1 block text-sm text-black/50">{project.description}</span>
                  </span>
                  <span className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-black/45">
                    {project.type} <span className="text-lg text-black transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><Arrow /></span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 lg:pl-10">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em]">Past life</h2>
            <ol className="space-y-5">
              {pastProjects.map((project, index) => (
                <li key={project.name} className="flex gap-4">
                  <span className="pt-1 text-[10px] text-black/35">{String(index + 1).padStart(2, '0')}</span>
                  <a href={project.href} {...externalProps(project.href)} className="group">
                    <span className="border-b border-transparent text-lg group-hover:border-black">{project.name}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-black/45">{project.description}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 border-t border-black/20 pt-5 text-xs text-black/45">
              {archiveLinks.map((link) => (
                <a key={link.name} href={link.href} {...externalProps(link.href)} className="hover:text-black">
                  {link.name}
                </a>
              ))}
            </div>
          </aside>
        </section>
      </main>
      <MockupSwitcher />
    </div>
  )
}

function ConceptTwo() {
  return (
    <div className="min-h-screen bg-[#0a0b0a] pb-28 font-mono text-[#efeee8] selection:bg-[#b8ff62] selection:text-black">
      <main className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <header className="grid grid-cols-2 border-x border-white/15 text-[10px] uppercase tracking-[0.2em] sm:grid-cols-4">
          <div className="border-b border-r border-white/15 p-4 sm:border-b-0">Vochsel®</div>
          <div className="border-b border-white/15 p-4 sm:border-b-0 sm:border-r">Creative systems</div>
          <div className="hidden border-r border-white/15 p-4 text-white/40 sm:block">33.8688° S / 151.2093° E</div>
          <div className="hidden p-4 text-right text-[#b8ff62] sm:block">● Available</div>
        </header>

        <section className="grid border-x border-t border-white/15 lg:grid-cols-[1.35fr_.65fr]">
          <div className="border-b border-white/15 p-5 sm:p-10 lg:border-b-0 lg:border-r">
            <p className="mb-12 text-xs uppercase tracking-[0.2em] text-white/40">Ben Skinner / 2026</p>
            <h1 className="max-w-5xl text-[clamp(3.6rem,8vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              I make systems<span className="text-[#b8ff62]">↘</span><br />
              for digital &amp;<br />
              physical worlds.
            </h1>
          </div>
          <div className="flex flex-col justify-between border-b border-white/15 p-5 sm:p-10 lg:border-b-0">
            <p className="max-w-sm text-sm leading-6 text-white/55">
              Software engineer. Creative technologist. Usually somewhere
              between a terminal, a synth, and a 3D printer.
            </p>
            <div className="mt-16">
              <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                <span className="h-2 w-2 bg-[#b8ff62]" />
                Current signal
              </div>
              <p className="text-xs text-white/70">SYD — 09:42:18 — ONLINE</p>
            </div>
          </div>
        </section>

        <section className="border-x border-t border-white/15">
          <div className="flex items-center justify-between border-b border-white/15 p-4 text-[10px] uppercase tracking-[0.2em]">
            <h2>Selected output</h2>
            <span className="text-white/35">001—004</span>
          </div>
          <div className="grid sm:grid-cols-2">
            {currentProjects.map((project, index) => (
              <a
                key={project.name}
                href={project.href}
                {...externalProps(project.href)}
                className={`group min-h-60 border-b border-white/15 p-5 transition-colors hover:bg-[#b8ff62] hover:text-black sm:p-8 ${
                  index % 2 === 0 ? 'sm:border-r' : ''
                }`}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] text-white/35 group-hover:text-black/45">0{index + 1} / {project.type}</span>
                    <span className="text-xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><Arrow /></span>
                  </div>
                  <div>
                    <h3 className="text-3xl tracking-[-0.05em] sm:text-5xl">{project.name}</h3>
                    <p className="mt-3 max-w-sm text-xs leading-5 text-white/45 group-hover:text-black/60">{project.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="grid border-x border-t border-white/15 lg:grid-cols-[.35fr_.65fr]">
          <div className="border-b border-white/15 p-5 text-[10px] uppercase tracking-[0.2em] text-white/35 lg:border-b-0 lg:border-r">
            Previous processes
          </div>
          <div>
            {pastProjects.map((project, index) => (
              <a
                key={project.name}
                href={project.href}
                {...externalProps(project.href)}
                className="group grid grid-cols-[2rem_1fr_auto] items-center border-b border-white/15 p-4 text-sm hover:bg-white hover:text-black"
              >
                <span className="text-[10px] opacity-40">{index + 1}</span>
                <span>{project.name}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Archive ↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <MockupSwitcher dark />
    </div>
  )
}

function ConceptThree() {
  return (
    <div className="min-h-screen bg-[#f7f7f2] pb-28 text-[#121212] selection:bg-[#ff4d18] selection:text-white">
      <main>
        <header className="grid min-h-24 grid-cols-[1fr_auto] border-b-2 border-black px-5 sm:px-10">
          <div className="flex items-center">
            <span className="text-3xl font-bold tracking-[-0.08em]">vochsel</span>
            <span className="ml-1 self-start pt-6 text-2xl text-[#ff4d18]">●</span>
          </div>
          <div className="flex items-center border-l-2 border-black pl-5 text-[10px] font-semibold uppercase tracking-[0.18em] sm:pl-10">
            Ben Skinner<br />Sydney AU
          </div>
        </header>

        <section className="grid border-b-2 border-black lg:grid-cols-[.7fr_1.3fr]">
          <div className="flex min-h-[24rem] flex-col justify-between border-b-2 border-black p-5 sm:p-10 lg:min-h-[38rem] lg:border-b-0 lg:border-r-2">
            <p className="max-w-xs text-sm leading-6">
              A software engineer and creative technologist making tools,
              images, sounds, and objects.
            </p>
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]">Currently curious about</p>
              <p className="text-2xl font-medium leading-tight sm:text-3xl">Small tools.<br />Strange interfaces.<br />Physical output.</p>
            </div>
          </div>
          <div className="flex items-end bg-[#ff4d18] p-5 text-white sm:p-10">
            <h1 className="text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.78] tracking-[-0.085em]">
              Design<br />through<br />making.
            </h1>
          </div>
        </section>

        <section>
          <div className="grid border-b-2 border-black lg:grid-cols-[.7fr_1.3fr]">
            <h2 className="border-b-2 border-black p-5 text-xs font-bold uppercase tracking-[0.2em] sm:p-10 lg:border-b-0 lg:border-r-2">
              01 / Current life
            </h2>
            <div>
              {currentProjects.map((project, index) => (
                <a
                  key={project.name}
                  href={project.href}
                  {...externalProps(project.href)}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center border-b-2 border-black p-5 last:border-b-0 hover:bg-black hover:text-white sm:grid-cols-[5rem_1fr_10rem] sm:p-8"
                >
                  <span className="text-xs font-semibold">0{index + 1}</span>
                  <span className="text-3xl font-semibold tracking-[-0.055em] sm:text-5xl">{project.name}</span>
                  <span className="hidden text-right text-[10px] font-semibold uppercase tracking-[0.18em] opacity-45 sm:block">
                    {project.type}<br />Open ↗
                  </span>
                  <span className="text-xl sm:hidden"><Arrow /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="grid border-b-2 border-black lg:grid-cols-[.7fr_1.3fr]">
          <div className="border-b-2 border-black p-5 sm:p-10 lg:border-b-0 lg:border-r-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">02 / Past life</h2>
          </div>
          <div className="grid sm:grid-cols-2">
            {pastProjects.map((project, index) => (
              <a
                key={project.name}
                href={project.href}
                {...externalProps(project.href)}
                className={`group min-h-40 border-b-2 border-black p-5 sm:p-7 ${
                  index % 2 === 0 ? 'sm:border-r-2' : ''
                }`}
              >
                <span className="text-[10px] font-bold">0{index + 1}</span>
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="mt-1 text-xs opacity-50">{project.description}</p>
                  </div>
                  <span className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><Arrow /></span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <MockupSwitcher />
    </div>
  )
}

function InsetProjectCard({
  project,
  tint,
}: {
  project: (typeof currentProjects)[number]
  tint: string
}) {
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
      {...externalProps(project.href)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
      className={`group relative isolate flex min-h-72 overflow-hidden rounded-[2rem] border border-white/65 p-6 backdrop-blur-xl sm:p-8 ${tint}`}
    >
      <img
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply saturate-75 transition-transform duration-500 group-hover:scale-[1.025]"
        src={project.image}
        alt={project.imageAlt}
        style={{ objectPosition: project.imagePosition }}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/55 via-white/5 to-white/20" />
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

function ProductIcon({ project }: { project: (typeof pastProjects)[number] }) {
  if (project.favicon) {
    return (
      <img
        src={project.favicon}
        alt=""
        width="20"
        height="20"
        className="h-5 w-5 object-contain"
      />
    )
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

function ConceptFour() {
  const cardColours = [
    'bg-[#d7e2ff]/70',
    'bg-[#ffd9ee]/70',
    'bg-[#ddf1d5]/70',
    'bg-[#ffe1bd]/70',
    'bg-[#e6ddff]/70',
  ]

  return (
    <div className="relative min-h-screen bg-[#f5f5f3] pb-28 text-[#20201e] selection:bg-[#1f4eea] selection:text-white">
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
            <h2 className="text-sm font-semibold">Current life</h2>
            <span className="text-xs text-black/35">Four places to start</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {currentProjects.map((project, index) => (
              <InsetProjectCard
                key={project.name}
                project={project}
                tint={cardColours[index]}
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
              {pastProjects.map((project) => (
                <div
                  key={project.name}
                  className="flex min-w-0 items-center justify-between gap-4 border-b border-black/10 py-5 sm:odd:mr-8"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-black/8 bg-white/60">
                      <ProductIcon project={project} />
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
                      title="Open product"
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
            {archiveLinks.map((link) => (
              <a key={link.name} href={link.href} {...externalProps(link.href)} className="hover:text-black">
                {link.name}
              </a>
            ))}
          </div>
        </footer>
      </main>
      <MockupSwitcher />
    </div>
  )
}

function ConceptFive() {
  return (
    <div className="min-h-screen bg-white pb-28 text-[#171715] selection:bg-black selection:text-white">
      <main className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <header className="flex h-24 items-center justify-between border-b border-black">
          <span className="font-serif text-2xl">Vochsel</span>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.18em]">
            <span className="hidden text-black/40 sm:inline">Selected practice, 2015—26</span>
            <a href="https://github.com/Vochsel" target="_blank" rel="noopener noreferrer" className="border-b border-black pb-1">
              GitHub ↗
            </a>
          </div>
        </header>

        <section className="grid min-h-[70vh] border-b border-black lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-between border-b border-black py-10 pr-0 lg:border-b-0 lg:border-r lg:pr-10">
            <p className="text-xs uppercase tracking-[0.18em] text-black/45">Ben Skinner<br />Sydney, Australia</p>
            <div className="mt-24">
              <div className="mb-6 h-16 w-16 rounded-full bg-black" />
              <p className="max-w-xs text-lg leading-7">
                An independent practice spanning software, image, sound, and fabrication.
              </p>
            </div>
          </div>
          <div className="flex items-end py-10 lg:pl-10">
            <h1 className="font-serif text-[clamp(4rem,9.5vw,10rem)] leading-[0.82] tracking-[-0.045em]">
              Between<br />
              software<br />
              <span className="italic text-black/35">&amp; form.</span>
            </h1>
          </div>
        </section>

        <section className="grid border-b border-black lg:grid-cols-[1fr_2fr]">
          <div className="border-b border-black py-8 pr-0 lg:border-b-0 lg:border-r lg:pr-10">
            <p className="text-xs uppercase tracking-[0.18em]">Current life</p>
          </div>
          <div className="lg:pl-10">
            {currentProjects.map((project, index) => (
              <a
                key={project.name}
                href={project.href}
                {...externalProps(project.href)}
                className="group grid grid-cols-[2rem_1fr_auto] items-baseline border-b border-black/20 py-7 last:border-b-0"
              >
                <span className="text-xs text-black/35">0{index + 1}</span>
                <span className="font-serif text-3xl sm:text-5xl">{project.name}</span>
                <span className="font-serif text-2xl italic text-black/25 transition-colors group-hover:text-black">
                  {project.type} <Arrow />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="grid border-b border-black lg:grid-cols-[1fr_2fr]">
          <div className="border-b border-black py-8 pr-0 lg:border-b-0 lg:border-r lg:pr-10">
            <p className="text-xs uppercase tracking-[0.18em]">Past life</p>
          </div>
          <div className="grid py-4 lg:grid-cols-2 lg:gap-x-10 lg:pl-10">
            {pastProjects.map((project, index) => (
              <a
                key={project.name}
                href={project.href}
                {...externalProps(project.href)}
                className="group flex min-h-32 items-end justify-between border-b border-black/20 py-6"
              >
                <span>
                  <span className="mb-6 block text-[10px] text-black/35">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-2xl">{project.name}</span>
                </span>
                <span className="pb-1 text-black/25 group-hover:text-black"><Arrow /></span>
              </a>
            ))}
          </div>
        </section>

        <footer className="grid py-10 text-xs lg:grid-cols-[1fr_2fr]">
          <p className="text-black/40">A small corner of the internet.</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 lg:mt-0 lg:pl-10">
            {archiveLinks.map((link) => (
              <a key={link.name} href={link.href} {...externalProps(link.href)} className="border-b border-black/20 pb-1 hover:border-black">
                {link.name}
              </a>
            ))}
            <a href="https://soundcloud.com/vochsel" target="_blank" rel="noopener noreferrer" className="border-b border-black/20 pb-1 hover:border-black">
              soundcloud
            </a>
          </div>
        </footer>
      </main>
      <MockupSwitcher />
    </div>
  )
}

export default function HomeMockups() {
  const { concept } = useParams()

  switch (concept) {
    case '2':
      return <ConceptTwo />
    case '3':
      return <ConceptThree />
    case '4':
      return <ConceptFour />
    case '5':
      return <ConceptFive />
    default:
      return <ConceptOne />
  }
}
