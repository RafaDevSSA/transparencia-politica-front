import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import type { Politico, PoliticoListResponse, FiltroPolitico } from '@/types/politico.types'

export const usePoliticoStore = defineStore('politico', () => {
  const politicos = ref<Politico[]>([])
  const loading = ref(false)
  const total = ref(0)
  const totalPaginas = ref(1)
  const filtros = ref<FiltroPolitico>({
    nome: '',
    cargo: '',
    partido: '',
    estado: '',
    pagina: 1,
    limite: 20,
  })

  async function buscar() {
    loading.value = true
    try {
      const params = Object.fromEntries(
        Object.entries(filtros.value).filter(([, v]) => v !== '' && v !== null),
      )
      const { data } = await api.get<PoliticoListResponse>('/politicos', { params })
      politicos.value = data.dados
      total.value = data.total
      totalPaginas.value = data.total_paginas
    } finally {
      loading.value = false
    }
  }

  function resetFiltros() {
    filtros.value = { nome: '', cargo: '', partido: '', estado: '', pagina: 1, limite: 20 }
  }

  return { politicos, loading, total, totalPaginas, filtros, buscar, resetFiltros }
})
