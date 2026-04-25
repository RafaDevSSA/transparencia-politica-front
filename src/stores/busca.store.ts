import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import type { BuscaResponse, ResultadoBusca } from '@/types/busca.types'

export const useBuscaStore = defineStore('busca', () => {
  const resultados = ref<ResultadoBusca[]>([])
  const loading = ref(false)
  const total = ref(0)
  const query = ref('')
  const tiposFiltro = ref<string[]>([])

  async function buscar(q: string) {
    if (!q || q.length < 2) return
    loading.value = true
    query.value = q
    try {
      const params: Record<string, any> = { q, limite: 30 }
      if (tiposFiltro.value.length > 0) {
        params['tipo[]'] = tiposFiltro.value
      }
      const { data } = await api.get<BuscaResponse>('/busca', { params })
      resultados.value = data.resultados
      total.value = data.total
    } finally {
      loading.value = false
    }
  }

  function limpar() {
    resultados.value = []
    total.value = 0
    query.value = ''
  }

  return { resultados, loading, total, query, tiposFiltro, buscar, limpar }
})
