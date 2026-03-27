import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import PostDetail from './pages/PostDetail'
import Admin from './pages/Admin'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App
