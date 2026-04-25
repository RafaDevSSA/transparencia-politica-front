<template>
  <nav class="bg-surface-800 border-b border-gray-700/50 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">TP</span>
          </div>
          <span class="font-semibold text-white hidden sm:block group-hover:text-primary-400 transition-colors">
            Transparência Política
          </span>
        </RouterLink>

        <!-- Nav Links -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-surface-700 transition-colors"
            active-class="!text-white !bg-surface-700"
          >
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- Busca rápida -->
        <div class="flex items-center gap-3">
          <div class="relative hidden sm:block">
            <input
              v-model="buscaRapida"
              type="text"
              placeholder="Buscar..."
              class="input-dark pl-9 pr-4 py-1.5 text-sm w-52 focus:w-72 transition-all duration-300"
              @keyup.enter="irParaBusca"
            />
            <MagnifyingGlassIcon class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const buscaRapida = ref('')

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/busca', label: 'Busca' },
  { to: '/estados', label: 'Estados' },
]

function irParaBusca() {
  if (buscaRapida.value.trim().length >= 2) {
    router.push({ name: 'busca', query: { q: buscaRapida.value.trim() } })
    buscaRapida.value = ''
  }
}
</script>
