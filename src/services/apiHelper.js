export async function apiFetch(url, options = {}) {
  const response = await fetch(url, options)
  const data = await response.json()

  if (response.status === 401 && localStorage.getItem('token')) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    return
  }

  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud')
  }

  return data
}