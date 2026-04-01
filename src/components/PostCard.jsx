
import deleteIcon from '../assets/icons/trash.svg'
import editIcon from '../assets/icons/edit.svg'

export function PostCard({ title, content, image, onDelete, onEdit, isAdmin }) {
  return (
    <article>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{content}</p>
      {isAdmin && (
        <>
          <button onClick={onDelete} aria-label="Eliminar post">
            <img src={deleteIcon} alt="Eliminar" style={{ width: '20px', height: '20px'}} />
          </button>
          <button onClick={onEdit} aria-label="Editar post">
            <img src={editIcon} alt="Editar" style={{ width: '20px', height: '20px' }} />
          </button>
        </>
      )}
    </article>
  )
}

