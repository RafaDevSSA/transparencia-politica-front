<template>
  <div class="max-w-4xl mx-auto px-4 py-8">

    <LoadingSpinner v-if="loading" :full="true" />

    <div v-else-if="lei" class="space-y-6">
      <div class="flex items-center gap-3 mb-6">
        <RouterLink to="/" class="text-gray-400 hover:text-white">← Início</RouterLink>
        <span class="text-gray-600">/</span>
        <span class="text-gray-300">Lei {{ lei.numero }}/{{ lei.ano }}</span>
      </div>

      <div class="card">
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <h1 class="text-xl font-bold text-white">
            Lei Nº {{ lei.numero }}/{{ lei.ano }}
          </h1>
          <span :class="['badge', lei.situacao === 'vigente' ? 'badge-green' : 'badge-gray']">
            {{ lei.situacao }}
          </span>
        </div>

        <p class="text-gray-300 leading-relaxed">{{ lei.ementa }}</p>

        <div class="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-700">
          <div v-if="lei.data_publicacao">
            <p class="text-gray-500 text-xs uppercase">Data de Publicação</p>
            <p class="text-white">{{ lei.data_publicacao }}</p>
          </div>
          <div v-if="lei.autor">
            <p class="text-gray-500 text-xs uppercase">Autor</p>
            <RouterLink
              :to="`/politico/${lei.autor.id}`"
              class="text-primary-400 hover:underline"
            >
              {{ lei.autor.nome }}
            </RouterLink>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <a
            v-if="lei.link_oficial"
            :href="lei.link_oficial"
            target="_blank"
            rel="noopener"
            class="btn-primary text-sm"
          >
            Ver texto oficial →
          </a>
        </div>
      </div>
    </div>

    <EmptyState v-else title="Lei não encontrada" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import api from '@/services/api'
import type { Lei } from '@/types/busca.types'

const route = useRoute()
const lei = ref<Lei | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get(`/leis/${route.params.id}`)
    lei.value = data
  } catch {
    lei.value = null
  } finally {
    loading.value = false
  }
})
</script>
