import { Link } from 'react-router-dom'

const wikiPages = [
  { slug: 'houdini', title: 'Houdini', description: 'HScript, Python, HDAs, LOPS, and more' },
  { slug: 'usd', title: 'USD', description: 'Pixar Universal Scene Description' },
  { slug: 'blender', title: 'Blender', description: 'C++ development snippets' },
  { slug: 'cmake', title: 'CMake', description: 'Build system reference' },
  { slug: 'omniverse', title: 'Omniverse', description: 'NVIDIA Omniverse notes' },
  { slug: 'ue4', title: 'Unreal Engine', description: 'UE4/UE5 tips' },
]

export default function WikiIndex() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Wiki</h1>
      <p className="text-gray-600 mb-8">
        A collection of helpful information for CG/software topics.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {wikiPages.map((page) => (
          <Link
            key={page.slug}
            to={`/wiki/${page.slug}`}
            className="block p-4 border rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <h2 className="font-semibold text-lg">{page.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
