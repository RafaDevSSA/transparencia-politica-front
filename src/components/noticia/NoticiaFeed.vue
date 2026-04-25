<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-white font-semibold text-lg">Últimas Notícias</h2>
      <select
        v-model="fonte"
        class="input-dark text-sm px-3 py-1.5"
        @change="carregar"
      >
        <option value="">Todas as fontes</option>
        <option value="g1">G1</option>
        <option value="agencia_brasil">Agência Brasil</option>
        <option value="senado">Senado</option>
        <option value="camara">Câmara</option>
      </select>
    </div>

    <LoadingSpinner v-if="loading" :full="true" label="Carregando notícias..." />

    <div v-else-if="noticias.length" class="space-y-3">
      <NoticiaCard v-for="n in noticias" :key="n.id" :noticia="n" />
      <Paginacao
        :pagina="pagina"
        :total-paginas="totalPaginas"
        @update:pagina="trocarPagina"
      />
    </div>

    <EmptyState v-else title="Sem notícias" description="Nenhuma notícia encontrada para os filtros selecionados." />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NoticiaCard from './NoticiaCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Paginacao from '@/components/ui/Paginacao.vue'
import { useNoticia } from '@/composables/useNoticia'

const { noticias, loading, totalPaginas, buscar } = useNoticia()
const fonte = ref('')
const pagina = ref(1)

async function carregar() {
  await buscar({ fonte: fonte.value || undefined, pagina: pagina.value, limite: 10 })
}

function trocarPagina(p: number) {
  pagina.value = p
  carregar()
}

onMounted(carregar)
</script>
