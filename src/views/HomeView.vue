<template>
  <div class="max-w-7xl mx-auto px-4 py-8">

    <!-- Header / Hero -->
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">
        🏛️ Transparência Política
      </h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
        Informações políticas brasileiras em tempo real. Busque políticos, leis, estados e notícias.
      </p>

      <!-- Busca Principal -->
      <div class="max-w-2xl mx-auto">
        <BuscaGlobal
          v-model="termoBusca"
          placeholder="Buscar político, lei, estado ou cidade..."
          :mostrar-dicas="true"
          @buscar="irParaBusca"
        />
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div v-for="stat in estatisticas" :key="stat.label" class="card text-center">
        <p class="text-2xl font-bold text-primary-400">{{ stat.valor }}</p>
        <p class="text-gray-400 text-sm mt-1">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Feed de Notícias -->
      <div class="lg:col-span-2">
        <NoticiaFeed />
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <!-- Políticos em Destaque -->
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-white font-semibold">Políticos</h2>
            <RouterLink to="/busca" class="text-primary-400 text-sm hover:underline">
              Ver todos →
            </RouterLink>
          </div>

          <LoadingSpinner v-if="loadingPoliticos" size="sm" />

          <div v-else-if="politicos.length" class="space-y-2">
            <PoliticoCard v-for="p in politicos" :key="p.id" :politico="p" />
          </div>

          <EmptyState v-else title="Nenhum político" />
        </div>

        <!-- Links rápidos por estado -->
        <div class="card">
          <h2 class="text-white font-semibold mb-3">Estados</h2>
          <div class="grid grid-cols-3 gap-1">
            <RouterLink
              v-for="uf in ufs"
              :key="uf"
              :to="`/estados/${uf}`"
              class="text-center py-1.5 rounded-lg bg-surface-700 hover:bg-primary-700 text-gray-300 hover:text-white text-xs font-medium transition-colors"
            >
              {{ uf }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BuscaGlobal from '@/components/busca/BuscaGlobal.vue'
import NoticiaFeed from '@/components/noticia/NoticiaFeed.vue'
import PoliticoCard from '@/components/politico/PoliticoCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { usePolitico } from '@/composables/usePolitico'

const router = useRouter()
const termoBusca = ref('')
const { politicos, loading: loadingPoliticos, buscar: buscarPoliticos } = usePolitico()

const estatisticas = ref([
  { valor: '513', label: 'Deputados Federais' },
  { valor: '81', label: 'Senadores' },
  { valor: '27', label: 'Estados + DF' },
  { valor: '5.568', label: 'Municípios' },
])

const ufs = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

function irParaBusca(q: string) {
  router.push({ name: 'busca', query: { q } })
}

onMounted(() => {
  buscarPoliticos({ limite: 5 })
})
</script>
