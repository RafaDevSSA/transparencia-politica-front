<template>
  <div class="card">
    <h3 class="text-white font-medium mb-4">Filtros</h3>

    <div class="space-y-4">
      <!-- Tipo de conteúdo -->
      <div>
        <label class="text-gray-400 text-xs uppercase font-medium mb-2 block">Tipo</label>
        <div class="space-y-2">
          <label
            v-for="tipo in tipos"
            :key="tipo.value"
            class="flex items-center gap-2 cursor-pointer"
          >
            <input
              v-model="tiposSelecionados"
              type="checkbox"
              :value="tipo.value"
              class="rounded border-gray-600 bg-surface-700 text-primary-600 focus:ring-primary-500"
            />
            <span class="text-gray-300 text-sm">{{ tipo.label }}</span>
          </label>
        </div>
      </div>

      <!-- Ordenação -->
      <div>
        <label class="text-gray-400 text-xs uppercase font-medium mb-2 block">Ordenar por</label>
        <select v-model="ordenacao" class="input-dark w-full text-sm px-3 py-2">
          <option value="relevancia">Relevância</option>
          <option value="data">Data</option>
        </select>
      </div>
    </div>

    <button class="btn-secondary w-full mt-4 text-sm" @click="limpar">
      Limpar filtros
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  'update:tipos': [v: string[]]
  'update:ordenacao': [v: string]
}>()

const tipos = [
  { value: 'politico', label: 'Políticos' },
  { value: 'noticia', label: 'Notícias' },
  { value: 'lei', label: 'Leis' },
  { value: 'estado', label: 'Estados' },
  { value: 'cidade', label: 'Cidades' },
]

const tiposSelecionados = ref<string[]>([])
const ordenacao = ref('relevancia')

watch(tiposSelecionados, (v) => emit('update:tipos', v))
watch(ordenacao, (v) => emit('update:ordenacao', v))

function limpar() {
  tiposSelecionados.value = []
  ordenacao.value = 'relevancia'
}
</script>
