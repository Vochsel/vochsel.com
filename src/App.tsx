import { lazy, Suspense } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
const Home = lazy(() => import('./pages/Home'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const WikiIndex = lazy(() => import('./pages/WikiIndex'))
const WikiArticle = lazy(() => import('./pages/WikiArticle'))
const NewBlog = lazy(() => import('./pages/NewBlog'))
const ClaudeBlog = lazy(() => import('./pages/ClaudeBlog'))
const ClaudeBlogPost = lazy(() => import('./pages/ClaudeBlogPost'))
const Recs = lazy(() => import('./pages/Recs'))
const ThreeDPrinting = lazy(() => import('./pages/ThreeDPrinting'))
const Art = lazy(() => import('./pages/Art'))
const Music = lazy(() => import('./pages/Music'))
const Objects = lazy(() => import('./pages/Objects'))
const Clothing = lazy(() => import('./pages/Clothing'))
const Admin = lazy(() => import('./pages/Admin'))
const HomeMockups = lazy(() => import('./pages/HomeMockups'))

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-gray-950" />}>
      <Routes>
        <Route path="/mockups/:concept" element={<HomeMockups />} />
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="art" element={<Art />} />
          <Route path="music" element={<Music />} />
          <Route path="objects" element={<Objects />} />
          <Route path="clothing" element={<Clothing />} />
          <Route path="blog" element={<Home />} />
          <Route path="blog/3d-printing" element={<ThreeDPrinting />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="wiki" element={<WikiIndex />} />
          <Route path="wiki/:slug" element={<WikiArticle />} />
          <Route path="new-blog" element={<NewBlog />} />
          <Route path="claudes-blog" element={<ClaudeBlog />} />
          <Route path="claudes-blog/:slug" element={<ClaudeBlogPost />} />
          <Route path="recs" element={<Recs />} />
          <Route path="admin" element={<Admin />} />
          <Route path="3d-printing" element={<Navigate to="/blog/3d-printing" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
