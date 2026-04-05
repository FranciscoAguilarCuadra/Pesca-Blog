import { PostCard } from '../components/PostCard'
import { NavBar } from '../components/NavBar'
import { useEffect, useState } from 'react'
import { Modal } from '../components/Modal'
import { getPosts } from '../services/posts'
import { createPost, updatePost } from '../services/posts'
import { deletePost } from '../services/posts'
import { ConfirmModal } from '../components/ConfirmModal'
import { Toast } from '../components/Toast'
import '../styles/Home.css'


export function Home() {
  // const [posts, setPosts] = useState(initialPosts)
  const [posts, setPosts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success',
  })

  const token = localStorage.getItem('token')
  const isAuthenticated = !!token
  const isAdmin = isAuthenticated

  const handleCloseConfirmModal = () => {
    setIsConfirmOpen(false)
    setPostToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!postToDelete) return

    try {
      await deletePost(postToDelete.id)

      setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id))
      setIsConfirmOpen(false)
      setPostToDelete(null)

      showToast('Post eliminado correctamente')
    } catch (error) {
      console.error(error)
      showToast(error.message || 'Error al eliminar el post', 'error')
    }
  }

  const handleOpenDeleteModal = (post) => {
    setPostToDelete(post)
    setIsConfirmOpen(true)
  }

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


  const handleSavePost = async (postData) => {
    try {
      if (selectedPost) {
        const updated = await updatePost(selectedPost.id, postData)

        setPosts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        )

        showToast('Post actualizado correctamente')
      } else {
        const created = await createPost(postData)

        setPosts((prev) => [created, ...prev])

        showToast('Post creado correctamente')
      }

      setIsModalOpen(false)
      setSelectedPost(null)
    } catch (error) {
      console.error(error)
      showToast(error.message || 'Ocurrió un error al guardar el post', 'error')
    }
  }


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [])


  const showToast = (message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type,
    })

    setTimeout(() => {
      setToast({
        isVisible: false,
        message: '',
        type: 'success',
      })
    }, 2500)
  }

  return (
    <>
      <NavBar />

      <main className='container'>
        <div className="hero">
          <h1>Blog de Pesca</h1>
          <p>Bienvenido a mi bitácora personal de pesca.</p>
          <div className="hero-divider" />
        </div>

        {/* Botón solo visible para el admin */}
        {isAdmin && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>

            {
              isAuthenticated && (
                <button className="btn-primary" onClick={handleOpenCreateModal}>
                  + Nuevo post
                </button>
              )
            }
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
                id={p.id}
                title={p.title}
                content={p.content}
                image={p.image_url}
                onDelete={() => handleOpenDeleteModal(p)}
                onEdit={() => handleOpenEditModal(p)}
                canManage={isAuthenticated}
              />
            ))}
          </section>
        )}
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmDelete}
          title="Eliminar post"
          message="¿Seguro que deseas eliminar este post? Esta acción no se puede deshacer."
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
        onSave={handleSavePost}
      />
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            isVisible: false,
            message: '',
            type: 'success',
          })
        }
      />
    </>
  )
}
