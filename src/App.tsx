import { lazy, Suspense } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import WikiIndex from './pages/WikiIndex'
import WikiArticle from './pages/WikiArticle'
import NewBlog from './pages/NewBlog'
import ClaudeBlog from './pages/ClaudeBlog'
import ClaudeBlogPost from './pages/ClaudeBlogPost'
import Recs from './pages/Recs'
import ThreeDPrinting from './pages/ThreeDPrinting'
import Art from './pages/Art'
import Music from './pages/Music'
import Objects from './pages/Objects'

const HomeMockups = lazy(() => import('./pages/HomeMockups'))

function App() {
  return (
    <Routes>
      <Route
        path="/mockups/:concept"
        element={(
          <Suspense fallback={<div className="min-h-screen bg-[#f5f5f3]" />}>
            <HomeMockups />
          </Suspense>
        )}
      />
      <Route path="/" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="art" element={<Art />} />
        <Route path="music" element={<Music />} />
        <Route path="objects" element={<Objects />} />
        <Route path="blog" element={<Home />} />
        <Route path="blog/3d-printing" element={<ThreeDPrinting />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="wiki" element={<WikiIndex />} />
        <Route path="wiki/:slug" element={<WikiArticle />} />
        <Route path="new-blog" element={<NewBlog />} />
        <Route path="claudes-blog" element={<ClaudeBlog />} />
        <Route path="claudes-blog/:slug" element={<ClaudeBlogPost />} />
        <Route path="recs" element={<Recs />} />
        <Route path="3d-printing" element={<Navigate to="/blog/3d-printing" replace />} />
      </Route>
    </Routes>
  )
}

export default App
