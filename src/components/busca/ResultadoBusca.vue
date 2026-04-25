<template>
  <component
    :is="isInternalLink ? RouterLink : 'a'"
    v-bind="linkProps"
    class="card hover:border-gray-600 transition-colors block group"
  >
    <div class="flex items-start gap-3">
      <!-- Ícone por tipo -->
      <div :class="['w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', iconBg]">
        <component :is="tipoIcon" class="w-5 h-5" :class="iconColor" />
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span :class="['badge', tipoBadgeClass]">{{ tipoLabel }}</span>
          <span class="text-gray-500 text-xs">
            Relevância: {{ (resultado.relevancia * 100).toFixed(0) }}%
          </span>
        </div>
        <p class="text-white text-sm font-medium group-hover:text-primary-400 transition-colors">
          {{ resultado.titulo }}
        </p>
        <p v-if="resultado.descricao" class="text-gray-400 text-xs mt-0.5">
          {{ resultado.descricao }}
        </p>
      </div>

      <ChevronRightIcon class="w-4 h-4 text-gray-500 flex-shrink-0 mt-1 group-hover:text-primary-400 transition-colors" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  UserIcon,
  NewspaperIcon,
  DocumentTextIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'
import type { ResultadoBusca } from '@/types/busca.types'

const props = defineProps<{ resultado: ResultadoBusca }>()

const tiposConfig: Record<string, any> = {
  politico: {
    label: 'Político',
    icon: UserIcon,
    bg: 'bg-blue-900/40',
    color: 'text-blue-400',
    badge: 'badge-blue',
  },
  noticia: {
    label: 'Notícia',
    icon: NewspaperIcon,
    bg: 'bg-green-900/40',
    color: 'text-green-400',
    badge: 'badge-green',
  },
  lei: {
    label: 'Lei',
    icon: DocumentTextIcon,
    bg: 'bg-yellow-900/40',
    color: 'text-yellow-400',
    badge: 'badge-yellow',
  },
  estado: {
    label: 'Estado',
    icon: MapPinIcon,
    bg: 'bg-purple-900/40',
    color: 'text-purple-400',
    badge: 'badge bg-purple-900/50 text-purple-300',
  },
  cidade: {
    label: 'Cidade',
    icon: BuildingLibraryIcon,
    bg: 'bg-gray-700',
    color: 'text-gray-400',
    badge: 'badge-gray',
  },
}

const config = computed(() => tiposConfig[props.resultado.tipo] || tiposConfig.cidade)
const tipoLabel = computed(() => config.value.label)
const tipoIcon = computed(() => config.value.icon)
const iconBg = computed(() => config.value.bg)
const iconColor = computed(() => config.value.color)
const tipoBadgeClass = computed(() => config.value.badge)

const isInternalLink = computed(
  () => props.resultado.url?.startsWith('/') || props.resultado.tipo === 'politico',
)

const linkProps = computed(() => {
  if (isInternalLink.value) {
    return { to: props.resultado.url || `/politico/${props.resultado.id}` }
  }
  return { href: props.resultado.url, target: '_blank', rel: 'noopener noreferrer' }
})
</script>
