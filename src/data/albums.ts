export interface AlbumTrack {
  title: string
  spotifyId: string
  durationMs: number
  explicit?: boolean
}

export interface Album {
  title: string
  year: number
  spotifyId: string
  cover: string
  tracks: AlbumTrack[]
}

export const albums: Album[] = [
  {
    title: 'Pretty Beach Tapes, Pt. 1',
    year: 2024,
    spotifyId: '0UMrdReFctAMGGnQ0qCR54',
    cover: '/music/albums/pretty-beach-tapes-pt-1.webp',
    tracks: [
      { title: 'Who is it &', spotifyId: '5nksDbr3azfNYL2fNHmQoo', durationMs: 135428 },
      { title: 'Slightly Off', spotifyId: '2MX6DckHldHhuVI8T7toGK', durationMs: 144375 },
      { title: "Didn't Disclose", spotifyId: '4tdW0v5u9sADBIcBSVZl9t', durationMs: 289523 },
      { title: 'November Rain', spotifyId: '6hsV5ZQE9WNnU1U7sCsDuh', durationMs: 268800 },
      { title: 'Stabb', spotifyId: '0pd08aDzYRBylUiIr8S6BF', durationMs: 182697 },
      { title: "I don't want an (interlude)", spotifyId: '73Lcvx8fLn3z6CTHJd2oUw', durationMs: 37611 },
      { title: 'Fryay', spotifyId: '1queyY1jPrhT0hsMR1iUmw', durationMs: 74545 },
      { title: 'Pelican', spotifyId: '4FDdh4aXvufVoLQe5xPEt5', durationMs: 120960 },
      { title: 'Steve', spotifyId: '6K6r6nI8qJ3CZY5VCzGuc5', durationMs: 132923 },
      { title: 'Gliding Through Nothing', spotifyId: '05anH1w7uMWCxsRhDesCb4', durationMs: 480000 },
      { title: 'Basketball', spotifyId: '0xiGqQaziLK7xOeyKiCBuU', durationMs: 164776, explicit: true },
      { title: 'Killcare', spotifyId: '22C0lPpfn7HHeHXTW0KDqK', durationMs: 148155 },
      { title: 'brb', spotifyId: '5Vyd1XTXZVXfLM3mWdU1no', durationMs: 179076 },
    ],
  },
  {
    title: 'Whale Tapes',
    year: 2024,
    spotifyId: '0bdW9mmoP1w34Gd8G64SdR',
    cover: '/music/albums/whale-tapes.webp',
    tracks: [
      { title: 'Alone', spotifyId: '1c5VPKd0D7DGYXiIDQpT2k', durationMs: 152640 },
      { title: 'Asda', spotifyId: '0QI25jnNrH9Z9at7wlT0cQ', durationMs: 103384 },
      { title: 'Bleeps', spotifyId: '6quCo15ub0Br8acs3am28j', durationMs: 83478 },
      { title: 'I am not ok', spotifyId: '4inqPDHkqxneYPTbQc5w80', durationMs: 72366 },
      { title: 'Weard (interlude)', spotifyId: '0AtqwHhj8IfJMLrrWPrm1u', durationMs: 56629 },
      { title: 'Morning', spotifyId: '5MhDVyT1zZmYVgacQrswu3', durationMs: 116000 },
      { title: 'Alive', spotifyId: '4VIdP4WrvC5k0IJYTsdSxI', durationMs: 184000 },
      { title: 'Ooh Ahh', spotifyId: '78GnEJHJMgqRaFKPTyg5Cr', durationMs: 150447 },
      { title: 'Wild and Young', spotifyId: '63pHh7puNhkNb4tcdIyeDb', durationMs: 77000 },
      { title: 'Dorm', spotifyId: '06nFP9fl3YFjeO4YmLwytK', durationMs: 94426 },
      { title: '5tet', spotifyId: '7DMOyCMKb7Bn0xAFjmsTKX', durationMs: 292411 },
      { title: 'Sines', spotifyId: '0NdrxcrbknyLxkyLPObBBV', durationMs: 160000 },
      { title: 'Blap (interlude)', spotifyId: '1QgdUIvLKMVLgg2eD2w7p6', durationMs: 77000 },
      { title: 'pmoot', spotifyId: '1bZjbCMjILE2FrkOsX3dmK', durationMs: 161311 },
      { title: 'Glai', spotifyId: '7t1ibvLugPBkDKbCTIFJZO', durationMs: 117230 },
      { title: 'Swell', spotifyId: '2ZSQRbvtAX3hLEXo5VCaeU', durationMs: 156190 },
      { title: 'Lol', spotifyId: '5syHtoTGP7CL7fiCGLOxp8', durationMs: 183249 },
    ],
  },
  {
    title: 'Toronto Tapes',
    year: 2021,
    spotifyId: '6h68MJUXnUtfCb4j6ZEI1B',
    cover: '/music/albums/toronto-tapes.webp',
    tracks: [
      { title: 'TTC', spotifyId: '3PVcvEo35hvufLClH8pcAI', durationMs: 124000 },
      { title: 'wuualt', spotifyId: '5GCRKa9WOPQC0180edkVrC', durationMs: 163636 },
      { title: "everyone's crazy", spotifyId: '35NdXozM1lvf9Alz6RvBA4', durationMs: 252972 },
      { title: 'your mind', spotifyId: '4OysIgbavrNecXuZdVzvng', durationMs: 192000 },
      { title: 'spread', spotifyId: '7ueXxfd5VnTcP7iT92DbdT', durationMs: 115714 },
      { title: 'hopty', spotifyId: '2gxdf16UNtfc2g5xuo3hl4', durationMs: 90000 },
      { title: 'funky friday', spotifyId: '6pvWPf7urnATjBLtqXNI73', durationMs: 86414 },
      { title: 'evolve', spotifyId: '0VQp6iywJDFUIZMO2LqE9a', durationMs: 232257 },
      { title: 'around', spotifyId: '5DKoIB6D1XQ57spLItYFRu', durationMs: 126000 },
      { title: 'dance with me', spotifyId: '631Bm4YC7GiR9cVeXDoa4n', durationMs: 106000 },
      { title: 'estelample', spotifyId: '1mvawhthZbgGFaaaM7sOAY', durationMs: 75000 },
      { title: 'foreign', spotifyId: '1iLDF9jCcCIpxg8UWmoBr8', durationMs: 158888 },
    ],
  },
]
