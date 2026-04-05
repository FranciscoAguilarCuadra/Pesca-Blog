import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/auth'
import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  try {
    const data = await loginUser({ email, password })
    console.log('Respuesta del backend:', data)  // ← agrega esto
    localStorage.setItem('token', data.token)
    navigate('/')
  } catch (error) {
    console.log('Error capturado:', error.message)  // ← y esto
    setError(error.message || 'Correo o contraseña incorrectos.')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="login-page">
      <div className="login-panel login-panel--left">
        <div className="login-panel__overlay" />
        <div className="login-panel__content">
          <span className="login-panel__icon">🎣</span>
          <h1 className="login-panel__titulo">Pesca Blog</h1>
          <p className="login-panel__subtitulo">
            Bitácora personal de capturas desde el centro sur de Chile.
          </p>
          <div className="login-panel__divider" />
          <p className="login-panel__quote">
            "El río no recuerda a quien no vuelve."
          </p>
        </div>
      </div>

      <div className="login-panel login-panel--right">
        <div className="login-form-wrap">
          <div className="login-form__header">
            <h2 className="login-form__titulo">Acceso admin</h2>
            <p className="login-form__sub">Solo tú puedes gestionar las capturas.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field">
              <label className="login-field__label" htmlFor="email">Correo</label>
              <input
                id="email"
                className={`login-field__input ${error ? 'login-field__input--error' : ''}`}
                type="email"
                placeholder="admin@pesca.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <label className="login-field__label" htmlFor="password">Contraseña</label>
              <input
                id="password"
                className={`login-field__input ${error ? 'login-field__input--error' : ''}`}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div className="login-error">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              className={`login-btn ${loading ? 'login-btn--loading' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login