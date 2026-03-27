
export function PostCard({ title, content, image, onDelete }) {
  
  return (
    <article>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{content}</p>

      <button onClick={onDelete}>Eliminar</button>
    </article>
  )
}

