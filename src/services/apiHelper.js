/**
 * Helper para hacer llamadas API que maneja errores de autenticación
 * Si recibe 401 (token expirado), limpia el token y redirige a login
 */
export async function apiFetch(url, options = {}) {
    const response = await fetch(url, options)
    const data = await response.json()

    // Si es 401 (Unauthorized), el token expiró
    if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
        return
    }

    if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud')
    }

    return data
}
