<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <svg
      class="animate-spin"
      :class="[sizeClass, colorClass]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    <span v-if="label" class="ml-2 text-gray-400 text-sm">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ size?: 'sm' | 'md' | 'lg'; label?: string; full?: boolean }>(),
  { size: 'md' },
)

const sizeClass = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }[props.size]
const colorClass = 'text-primary-500'
const containerClass = props.full ? 'min-h-[200px]' : ''
</script>
