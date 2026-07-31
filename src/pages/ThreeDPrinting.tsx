import { usePageTitle } from '../hooks/usePageTitle'

const livestreamUrl = 'https://youtube.com/live/STqi7rXRCFc?feature=share'

type PrintImage = {
  src: string
  alt: string
  width: number
  height: number
}

type PrintVideo = {
  src: string
  label: string
}

type PrintEntry = {
  name: string
  description: string
  status: string
  statusClassName: string
  date?: string
  dateTime?: string
  linkLabel?: string
  href?: string
  images?: PrintImage[]
  video?: PrintVideo
}

const prints: PrintEntry[] = [
  {
    name: 'Zenith twist vase',
    description: 'A tall, three-lobed vase with a continuous spiral.',
    status: 'Printed',
    statusClassName: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    date: '20 July 2026',
    dateTime: '2026-07-20',
    linkLabel: 'Open in Printa',
    href: 'https://printa.vochsel.com/editor?spec=eyJ2ZXJzaW9uIjoiMS4wIiwibmFtZSI6Ilplbml0aCB0d2lzdCB2YXNlIiwiZGVzY3JpcHRpb24iOiJBIHRhbGwgdGhyZWUtbG9iZWQgdmFzZSB3aXRoIGEgc3Ryb25nIGNvbnRpbnVvdXMgc3BpcmFsLiIsInVuaXRzIjoibW0iLCJyb290Ijp7ImtpbmQiOiJzaGFwZSIsImlkIjoiemVuaXRoIiwic291cmNlIjp7InR5cGUiOiJyZXZvbHZlIiwicHJvZmlsZSI6W1syNCwwXSxbMjcsMjBdLFsyOSw1NV0sWzI4LDEwNV0sWzI1LDE1MF0sWzI0LDE3Ml1dLCJzZWdtZW50cyI6MTgwLCJwcm9maWxlU2VnbWVudHMiOjEzMCwicmFkaXVzT2Zmc2V0IjowLCJ3YWxsIjo0LCJib3R0b21DYXAiOnRydWUsImJvdHRvbVRoaWNrbmVzcyI6My4yLCJ0b3BDYXAiOmZhbHNlLCJ0b3BUaGlja25lc3MiOjIuNCwiaW50ZXJwb2xhdGlvbiI6ImNhdG11bGwtcm9tIiwiYXhpcyI6InoifSwibW9kaWZpZXJzIjpbeyJ0eXBlIjoicmFkaWFsV2F2ZSIsImFtcGxpdHVkZSI6Ny4yLCJjb3VudCI6MywicGhhc2VEZWciOjkwLCJheGlhbFR1cm5zIjowfSx7InR5cGUiOiJ0d2lzdCIsImFuZ2xlRGVnIjoxODUsInN0YXJ0IjowLCJlbmQiOjF9LHsidHlwZSI6InRhcGVyIiwiZnJvbSI6MS4wNCwidG8iOjAuODQsImVhc2luZyI6InNtb290aHN0ZXAifV0sIm1hdGVyaWFsIjoicmVzaW4ifSwicHJpbnQiOnsiYnVpbGRWb2x1bWUiOlsyNTYsMjU2LDI1Nl0sImF1dG9DZW50ZXIiOnRydWUsInBsYWNlT25CZWQiOnRydWUsImludGVyaW9yU3RydXRzIjp7ImVuYWJsZWQiOmZhbHNlLCJwYXR0ZXJuIjoiZGlhbW9uZCIsInNwYWNpbmciOjE4LCJkaWFtZXRlciI6MS44LCJib3VuZGFyeUluc2V0IjozLCJ3YWxsT3ZlcmxhcCI6MC44LCJyYWRpYWxTZWdtZW50cyI6MTB9fSwiZGlzcGxheSI6eyJmbG9vciI6dHJ1ZSwiZ3JpZCI6dHJ1ZSwiYnVpbGRQbGF0ZSI6ZmFsc2UsImRpbWVuc2lvbnMiOnsidmlzaWJsZSI6dHJ1ZSwid2lkdGgiOnRydWUsImhlaWdodCI6dHJ1ZSwib2Zmc2V0Ijo5LCJwcmVjaXNpb24iOjF9fSwibWV0YWRhdGEiOnsiZmFtaWx5IjoidmFzZSIsImxvYmVzIjozfX0',
    video: {
      src: '/prints/zenith-twist-vase.mp4',
      label: 'Gold Zenith twist vase printing at five times speed',
    },
    images: [
      {
        src: '/prints/zenith-twist-vase-front.jpg',
        alt: 'Metallic 3D-printed Zenith twist vase viewed from the front',
        width: 1400,
        height: 1935,
      },
      {
        src: '/prints/zenith-twist-vase-back.jpg',
        alt: 'Metallic 3D-printed Zenith twist vase viewed from the reverse side',
        width: 1400,
        height: 1902,
      },
    ],
  },
  {
    name: 'BEN text',
    description: 'A first custom wordmark print, made as three freestanding letters.',
    status: 'Printed',
    statusClassName: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    date: '20 July 2026, 10:00 am',
    dateTime: '2026-07-20T10:00:00+10:00',
    linkLabel: 'Open in Printa',
    href: 'https://printa.vochsel.com/editor?spec=eyJ2ZXJzaW9uIjoiMS4wIiwibmFtZSI6IlR5cGUgc3BlY2ltZW4iLCJkZXNjcmlwdGlvbiI6IkEgZnVsbHkgc3BlYy1kcml2ZW4gR29vZ2xlIEZvbnQgd29yZG1hcmsgd2l0aCBwcmludGFibGUgc3R5bGluZyBhbmQgbGl2ZSBkaW1lbnNpb25zLiIsInVuaXRzIjoibW0iLCJyb290Ijp7ImtpbmQiOiJzaGFwZSIsImlkIjoid29yZG1hcmsiLCJzb3VyY2UiOnsidHlwZSI6InRleHQiLCJ0ZXh0IjoiQkVOIiwiZm9udCI6IkJlYmFzIE5ldWUiLCJzaXplIjo0MiwiZGVwdGgiOjEwLCJiZXZlbCI6MSwiYmV2ZWxTZWdtZW50cyI6NCwiY3VydmVTZWdtZW50cyI6MTIsImV4dHJ1ZGVTZWdtZW50cyI6MSwiYmV2ZWxTaWRlIjoiYm90aCIsInNtb290aE5vcm1hbHMiOnRydWUsInRleHRDYXNlIjoib3JpZ2luYWwiLCJ3ZWlnaHQiOiJib2xkIiwiaXRhbGljIjpmYWxzZSwidW5kZXJsaW5lIjpmYWxzZX0sIm1vZGlmaWVycyI6W10sIm1hdGVyaWFsIjoicGxhLW9yYW5nZSJ9LCJwcmludCI6eyJidWlsZFZvbHVtZSI6WzI1NiwyNTYsMjU2XSwiYXV0b0NlbnRlciI6dHJ1ZSwicGxhY2VPbkJlZCI6dHJ1ZSwiaW50ZXJpb3JTdHJ1dHMiOnsiZW5hYmxlZCI6ZmFsc2UsInBhdHRlcm4iOiJkaWFtb25kIiwic3BhY2luZyI6MTgsImRpYW1ldGVyIjoxLjgsImJvdW5kYXJ5SW5zZXQiOjMsIndhbGxPdmVybGFwIjowLjgsInJhZGlhbFNlZ21lbnRzIjoxMH19LCJkaXNwbGF5Ijp7ImZsb29yIjp0cnVlLCJncmlkIjp0cnVlLCJidWlsZFBsYXRlIjpmYWxzZSwiZGltZW5zaW9ucyI6eyJ2aXNpYmxlIjp0cnVlLCJ3aWR0aCI6dHJ1ZSwiaGVpZ2h0Ijp0cnVlLCJvZmZzZXQiOjksInByZWNpc2lvbiI6MX19LCJtZXRhZGF0YSI6eyJmYW1pbHkiOiJ0ZXh0IiwiZm9udCI6IlNwYWNlIEdyb3Rlc2sifX0',
    video: {
      src: '/prints/ben-text.mp4',
      label: 'BEN text printing at five times speed',
    },
    images: [
      {
        src: '/prints/ben-text.jpg',
        alt: 'White 3D-printed letters spelling BEN on a timber table',
        width: 1800,
        height: 1350,
      },
    ],
  },
  {
    name: 'Self-portrait, circa 2015',
    description: 'A small gold print made from a self-portrait created around 2015.',
    status: 'Printed',
    statusClassName: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    date: '20 July 2026',
    dateTime: '2026-07-20',
    video: {
      src: '/prints/self-portrait-2015.mp4',
      label: 'Circa-2015 self-portrait printing at five times speed',
    },
  },
  {
    name: 'Basketball holder',
    description: 'A low-profile holder designed to keep a basketball in place.',
    status: 'Printed',
    statusClassName: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    date: '20 July 2026',
    dateTime: '2026-07-20',
    video: {
      src: '/prints/basketball-holder.mp4',
      label: 'Basketball holder printing at five times speed',
    },
  },
]

