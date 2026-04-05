import { useEffect, useState } from 'react'
import '../styles/Modal.css'

export function Modal({ isOpen, onClose, post, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image_url, setImage] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const isEditing = Boolean(post)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setImage(post.image_url)
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
    if (!title.trim() || !content.trim() || !image_url.trim()) {
      setError('Todos los campos son obligatorios.')
      return
    }

    const postData = {
      title: title.trim(),
      content: content.trim(),
      image_url: image_url.trim(),
    }

    if (isEditing) {
      onSave({ ...post, ...postData })
    } else {
      onSave(postData)

    }
  }
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      setUploading(true)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al subir imagen')
      }

      setImage(data.url) // 👈 URL de Cloudinary

    } catch (error) {
      console.error(error)
      setError('Error al subir la imagen')
    } finally {
      setUploading(false)
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
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="modal-input"
            disabled={uploading}
          />

          {image_url && (
            <img
              src={image_url}
              alt="Preview"
              style={{
                width: '100%',
                borderRadius: '8px',
                marginBottom: '10px'
              }}
            />
          )}

          <input
            type="text"
            placeholder="URL de imagen (opcional si subes archivo)"
            value={image_url}
            onChange={(e) => setImage(e.target.value)}
            className="modal-input"
          />

          {/* Mensaje de error visible */}
          {error && (
            <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button type="submit" disabled={uploading} className="btn-save">
              {uploading ? 'Subiendo imagen...' : isEditing ? 'Guardar cambios' : 'Crear post'}
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
