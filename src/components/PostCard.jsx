
import deleteIcon from '../assets/icons/trash.svg'
import editIcon from '../assets/icons/edit.svg'

export function PostCard({ title, content, image, onDelete, onEdit }) {
  
  return (
   <>
    <article>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{content}</p>

      <button onClick={onDelete} aria-label="Eliminar post">
        <img src={deleteIcon} alt="Eliminar" style={{ width: '20px', height: '20px' }} />
      </button>
      <button onClick={onEdit}>
        <img src={editIcon} alt="edit" style={{ width: '20px', height: '20px' }}/>
      </button>
    </article>
   </>
  )
}

