import { Home } from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import {PostDetail} from './pages/PostDetail'
import Admin from './pages/Admin'
import  Login  from './pages/Login'
import PrivateRoute from './components/PrivateRoutes'
// import { SobreMi } from './pages/SobreMi'

function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/sobre-mi" element={<SobreMi />} /> */}

      </Routes>
    </>
  )
}

export default App
