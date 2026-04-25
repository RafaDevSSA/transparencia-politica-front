<template>
  <div class="max-w-7xl mx-auto px-4 py-8">

    <!-- Lista de estados -->
    <div v-if="!uf">
      <h1 class="text-2xl font-bold text-white mb-6">Estados Brasileiros</h1>

      <!-- Mapa SVG simplificado / Grade de estados -->
      <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 mb-8">
        <RouterLink
          v-for="estado in estados"
          :key="estado.uf"
          :to="`/estados/${estado.uf}`"
          class="card text-center hover:border-primary-500/60 hover:bg-primary-900/20 transition-all group"
        >
          <p class="text-xl font-bold text-primary-400 group-hover:text-primary-300">
            {{ estado.uf }}
          </p>
          <p class="text-gray-500 text-xs mt-0.5 hidden sm:block truncate">
            {{ estado.nome }}
          </p>
        </RouterLink>
      </div>
    </div>

    <!-- Detalhe de um estado -->
    <div v-else>
      <div class="flex items-center gap-3 mb-6">
        <RouterLink to="/estados" class="text-gray-400 hover:text-white transition-colors">
          ← Estados
        </RouterLink>
        <span class="text-gray-600">/</span>
        <h1 class="text-2xl font-bold text-white">{{ uf.toUpperCase() }}</h1>
      </div>

      <LoadingSpinner v-if="loading" :full="true" />

      <div v-else-if="dadosEstado" class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Métricas -->
        <div class="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="card text-center">
            <p class="text-2xl font-bold text-primary-400">{{ dadosEstado.total_politicos }}</p>
            <p class="text-gray-400 text-sm">Políticos</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-green-400">{{ dadosEstado.total_noticias_mes }}</p>
            <p class="text-gray-400 text-sm">Notícias/mês</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-yellow-400">{{ dadosEstado.total_leis_vigentes }}</p>
            <p class="text-gray-400 text-sm">Leis Vigentes</p>
          </div>
          <div class="card text-center">
            <p class="text-2xl font-bold text-purple-400">
              {{ dadosEstado.representantes?.deputados_federais_count || 0 }}
            </p>
            <p class="text-gray-400 text-sm">Dep. Federais</p>
          </div>
        </div>

        <!-- Representantes -->
        <div class="lg:col-span-2 card">
          <h2 class="text-white font-semibold mb-4">Representantes</h2>

          <div v-if="dadosEstado.representantes">
            <!-- Governador -->
            <div
              v-if="dadosEstado.representantes.governador"
              class="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700"
            >
              <div class="w-10 h-10 bg-blue-900/40 rounded-full flex items-center justify-center">
                <UserIcon class="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p class="text-white text-sm font-medium">
                  {{ dadosEstado.representantes.governador.nome }}
                </p>
                <p class="text-gray-400 text-xs">
                  Governador · {{ dadosEstado.representantes.governador.partido }}
                </p>
              </div>
            </div>

            <!-- Senadores -->
            <h3 class="text-gray-400 text-xs uppercase font-medium mb-2">Senadores</h3>
            <div class="space-y-2">
              <div
                v-for="(s, i) in dadosEstado.representantes.senadores"
                :key="i"
                class="flex items-center justify-between"
              >
                <span class="text-gray-300 text-sm">{{ s.nome }}</span>
                <span class="badge-gray">{{ s.partido }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Partidos ativos -->
        <div class="card">
          <h2 class="text-white font-semibold mb-4">Partidos Ativos</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="partido in dadosEstado.partidos_ativos"
              :key="partido"
              class="badge-blue"
            >
              {{ partido }}
            </span>
          </div>
        </div>
      </div>

      <EmptyState v-else title="Estado não encontrado" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { UserIcon } from '@heroicons/vue/24/outline'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import api from '@/services/api'

const route = useRoute()
const uf = computed(() => route.params.uf as string | undefined)
const loading = ref(false)
const dadosEstado = ref<any>(null)

const estados = ref([
  { uf: 'AC', nome: 'Acre' }, { uf: 'AL', nome: 'Alagoas' }, { uf: 'AP', nome: 'Amapá' },
  { uf: 'AM', nome: 'Amazonas' }, { uf: 'BA', nome: 'Bahia' }, { uf: 'CE', nome: 'Ceará' },
  { uf: 'DF', nome: 'Distrito Federal' }, { uf: 'ES', nome: 'Espírito Santo' },
  { uf: 'GO', nome: 'Goiás' }, { uf: 'MA', nome: 'Maranhão' }, { uf: 'MT', nome: 'Mato Grosso' },
  { uf: 'MS', nome: 'Mato Grosso do Sul' }, { uf: 'MG', nome: 'Minas Gerais' },
  { uf: 'PA', nome: 'Pará' }, { uf: 'PB', nome: 'Paraíba' }, { uf: 'PR', nome: 'Paraná' },
  { uf: 'PE', nome: 'Pernambuco' }, { uf: 'PI', nome: 'Piauí' },
  { uf: 'RJ', nome: 'Rio de Janeiro' }, { uf: 'RN', nome: 'Rio Grande do Norte' },
  { uf: 'RS', nome: 'Rio Grande do Sul' }, { uf: 'RO', nome: 'Rondônia' },
  { uf: 'RR', nome: 'Roraima' }, { uf: 'SC', nome: 'Santa Catarina' },
  { uf: 'SP', nome: 'São Paulo' }, { uf: 'SE', nome: 'Sergipe' }, { uf: 'TO', nome: 'Tocantins' },
])

async function carregarEstado(u: string) {
  loading.value = true
  dadosEstado.value = null
  try {
    const { data } = await api.get(`/estados/${u}`)
    dadosEstado.value = data
  } catch {
    dadosEstado.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (uf.value) carregarEstado(uf.value)
})

watch(uf, (u) => {
  if (u) carregarEstado(u)
})
</script>
