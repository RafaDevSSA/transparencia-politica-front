<template>
  <div v-if="totalPaginas > 1" class="flex items-center justify-center gap-2 mt-6">
    <button
      :disabled="pagina <= 1"
      class="btn-secondary px-3 py-1.5 text-sm disabled:opacity-40"
      @click="$emit('update:pagina', pagina - 1)"
    >
      ← Anterior
    </button>

    <div class="flex gap-1">
      <button
        v-for="p in paginasVisiveis"
        :key="p"
        :class="[
          'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
          p === pagina
            ? 'bg-primary-600 text-white'
            : 'bg-surface-700 text-gray-300 hover:bg-surface-600',
          p === '...' ? 'cursor-default' : '',
        ]"
        :disabled="p === '...'"
        @click="p !== '...' && $emit('update:pagina', p as number)"
      >
        {{ p }}
      </button>
    </div>

    <button
      :disabled="pagina >= totalPaginas"
      class="btn-secondary px-3 py-1.5 text-sm disabled:opacity-40"
      @click="$emit('update:pagina', pagina + 1)"
    >
      Próxima →
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  pagina: number
  totalPaginas: number
}>()

defineEmits<{ 'update:pagina': [p: number] }>()

const paginasVisiveis = computed(() => {
  const p = props.pagina
  const t = props.totalPaginas
  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1)

  const pages: (number | string)[] = [1]
  if (p > 3) pages.push('...')
  for (let i = Math.max(2, p - 1); i <= Math.min(t - 1, p + 1); i++) pages.push(i)
  if (p < t - 2) pages.push('...')
  pages.push(t)
  return pages
})
</script>
