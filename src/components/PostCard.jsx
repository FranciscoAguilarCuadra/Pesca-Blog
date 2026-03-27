
export function PostCard({ title, content, image, onDelete, onEdit }) {
  
  return (
    <article>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{content}</p>

      <button onClick={onDelete}>Eliminar</button>
      <button onClick={onEdit}>Editar</button>
    </article>
  )
}

