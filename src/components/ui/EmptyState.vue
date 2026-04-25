<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mb-4">
      <component :is="icon || InboxIcon" class="w-8 h-8 text-gray-500" />
    </div>
    <h3 class="text-gray-300 font-medium text-lg mb-1">{{ title || 'Nenhum resultado' }}</h3>
    <p class="text-gray-500 text-sm max-w-xs">
      {{ description || 'Tente ajustar os filtros ou realizar uma nova busca.' }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { InboxIcon } from '@heroicons/vue/24/outline'
import type { Component } from 'vue'

defineProps<{
  title?: string
  description?: string
  icon?: Component
}>()
</script>
