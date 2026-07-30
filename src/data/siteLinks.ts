export interface CurrentProject {
  name: string
  href: string
  type: string
  description: string
}

export interface PastProject {
  name: string
  href: string
  description: string
  favicon?: string
  github?: string
}

export const currentProjects: CurrentProject[] = [
  {
    name: '/art',
    href: '/art',
    type: 'Visual',
    description: 'Experiments in form, light, and procedural worlds.',
  },
  {
    name: '/music',
    href: '/music',
    type: 'Sound',
    description: 'Electronic sketches, loops, and unfinished feelings.',
  },
  {
    name: '/blog',
    href: '/blog',
    type: 'Writing',
    description: 'Notes on tools, making, and the 3D printing log.',
  },
  {
    name: '/objects',
    href: '/objects',
    type: 'Objects',
    description: 'Upcoming interior objects and quieter smart-home interfaces.',
  },
  {
    name: '/clothing',
    href: '/clothing',
    type: 'Clothing',
    description: 'Small runs and questionable AI jokes from Unprompted.',
  },
]

export const pastProjects: PastProject[] = [
  {
    name: 'dump',
    href: 'https://dump.page',
    favicon: 'https://dump.page/favicon.ico',
    description: 'Shared context for humans and AI',
  },
  {
    name: 'Hoo',
    href: 'https://get-hoo.com',
    favicon: 'https://www.get-hoo.com/favicon.svg',
    description: 'Spatial agent and web orchestrator',
  },
  {
    name: 'walkie-talkie',
    href: 'https://walkie-talkie.dev',
    favicon: 'https://walkie-talkie.dev/icon.svg',
    description: 'Access your local terminal from your web browser',
  },
  {
    name: 'rs-procgeo',
    href: 'https://procgeo.vochsel.com',
    github: 'https://github.com/Vochsel/rs-procgeo',
    description: 'Rust-based procedural geometry, texturing, and scene library',
  },
  {
    name: 'kanban-cli',
    href: 'https://kanban-cli.vochsel.com',
    favicon: 'https://kanban-cli.vochsel.com/favicon.svg',
    github: 'https://github.com/Vochsel/kanban-cli',
    description: 'One-line UI for markdown kanban files',
  },
  {
    name: 'magpai',
    href: 'https://magpai.app',
    favicon: 'https://magpai.app/favicon.ico',
    description: "Your business's AI operating system",
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Vochsel',
    favicon: 'https://github.githubassets.com/favicons/favicon.svg',
    description: 'Code, experiments, and unfinished things',
  },
  {
    name: 'RSS',
    href: '/feed.xml',
    favicon: '/favicon.svg',
    description: 'The blog feed',
  },
]

export const archiveLinks = [
  { name: 'wiki', href: '/wiki' },
  { name: 'portfolio', href: 'https://benjaminskinner.com.au' },
  { name: 'shaders', href: 'https://www.shadertoy.com/user/vochsel' },
]
