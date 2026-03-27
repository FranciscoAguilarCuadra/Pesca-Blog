import { PostCard }from '../components/PostCard'
import NavBar from '../components/NavBar'
import { useState } from 'react'
import { post as initialPosts } from '../data/post'

function Home() {
    const [posts, setPosts] = useState(initialPosts)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')

    // Agregar Post
    const handleSubmit = (e) => {
        e.preventDefault()

        const newPost = {
            id: Date.now(),
            title,
            content,
            image
        }

        setPosts([newPost, ...posts])

        setTitle('')
        setContent('')
        setImage('')
    }

    // Eliminar Post
    const handleDelete = (id) => {
        const filteredPost = posts.filter((p) => p.id !== id)
        setPosts(filteredPost)
    }

    return <>

        <NavBar>
        </NavBar>

        <main>
            <h1>Blog de Pesca</h1>
            <p>Bienvenido a mi bitácora personal de pesca.</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Contenido"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="URL de imagen"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <button type="submit">Agregar post</button>
            </form>


            <section>
                {posts.map((p) => (
                    <PostCard
                        key={p.id}
                        title={p.title}
                        content={p.content}
                        image={p.image}
                        onDelete={() => handleDelete(p.id)}
                    />
                ))
                
                }
            </section>
        </main>
    </>




}

export default Home