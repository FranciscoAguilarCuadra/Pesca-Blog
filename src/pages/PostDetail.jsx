import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPostById } from '../services/posts'
import { NavBar } from '../components/NavBar'
import '../styles/PostDetail.css'

export function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id)
        setPost(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPost()
  }, [id])

  if (!post) return <p>Cargando...</p>

  return (
    <>
      <NavBar />

      <main className="post-detail">
        <article className="post-detail__container">
          <h1 className="post-detail__title">{post.title}</h1>

          <p className="post-detail__date">
            {new Date(post.created_at).toLocaleDateString()}
          </p>

          <img
            src={post.image_url}
            alt={post.title}
            className="post-detail__image"
          />

          <p className="post-detail__content">{post.content}</p>

          <button className="post-detail__back" onClick={() => navigate(-1)}>
            ← Volver
          </button>
        </article>
      </main>
    </>
  )
}