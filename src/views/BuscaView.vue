<template>
  <div class="max-w-7xl mx-auto px-4 py-8">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white mb-4">Busca</h1>
      <BuscaGlobal
        v-model="q"
        placeholder="Buscar político, lei, estado ou cidade..."
        @buscar="executarBusca"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">

      <!-- Filtros Sidebar -->
      <div class="lg:col-span-1">
        <FiltrosBusca
          @update:tipos="tiposFiltro = $event"
          @update:ordenacao="ordenacao = $event"
        />
      </div>

      <!-- Resultados -->
      <div class="lg:col-span-3">

        <!-- Estado de busca -->
        <div v-if="!query && !loading" class="card text-center py-12">
          <MagnifyingGlassIcon class="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p class="text-gray-400">Digite algo para começar a busca</p>
        </div>

        <LoadingSpinner v-else-if="loading" :full="true" label="Buscando..." />

        <div v-else>
          <!-- Info da busca -->
          <div v-if="query" class="flex items-center justify-between mb-4">
            <p class="text-gray-400 text-sm">
              <span class="text-white font-medium">{{ total }}</span>
              resultado{{ total !== 1 ? 's' : '' }} para
              <span class="text-primary-400 font-medium">"{{ query }}"</span>
            </p>
          </div>

          <!-- Resultados agrupados por tipo -->
          <div v-if="resultados.length" class="space-y-3">
            <ResultadoBusca
              v-for="r in resultadosFiltrados"
              :key="`${r.tipo}-${r.id}`"
              :resultado="r"
            />
          </div>

          <EmptyState
            v-else-if="query"
            title="Sem resultados"
            :description="`Nenhum resultado encontrado para '${query}'. Tente outros termos.`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import BuscaGlobal from '@/components/busca/BuscaGlobal.vue'
import FiltrosBusca from '@/components/busca/FiltrosBusca.vue'
import ResultadoBusca from '@/components/busca/ResultadoBusca.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useBusca } from '@/composables/useBusca'

const route = useRoute()
const router = useRouter()
const { resultados, loading, total, query, buscar } = useBusca()
const q = ref((route.query.q as string) || '')
const tiposFiltro = ref<string[]>([])
const ordenacao = ref('relevancia')

const resultadosFiltrados = computed(() => {
  if (!tiposFiltro.value.length) return resultados.value
  return resultados.value.filter((r) => tiposFiltro.value.includes(r.tipo))
})

async function executarBusca(termo: string) {
  if (!termo) return
  router.replace({ query: { q: termo } })
  await buscar(termo, {
    'tipo[]': tiposFiltro.value.length ? tiposFiltro.value : undefined,
    ordenar: ordenacao.value,
  })
}

onMounted(() => {
  if (q.value) executarBusca(q.value)
})

watch(() => route.query.q, (novoQ) => {
  if (novoQ && novoQ !== q.value) {
    q.value = novoQ as string
    executarBusca(q.value)
  }
})
</script>