export default function ThreeDPrinting() {
  usePageTitle('3D Printing Experiments by Ben Skinner', {
    description: '3D printing experiments, timelapses, and workshop notes from Ben Skinner, made with a Bambu Lab P2S.',
  })

  return (
    <article className="pb-6 sm:pb-12">
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          3D printing
        </h1>
      </header>

      <div className="site-media overflow-hidden bg-gray-950 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/STqi7rXRCFc"
            title="Vochsel 3D printing livestream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="mb-4 text-xl font-semibold">Five years later</h2>
        <div className="space-y-5 leading-7 text-gray-600">
          <p>
            It’s taken five years—and it only happened because it’s cheaper than
            the TV and car I want—but I finally bought a 3D printer: a Bambu Lab
            P2S.
          </p>
          <p>
            So far, so great. They’re not joking when they call this thing
            plug-and-print. The four-spool accessory feeder is a must-have: it
            actually swaps and feeds filament automatically. I honestly thought
            it just held the spools.
          </p>
          <p>
            I wanted a quick, enjoyable way to make models. I was tempted to use{' '}
            <a
              href="https://procgeo.vochsel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              rs-procgeo
            </a>
            , but I’ve been playing with the idea of an LLM-writable JSON/YAML
            schema for procedural geometry, and this seemed like the right time
            to try it. That experiment became{' '}
            <a
              href="https://printa.vochsel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Printa
            </a>
            , which also has a handy MCP that works in ChatGPT. Almost all of the
            text pieces and vases below were made in one shot.
          </p>
          <p>
            I’m trying to keep a better record of what I make, so here’s
            everything I’ve printed so far.
          </p>
        </div>
        <a
          href={livestreamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link mt-5 inline-flex items-center gap-2 text-sm"
        >
          Watch on YouTube <span aria-hidden="true">↗</span>
        </a>
      </div>

      <section className="mt-16 border-t border-gray-200 pt-10" aria-labelledby="print-log-heading">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
              From the print bed
            </p>
            <h2 id="print-log-heading" className="font-serif text-3xl font-bold">
              Print log
            </h2>
          </div>
          <p className="text-sm text-gray-400">{prints.length} prints</p>
        </div>

        <ol className="space-y-6">
          {prints.map((print) => (
            <li key={print.name} className="site-media overflow-hidden border border-gray-200 bg-white">
              {print.video && (
                <video
                  className="aspect-video w-full bg-gray-950 object-cover"
                  aria-label={print.video.label}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src={print.video.src} type="video/mp4" />
                </video>
              )}
              {print.images && (
                <div className={print.images.length > 1 ? 'grid gap-px bg-gray-200 sm:grid-cols-2' : ''}>
                  {print.images.map((image) => (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className={print.images!.length > 1
                        ? 'aspect-[4/5] h-full w-full object-cover'
                        : 'aspect-[4/3] w-full object-cover sm:aspect-[16/9]'}
                      loading="lazy"
                      width={image.width}
                      height={image.height}
                    />
                  ))}
                </div>
              )}
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold">{print.name}</h3>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${print.statusClassName}`}>
                    {print.status}
                  </span>
                </div>
                <p className="max-w-2xl leading-7 text-gray-600">{print.description}</p>
                {(print.date || print.href) && (
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    {print.date && print.dateTime && (
                      <time dateTime={print.dateTime} className="text-gray-400">
                        {print.date}
                      </time>
                    )}
                    {print.href && print.linkLabel && (
                      <a
                        href={print.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        {print.linkLabel} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}
