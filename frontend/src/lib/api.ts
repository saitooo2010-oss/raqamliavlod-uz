import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL })

// Request interceptor — har so'rovga access token qo'shadi
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor — 401 bo'lsa token yangilaydi
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Agar 401 va hali retry qilinmagan bo'lsa
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('token/refresh')
    ) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        clearTokens()
        window.location.href = '/auth/login'
        return Promise.reject(error)
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}api/token/refresh/`,
          { refresh: refreshToken },
        )
        const newAccess = res.data.access
        localStorage.setItem('access_token', newAccess)
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return api(originalRequest)
      } catch {
        clearTokens()
        window.location.href = '/auth/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
}

export const clearTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('access_token')
}

export default api
