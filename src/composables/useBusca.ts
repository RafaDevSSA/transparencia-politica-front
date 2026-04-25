import { ref } from 'vue'
import api from '@/services/api'
import type { BuscaResponse, ResultadoBusca } from '@/types/busca.types'

export function useBusca() {
  const resultados = ref<ResultadoBusca[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)
  const query = ref('')

  async function buscar(q: string, params: Record<string, any> = {}) {
    if (!q || q.length < 2) return
    loading.value = true
    error.value = null
    query.value = q
    try {
      const { data } = await api.get<BuscaResponse>('/busca', { params: { q, ...params } })
      resultados.value = data.resultados
      total.value = data.total
    } catch (e: any) {
      error.value = 'Erro na busca'
      resultados.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  function limpar() {
    resultados.value = []
    total.value = 0
    query.value = ''
    error.value = null
  }

  return { resultados, loading, error, total, query, buscar, limpar }
}
