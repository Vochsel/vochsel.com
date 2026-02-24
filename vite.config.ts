import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ })
  ],
  assetsInclude: ['**/*.md'],
})
