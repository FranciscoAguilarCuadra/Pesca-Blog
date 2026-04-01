import { PostCard } from '../components/PostCard'
import { NavBar } from '../components/NavBar'
import { useState } from 'react'
import { post as initialPosts } from '../data/post'
import { Modal } from '../components/Modal'

export function Home() {
  const [posts, setPosts] = useState(initialPosts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  // Detecta si el usuario está autenticado
  const isAdmin = localStorage.getItem('isAuth') === 'true'

  const handleOpenCreateModal = () => {
    setSelectedPost(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  const handleSavePost = (postData) => {
    if (selectedPost) {
      setPosts(posts.map((p) =>
        p.id === selectedPost.id ? { ...p, ...postData } : p
      ))
    } else {
      const newPost = { id: Date.now(), ...postData }
      setPosts([newPost, ...posts])
    }

    handleCloseModal()
  }

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id))
    if (selectedPost?.id === id) handleCloseModal()
  }

  return (
    <>
      <NavBar />

      <main>
        <div className="hero">
          <h1>Blog de Pesca</h1>
          <p>Bienvenido a mi bitácora personal de pesca.</p>
          <div className="hero-divider" />
        </div>

        {/* Botón solo visible para el admin */}
        {isAdmin && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button className="btn-primary" onClick={handleOpenCreateModal}>
              + Nuevo post
            </button>
          </div>
        )}

        {/* Estado vacío */}
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>Aún no hay capturas registradas.</p>
          </div>
        ) : (
          <section className="posts-grid">
            {posts.map((p) => (
              <PostCard
                key={p.id}
                title={p.title}
                content={p.content}
                image={p.image}
                isAdmin={isAdmin}            
                onDelete={() => handleDelete(p.id)}
                onEdit={() => handleOpenEditModal(p)}
              />
            ))}
          </section>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
        onSave={handleSavePost}
      />
    </>
  )
}
