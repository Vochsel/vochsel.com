const livestreamUrl = 'https://youtube.com/live/STqi7rXRCFc?feature=share'

const prints = [
  {
    name: 'Zenith twist vase',
    description: 'A tall, three-lobed vase with a continuous spiral.',
    status: 'In progress',
    statusClassName: 'bg-amber-50 text-amber-700 ring-amber-200',
    linkLabel: 'Open in Printa',
    href: 'https://printa.vochsel.com/editor?spec=eyJ2ZXJzaW9uIjoiMS4wIiwibmFtZSI6Ilplbml0aCB0d2lzdCB2YXNlIiwiZGVzY3JpcHRpb24iOiJBIHRhbGwgdGhyZWUtbG9iZWQgdmFzZSB3aXRoIGEgc3Ryb25nIGNvbnRpbnVvdXMgc3BpcmFsLiIsInVuaXRzIjoibW0iLCJyb290Ijp7ImtpbmQiOiJzaGFwZSIsImlkIjoiemVuaXRoIiwic291cmNlIjp7InR5cGUiOiJyZXZvbHZlIiwicHJvZmlsZSI6W1syNCwwXSxbMjcsMjBdLFsyOSw1NV0sWzI4LDEwNV0sWzI1LDE1MF0sWzI0LDE3Ml1dLCJzZWdtZW50cyI6MTgwLCJwcm9maWxlU2VnbWVudHMiOjEzMCwicmFkaXVzT2Zmc2V0IjowLCJ3YWxsIjo0LCJib3R0b21DYXAiOnRydWUsImJvdHRvbVRoaWNrbmVzcyI6My4yLCJ0b3BDYXAiOmZhbHNlLCJ0b3BUaGlja25lc3MiOjIuNCwiaW50ZXJwb2xhdGlvbiI6ImNhdG11bGwtcm9tIiwiYXhpcyI6InoifSwibW9kaWZpZXJzIjpbeyJ0eXBlIjoicmFkaWFsV2F2ZSIsImFtcGxpdHVkZSI6Ny4yLCJjb3VudCI6MywicGhhc2VEZWciOjkwLCJheGlhbFR1cm5zIjowfSx7InR5cGUiOiJ0d2lzdCIsImFuZ2xlRGVnIjoxODUsInN0YXJ0IjowLCJlbmQiOjF9LHsidHlwZSI6InRhcGVyIiwiZnJvbSI6MS4wNCwidG8iOjAuODQsImVhc2luZyI6InNtb290aHN0ZXAifV0sIm1hdGVyaWFsIjoicmVzaW4ifSwicHJpbnQiOnsiYnVpbGRWb2x1bWUiOlsyNTYsMjU2LDI1Nl0sImF1dG9DZW50ZXIiOnRydWUsInBsYWNlT25CZWQiOnRydWUsImludGVyaW9yU3RydXRzIjp7ImVuYWJsZWQiOmZhbHNlLCJwYXR0ZXJuIjoiZGlhbW9uZCIsInNwYWNpbmciOjE4LCJkaWFtZXRlciI6MS44LCJib3VuZGFyeUluc2V0IjozLCJ3YWxsT3ZlcmxhcCI6MC44LCJyYWRpYWxTZWdtZW50cyI6MTB9fSwiZGlzcGxheSI6eyJmbG9vciI6dHJ1ZSwiZ3JpZCI6dHJ1ZSwiYnVpbGRQbGF0ZSI6ZmFsc2UsImRpbWVuc2lvbnMiOnsidmlzaWJsZSI6dHJ1ZSwid2lkdGgiOnRydWUsImhlaWdodCI6dHJ1ZSwib2Zmc2V0Ijo5LCJwcmVjaXNpb24iOjF9fSwibWV0YWRhdGEiOnsiZmFtaWx5IjoidmFzZSIsImxvYmVzIjozfX0',
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
    image: '/prints/ben-text.jpg',
    imageAlt: 'White 3D-printed letters spelling BEN on a timber table',
  },
]

export default function ThreeDPrinting() {
  return (
    <article className="py-6 sm:py-12">
      <header className="mb-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
          Live from the workshop
        </p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          3D printing
        </h1>
      </header>

      <div className="overflow-hidden rounded-xl bg-gray-950 shadow-sm ring-1 ring-gray-200">
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
        <h2 className="mb-3 text-xl font-semibold">A new machine</h2>
        <p className="leading-7 text-gray-600">
          I bought a Bambu Lab P2S, so I’m learning the machine, making useful
          things, and seeing where a new 3D-printing rabbit hole takes me. I’ll
          stream the experiments here—successful prints, spaghetti, and all.
        </p>
        <a
          href={livestreamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
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
            <li key={print.name} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              {print.image && (
                <img
                  src={print.image}
                  alt={print.imageAlt}
                  className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
                  loading="lazy"
                  width="1800"
                  height="1350"
                />
              )}
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold">{print.name}</h3>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${print.statusClassName}`}>
                    {print.status}
                  </span>
                </div>
                <p className="max-w-2xl leading-7 text-gray-600">{print.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  {print.date && print.dateTime && (
                    <time dateTime={print.dateTime} className="text-gray-400">
                      {print.date}
                    </time>
                  )}
                  <a
                    href={print.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-500 transition-colors hover:text-gray-900"
                  >
                    {print.linkLabel} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}
