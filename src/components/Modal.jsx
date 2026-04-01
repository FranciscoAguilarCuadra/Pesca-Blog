import { useEffect, useState } from 'react'

export function Modal({ isOpen, onClose, post, onSave }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')

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
  }, [post, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !content || !image) return

    if (isEditing) {
      onSave({
        ...post,
        title,
        content,
        image
      })
    } else {
      onSave({
        title,
        content,
        image
      })
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? 'Editar post' : 'Nuevo post'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            className='modal-input'
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className='modal-input'
            type="text"
            placeholder="Contenido"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            className='modal-input'
            type="text"
            placeholder="URL de imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className="modal-actions">
            <button className='btn-save' type="submit">
              {isEditing ? 'Guardar cambios' :  'Crear post'}
            </button>

            <button className='btn-cancel' type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}