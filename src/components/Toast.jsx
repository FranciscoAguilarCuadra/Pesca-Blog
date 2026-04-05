import '../styles/Toast.css'
import close from '../assets/icons/close.svg'

export function Toast({ message, type = 'success', isVisible, onClose }) {
  if (!isVisible) return null

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose} aria-label="Cerrar notificación">
        <img src={close} alt="" />
      </button>
    </div>
  )
}