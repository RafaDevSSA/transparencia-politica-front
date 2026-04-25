<template>
  <div class="max-w-5xl mx-auto px-4 py-8">

    <LoadingSpinner v-if="loading" :full="true" label="Carregando perfil..." />

    <div v-else-if="error" class="card text-center py-12">
      <ExclamationTriangleIcon class="w-12 h-12 text-red-400 mx-auto mb-3" />
      <p class="text-red-400">{{ error }}</p>
      <RouterLink to="/" class="btn-secondary mt-4 inline-block">← Voltar ao início</RouterLink>
    </div>

    <template v-else-if="politico">
      <!-- Header do Político -->
      <div class="card mb-6">
        <div class="flex flex-col sm:flex-row items-start gap-6">
          <img
            v-if="politico.foto_url"
            :src="politico.foto_url"
            :alt="politico.nome"
            class="w-24 h-24 rounded-full object-cover ring-4 ring-primary-600/30"
          />
          <div
            v-else
            class="w-24 h-24 rounded-full bg-primary-800 flex items-center justify-center ring-4 ring-primary-600/30 text-3xl font-bold text-primary-300"
          >
            {{ iniciais(politico.nome) }}
          </div>

          <div class="flex-1">
            <h1 class="text-2xl font-bold text-white">{{ politico.nome }}</h1>
            <p class="text-gray-400 text-lg">{{ politico.cargo }}</p>

            <div class="flex flex-wrap gap-2 mt-3">
              <span v-if="politico.partido" class="badge-blue text-sm">
                {{ politico.partido }}
              </span>
              <span v-if="politico.estado" class="badge-gray text-sm">
                {{ politico.estado }}
              </span>
              <span v-if="politico.mandato_fim" class="badge-green text-sm">
                Mandato até {{ formatarData(politico.mandato_fim) }}
              </span>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <div class="bg-surface-700 rounded-lg p-3 text-center">
                <p class="text-xl font-bold text-primary-400">{{ politico.noticias_count || 0 }}</p>
                <p class="text-gray-500 text-xs">Notícias</p>
              </div>
              <div class="bg-surface-700 rounded-lg p-3 text-center">
                <p class="text-xl font-bold text-primary-400">{{ politico.leis_count || 0 }}</p>
                <p class="text-gray-500 text-xs">Leis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 mb-4 bg-surface-800 p-1 rounded-xl">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
            abaAtiva === tab.id
              ? 'bg-primary-600 text-white'
              : 'text-gray-400 hover:text-white',
          ]"
          @click="abaAtiva = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Conteúdo das tabs -->
      <div v-if="abaAtiva === 'noticias'" class="space-y-3">
        <LoadingSpinner v-if="loadingNoticias" />
        <NoticiaCard v-for="n in noticiasPolitico" :key="n.id" :noticia="n" />
        <EmptyState v-if="!loadingNoticias && !noticiasPolitico.length" title="Sem notícias" />
      </div>

      <div v-if="abaAtiva === 'leis'" class="space-y-3">
        <LoadingSpinner v-if="loadingLeis" />
        <div v-for="l in leisPolitico" :key="l.id" class="card">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-white font-medium">Lei {{ l.numero }}/{{ l.ano }}</p>
              <p class="text-gray-400 text-sm mt-1">{{ l.ementa }}</p>
            </div>
            <span :class="['badge', l.situacao === 'vigente' ? 'badge-green' : 'badge-gray']">
              {{ l.situacao }}
            </span>
          </div>
        </div>
        <EmptyState v-if="!loadingLeis && !leisPolitico.length" title="Sem leis registradas" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import NoticiaCard from '@/components/noticia/NoticiaCard.vue'
import { usePolitico } from '@/composables/usePolitico'
import api from '@/services/api'
import type { Noticia } from '@/types/noticia.types'
import type { Lei } from '@/types/busca.types'

const route = useRoute()
const { politico, loading, error, buscarPorId } = usePolitico()

const abaAtiva = ref('noticias')
const tabs = [
  { id: 'noticias', label: 'Notícias' },
  { id: 'leis', label: 'Leis' },
]

const noticiasPolitico = ref<Noticia[]>([])
const leisPolitico = ref<Lei[]>([])
const loadingNoticias = ref(false)
const loadingLeis = ref(false)

function iniciais(nome: string) {
  return nome.split(' ').filter((n) => n.length > 2).slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

function formatarData(d: string) {
  return d?.slice(0, 7).replace('-', '/')
}

async function carregarNoticias(id: number) {
  loadingNoticias.value = true
  try {
    const { data } = await api.get(`/politicos/${id}/noticias`)
    noticiasPolitico.value = data.dados || []
  } finally {
    loadingNoticias.value = false
  }
}

async function carregarLeis(id: number) {
  loadingLeis.value = true
  try {
    const { data } = await api.get(`/politicos/${id}/leis`)
    leisPolitico.value = data.dados || []
  } finally {
    loadingLeis.value = false
  }
}

onMounted(async () => {
  const id = Number(route.params.id)
  await buscarPorId(id)
  if (politico.value) {
    carregarNoticias(id)
    carregarLeis(id)
  }
})
</script>
