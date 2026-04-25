import { ref } from 'vue'
import api from '@/services/api'
import type { Noticia, NoticiaListResponse } from '@/types/noticia.types'

export function useNoticia() {
  const noticias = ref<Noticia[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)
  const totalPaginas = ref(1)

  async function buscar(filtros: Record<string, any> = {}) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get<NoticiaListResponse>('/noticias', { params: filtros })
      noticias.value = data.dados
      total.value = data.total
      totalPaginas.value = data.total_paginas
    } catch (e: any) {
      error.value = 'Erro ao buscar notícias'
    } finally {
      loading.value = false
    }
  }

  return { noticias, loading, error, total, totalPaginas, buscar }
}
