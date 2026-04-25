<template>
  <RouterLink
    :to="`/politico/${politico.id}`"
    class="card hover:border-primary-600/50 transition-all hover:shadow-lg hover:shadow-primary-900/20 block group"
  >
    <div class="flex items-start gap-3">
      <!-- Avatar -->
      <div class="flex-shrink-0">
        <img
          v-if="politico.foto_url"
          :src="politico.foto_url"
          :alt="politico.nome"
          class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-600"
        />
        <div
          v-else
          class="w-12 h-12 rounded-full bg-primary-800 flex items-center justify-center ring-2 ring-gray-600"
        >
          <span class="text-primary-300 font-semibold text-sm">
            {{ iniciais(politico.nome) }}
          </span>
        </div>
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <h3 class="text-white font-medium text-sm truncate group-hover:text-primary-400 transition-colors">
          {{ politico.nome }}
        </h3>
        <p class="text-gray-400 text-xs">{{ politico.cargo }}</p>
        <div class="flex items-center gap-2 mt-1.5">
          <span v-if="politico.partido" class="badge-blue">{{ politico.partido }}</span>
          <span v-if="politico.estado" class="badge-gray">{{ politico.estado }}</span>
        </div>
      </div>

      <!-- Métricas -->
      <div class="flex flex-col items-end gap-1 text-xs text-gray-500">
        <span v-if="politico.noticias_count" class="flex items-center gap-1">
          <NewspaperIcon class="w-3 h-3" />
          {{ politico.noticias_count }}
        </span>
        <span v-if="politico.leis_count" class="flex items-center gap-1">
          <DocumentTextIcon class="w-3 h-3" />
          {{ politico.leis_count }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { NewspaperIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'
import type { Politico } from '@/types/politico.types'

defineProps<{ politico: Politico }>()

function iniciais(nome: string) {
  return nome
    .split(' ')
    .filter((n) => n.length > 2)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
</script>
