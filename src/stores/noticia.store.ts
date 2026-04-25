import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import type { Noticia, NoticiaListResponse } from '@/types/noticia.types'

export const useNoticiaStore = defineStore('noticia', () => {
  const noticias = ref<Noticia[]>([])
  const loading = ref(false)
  const total = ref(0)
  const totalPaginas = ref(1)
  const filtros = ref({ fonte: '', pagina: 1, limite: 20 })

  async function buscar() {
    loading.value = true
    try {
      const params = Object.fromEntries(
        Object.entries(filtros.value).filter(([, v]) => v !== '' && v !== null),
      )
      const { data } = await api.get<NoticiaListResponse>('/noticias', { params })
      noticias.value = data.dados
      total.value = data.total
      totalPaginas.value = data.total_paginas
    } finally {
      loading.value = false
    }
  }

  function proximaPagina() {
    if (filtros.value.pagina < totalPaginas.value) {
      filtros.value.pagina++
      buscar()
    }
  }

  function paginaAnterior() {
    if (filtros.value.pagina > 1) {
      filtros.value.pagina--
      buscar()
    }
  }

  return { noticias, loading, total, totalPaginas, filtros, buscar, proximaPagina, paginaAnterior }
})
