<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <LoadingSpinner v-if="loading" :full="true" />

    <div v-else-if="cidade" class="space-y-6">
      <div class="flex items-center gap-3 mb-6">
        <RouterLink to="/estados" class="text-gray-400 hover:text-white">← Estados</RouterLink>
        <span class="text-gray-600">/</span>
        <span class="text-gray-300">{{ cidade.nome }}</span>
      </div>

      <div class="card">
        <h1 class="text-2xl font-bold text-white mb-2">{{ cidade.nome }}</h1>
        <p class="text-gray-400">{{ cidade.estado_uf }} · Cód. IBGE: {{ cidade.cod_ibge }}</p>

        <div class="grid grid-cols-2 gap-4 mt-6">
          <div class="bg-surface-700 rounded-lg p-4 text-center">
            <p class="text-2xl font-bold text-primary-400">{{ cidade.noticias_count || 0 }}</p>
            <p class="text-gray-400 text-sm">Notícias</p>
          </div>
        </div>
      </div>
    </div>

    <EmptyState v-else title="Cidade não encontrada" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import api from '@/services/api'

const route = useRoute()
const cidade = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get(`/cidades/${route.params.id}`)
    cidade.value = data
  } catch {
    cidade.value = null
  } finally {
    loading.value = false
  }
})
</script>
