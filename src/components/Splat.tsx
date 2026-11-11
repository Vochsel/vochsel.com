import { useEffect, useRef, useState, type ReactNode } from 'react'

// Gaussian splat embed for blog posts. Expects <src>.spz next to <src>.json, where the json
// says how to stand the splat up: viewer = R (x - center), scaled so the person is ~1.7 m tall.
// three + spark load lazily, and the splat only loads once it scrolls near the viewport.

type SplatMeta = { center: [number, number, number]; rotation: number[][]; height: number; splats: number }
type Mounted = { splats: number; frame: (face: boolean) => void; dispose: () => void }

export function Splat({
  src,
  label,
  caption,
  aspect = '4 / 5',
}: {
  src: string
  label?: string
  caption?: ReactNode
  aspect?: string
}) {
  const stage = useRef<HTMLDivElement>(null)
  const api = useRef<Mounted | null>(null)
  const [status, setStatus] = useState('scroll to load')
  const [ready, setReady] = useState(false)
  const [face, setFace] = useState(false)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    let alive = true
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      setStatus('loading…')
      mount(el, src, () => alive)
        .then((m) => {
          if (!alive) return m.dispose()
          api.current = m
          setReady(true)
          setStatus(`${m.splats.toLocaleString()} splats · drag to orbit`)
        })
        .catch((err) => {
          console.error(err)
          if (alive) setStatus("couldn't load splat")
        })
    }, { rootMargin: '300px' })
    io.observe(el)
    return () => {
      alive = false
      io.disconnect()
      api.current?.dispose()
      api.current = null
    }
  }, [src])

  const toggleFace = () => {
    api.current?.frame(!face)
    setFace(!face)
  }

  return (
    <figure className="not-prose my-8">
      <div
        ref={stage}
        className="relative w-full touch-pan-y overflow-hidden rounded-sm bg-gray-950 [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:cursor-grab"
        style={{ aspectRatio: aspect, background: 'radial-gradient(ellipse at 50% 40%, #2a2a2e, #0b0b0d 70%)' }}
      >
        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-center justify-between font-mono text-xs text-gray-300">
          <span>{label}</span>
          <button
            type="button"
            onClick={toggleFace}
            disabled={!ready}
            className="pointer-events-auto rounded-full border border-white/25 bg-white/10 px-3 py-0.5 transition-colors hover:bg-white/20 disabled:opacity-30"
          >
            {face ? 'body' : 'face'}
          </button>
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 z-10 font-mono text-[11px] text-gray-400">{status}</div>
      </div>
      {caption && <figcaption className="mt-2 text-sm text-gray-500">{caption}</figcaption>}
    </figure>
  )
}

export function Video({ src, caption }: { src: string; caption?: ReactNode }) {
  return (
    <figure className="not-prose my-8">
      <video
        className="site-media w-full"
        src={src}
        poster={src.replace(/\.mp4$/, '.jpg')}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      {caption && <figcaption className="mt-2 text-sm text-gray-500">{caption}</figcaption>}
    </figure>
  )
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: ReactNode }) {
  return (
    <figure className="not-prose my-8">
      <img className="site-media w-full" src={src} alt={alt} loading="lazy" />
      {caption && <figcaption className="mt-2 text-sm text-gray-500">{caption}</figcaption>}
    </figure>
  )
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 grid gap-4 sm:grid-cols-2 [&>figure]:my-0">{children}</div>
}

async function mount(el: HTMLDivElement, src: string, alive: () => boolean): Promise<Mounted> {
  const [THREE, { OrbitControls }, { SparkRenderer, SplatMesh }] = await Promise.all([
    import('three'),
    import('three/examples/jsm/controls/OrbitControls.js'),
    import('@sparkjsdev/spark'),
  ])
  const meta: SplatMeta = await (await fetch(`${src}.json`)).json()

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  el.prepend(renderer.domElement)

  const scene = new THREE.Scene()
  // radial sort is the most stable under rotation (Spark's default, set explicitly)
  scene.add(new SparkRenderer({ renderer, sortRadial: true }))
  const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.rotateSpeed = 0.6
  controls.autoRotate = true
  controls.autoRotateSpeed = 1.5
  controls.enableZoom = false // leave the scroll wheel to the page
  controls.addEventListener('start', () => { controls.autoRotate = false })

  const R = meta.rotation
  const holder = new THREE.Group()
  holder.quaternion.setFromRotationMatrix(new THREE.Matrix4().set(
    R[0][0], R[0][1], R[0][2], 0,
    R[1][0], R[1][1], R[1][2], 0,
    R[2][0], R[2][1], R[2][2], 0,
    0, 0, 0, 1,
  ))
  holder.scale.setScalar(1.7 / meta.height)
  const mesh = new SplatMesh({ url: `${src}.spz` })
  mesh.position.set(...meta.center).negate()
  holder.add(mesh)
  scene.add(holder)
  await mesh.initialized

  // once the person is 1.7 tall and centred, the face sits near y = 0.73
  const frame = (face: boolean) => {
    const y = face ? 0.73 : 0
    const dir = camera.position.clone().sub(controls.target).setY(0).normalize()
    controls.target.set(0, y, 0)
    camera.position.copy(dir.multiplyScalar(face ? 0.9 : 4.2)).setY(y + 0.05)
    controls.update()
  }
  camera.position.set(0, 0.1, 4.2)
  frame(false)

  // Spark sorts splats back-to-front in a worker, a few frames behind the camera. Spin faster
  // than that and you draw with a stale order (popping, see-through patches). So cap how far
  // the view direction can turn per second; damping carries the rest of a flick over later frames.
  const MAX_TURN = 1.6 // rad/s, ~90°/s
  const lastDir = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const turn = new THREE.Quaternion()
  const noTurn = new THREE.Quaternion()
  const resetTurn = () => lastDir.copy(camera.position).sub(controls.target).normalize()
  resetTurn()
  let lastT = performance.now()
  const limitTurn = () => {
    const now = performance.now()
    const dt = Math.min((now - lastT) / 1000, 0.1)
    lastT = now
    const offset = camera.position.clone().sub(controls.target)
    dir.copy(offset).normalize()
    const angle = lastDir.angleTo(dir)
    const max = MAX_TURN * dt
    if (angle > max) {
      turn.setFromUnitVectors(lastDir, dir)
      noTurn.identity().slerp(turn, max / angle)
      dir.copy(lastDir).applyQuaternion(noTurn)
      camera.position.copy(controls.target).addScaledVector(dir, offset.length())
      camera.lookAt(controls.target)
    }
    lastDir.copy(dir)
  }
  const setFrame = frame
  const frameAndReset = (face: boolean) => { setFrame(face); resetTurn() }

  const resize = () => {
    const { width, height } = el.getBoundingClientRect()
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()

  let visible = true
  const vis = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
  vis.observe(el)
  renderer.setAnimationLoop(() => {
    if (!visible || !alive()) { lastT = performance.now(); return }
    controls.update()
    limitTurn()
    renderer.render(scene, camera)
  })

  return {
    splats: meta.splats,
    frame: frameAndReset,
    dispose() {
      renderer.setAnimationLoop(null)
      ro.disconnect()
      vis.disconnect()
      controls.dispose()
      mesh.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
