import { Link, useNavigate } from 'react-router-dom'
import '../styles/NavBar.css'

export function NavBar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/">Inicio</Link>
      </div>

      <div className="navbar__right">
        {isLoggedIn ? (
          <button className='btn-logout' onClick={handleLogout}>Cerrar sesión</button>
        ) : (
          <Link to="/login">Ingresar</Link>
        )}
      </div>
    </nav>
  )
}
