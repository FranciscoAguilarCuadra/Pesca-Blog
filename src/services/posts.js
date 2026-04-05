import { apiFetch } from './apiHelper'

const API_URL = `${import.meta.env.VITE_API_URL}/posts`

export async function getPosts() {
  return apiFetch(API_URL)
}

export async function createPost(postData) {
  const token = localStorage.getItem('token')

  return apiFetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  })
}

export async function updatePost(id, postData) {
  const token = localStorage.getItem('token')

  return apiFetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(postData)
  })
}

export async function deletePost(id) {
  const token = localStorage.getItem('token')

  return apiFetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export async function getPostById(id) {
  return apiFetch(`${API_URL}/${id}`)
}