import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const tema = ref<'dark' | 'light'>('dark')
  const menuAberto = ref(false)

  function alternarTema() {
    tema.value = tema.value === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', tema.value === 'dark')
  }

  function alternarMenu() {
    menuAberto.value = !menuAberto.value
  }

  return { tema, menuAberto, alternarTema, alternarMenu }
})
