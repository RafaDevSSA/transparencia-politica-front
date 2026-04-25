<template>
  <div class="relative">
    <div class="relative flex items-center">
      <MagnifyingGlassIcon class="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
      <input
        v-model="termo"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-12 pr-12 py-3 text-base rounded-xl bg-surface-700 border border-gray-600
               text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500
               focus:border-transparent transition-all"
        @keyup.enter="emitirBusca"
        @input="emitirBuscaDebounced"
      />
      <button
        v-if="termo"
        class="absolute right-4 text-gray-400 hover:text-white transition-colors"
        @click="limpar"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Sugestão de termos -->
    <div v-if="mostrarDicas && !termo" class="mt-3 flex flex-wrap gap-2">
      <span class="text-gray-500 text-sm">Experimente:</span>
      <button
        v-for="dica in dicas"
        :key="dica"
        class="text-primary-400 text-sm hover:underline"
        @click="usarDica(dica)"
      >
        {{ dica }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useDebounce } from '@/composables/useDebounce'

const props = withDefaults(
  defineProps<{
    placeholder?: string
    mostrarDicas?: boolean
    modelValue?: string
  }>(),
  {
    placeholder: 'Buscar político, lei, estado ou cidade...',
    mostrarDicas: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [v: string]
  buscar: [v: string]
}>()

const termo = ref(props.modelValue || '')
const termoDebounced = useDebounce(termo, 400)

const dicas = ['Lula', 'reforma tributária', 'São Paulo', 'PSD', 'Senado']

watch(termoDebounced, (v) => {
  if (v.length >= 2) emit('buscar', v)
})

watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) termo.value = v
  },
)

function emitirBusca() {
  if (termo.value.length >= 2) emit('buscar', termo.value)
}

function emitirBuscaDebounced() {
  emit('update:modelValue', termo.value)
}

function limpar() {
  termo.value = ''
  emit('update:modelValue', '')
}

function usarDica(dica: string) {
  termo.value = dica
  emit('buscar', dica)
}
</script>
