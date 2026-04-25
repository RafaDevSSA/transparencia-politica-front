import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.warn('Recurso não encontrado:', error.config?.url)
    } else if (error.response?.status >= 500) {
      console.error('Erro no servidor:', error.response?.data)
    }
    return Promise.reject(error)
  },
)

export default api
