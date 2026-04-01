import { useEffect, useState } from 'react'

export function Modal({ isOpen, onClose, post, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  const isEditing = Boolean(post)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setImage(post.image)
    } else {
      setTitle('')
      setContent('')
      setImage('')
    }
    setError('')
  }, [post, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación con feedback visible
    if (!title.trim() || !content.trim() || !image.trim()) {
      setError('Todos los campos son obligatorios.')
      return
    }

    const postData = {
      title: title.trim(),
      content: content.trim(),
      image: image.trim(),
    }

    if (isEditing) {
      onSave({ ...post, ...postData })
    } else {
      onSave(postData)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? 'Editar post' : 'Nuevo post'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="modal-input"
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError('') }}
          />

          <textarea
            className="modal-input"
            placeholder="Contenido"
            value={content}
            onChange={(e) => { setContent(e.target.value); setError('') }}
            rows={4}
          />

          <input
            className="modal-input"
            type="text"
            placeholder="URL de imagen"
            value={image}
            onChange={(e) => { setImage(e.target.value); setError('') }}
          />

          {/* Mensaje de error visible */}
          {error && (
            <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button className="btn-save" type="submit">
              {isEditing ? 'Guardar cambios' : 'Crear post'}
            </button>
            <button className="btn-cancel" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
