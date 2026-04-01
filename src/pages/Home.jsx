import { PostCard } from '../components/PostCard'
import NavBar from '../components/NavBar'
import { useState } from 'react'
import { post as initialPosts } from '../data/post'
import { Modal } from '../components/Modal'

export function Home() {
  const [posts, setPosts] = useState(initialPosts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const handleOpenCreateModal = () => {
    setSelectedPost(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleSavePost = (postData) => {
    if (selectedPost) {
      const updatedPosts = posts.map((p) =>
        p.id === selectedPost.id
          ? { ...p, ...postData }
          : p
      )

      setPosts(updatedPosts)
    } else {
      const newPost = {
        id: Date.now(),
        ...postData
      }

      setPosts([newPost, ...posts])
    }

    setIsModalOpen(false)
    setSelectedPost(null)
  }

  const handleDelete = (id) => {
    const filteredPosts = posts.filter((p) => p.id !== id)
    setPosts(filteredPosts)

    if (selectedPost && selectedPost.id === id) {
      setIsModalOpen(false)
      setSelectedPost(null)
    }
  }

  return (
    <>
      <NavBar />

      <main>
        <h1>Blog de Pesca</h1>
        <p>Bienvenido a mi bitácora personal de pesca.</p>
<div>
  
        <span>
          Agregar nuevo post 
        </span>
        
        <button onClick={handleOpenCreateModal}>+</button>
</div>

        <section>
          {posts.map((p) => (
            <PostCard
              key={p.id}
              title={p.title}
              content={p.content}
              image={p.image}
              onDelete={() => handleDelete(p.id)}
              onEdit={() => handleOpenEditModal(p)}
            />
          ))}
        </section>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedPost(null)
        }}
        post={selectedPost}
        onSave={handleSavePost}
      />
    </>
  )
}