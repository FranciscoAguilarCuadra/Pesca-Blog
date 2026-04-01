import { Link } from 'react-router-dom'

export function NavBar() {
  return (
    <nav className="navBar">
      <Link to="/">Inicio</Link>
      <Link to="/login">Login</Link>
      <Link to="/quienes-somos">Quiénes Somos</Link>
    </nav>
  )
}