import { ref } from 'vue'
import api from '@/services/api'
import type { Politico, PoliticoListResponse, FiltroPolitico } from '@/types/politico.types'

export function usePolitico() {
  const politicos = ref<Politico[]>([])
  const politico = ref<Politico | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)
  const totalPaginas = ref(1)

  async function buscar(filtros: Partial<FiltroPolitico> = {}) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get<PoliticoListResponse>('/politicos', { params: filtros })
      politicos.value = data.dados
      total.value = data.total
      totalPaginas.value = data.total_paginas
    } catch (e: any) {
      error.value = 'Erro ao buscar políticos'
    } finally {
      loading.value = false
    }
  }

  async function buscarPorId(id: number) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get<Politico>(`/politicos/${id}`)
      politico.value = data
    } catch (e: any) {
      error.value = 'Político não encontrado'
      politico.value = null
    } finally {
      loading.value = false
    }
  }

  return { politicos, politico, loading, error, total, totalPaginas, buscar, buscarPorId }
}
