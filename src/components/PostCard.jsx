import deleteIcon from '../assets/icons/trash.svg'
import editIcon from '../assets/icons/edit.svg'
import '../styles/PostCard.css'
import { Link } from 'react-router-dom'
export function PostCard({ title, content, image, onDelete, onEdit, canManage, id }) {

  return (
    <article className="post-card">
      <div className="post-card__image-wrapper">
        <Link to={`/post/${id}`}>
          <img src={image} alt={title} />
        </Link>

        {canManage && (
          <div className="actions">
            <button className="action-btn action-btn--edit" onClick={onEdit} aria-label="Editar post">
              <img src={editIcon} alt="" />
            </button>

            <button className="action-btn action-btn--delete" onClick={onDelete} aria-label="Eliminar post">
              <img src={deleteIcon} />
            </button>
          </div>
        )}
      </div>
      <Link to={`/post/${id}`}>
        <h2>{title}</h2>
      </Link>

      <p>{content}</p>

    </article>
  )
}