import { apiFetch } from './apiHelper'

const API_URL = `${import.meta.env.VITE_API_URL}/auth`

export async function loginUser(credentials) {
  return apiFetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
}