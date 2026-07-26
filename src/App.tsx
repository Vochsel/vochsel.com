import { Routes, Route } from 'react-router-dom'
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
import HomeMockups from './pages/HomeMockups'

function App() {
  return (
    <Routes>
      <Route path="/mockups/:concept" element={<HomeMockups />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="blog" element={<Home />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="wiki" element={<WikiIndex />} />
        <Route path="wiki/:slug" element={<WikiArticle />} />
        <Route path="new-blog" element={<NewBlog />} />
        <Route path="claudes-blog" element={<ClaudeBlog />} />
        <Route path="claudes-blog/:slug" element={<ClaudeBlogPost />} />
        <Route path="recs" element={<Recs />} />
        <Route path="3d-printing" element={<ThreeDPrinting />} />
      </Route>
    </Routes>
  )
}

export default App
