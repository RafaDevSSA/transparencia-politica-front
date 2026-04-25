<template>
  <article class="card hover:border-gray-600 transition-colors group">
    <div class="flex gap-3">
      <div v-if="noticia.imagem_url" class="flex-shrink-0">
        <img
          :src="noticia.imagem_url"
          :alt="noticia.titulo"
          class="w-20 h-20 object-cover rounded-lg"
        />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="badge-blue">{{ formatarFonte(noticia.fonte) }}</span>
          <span class="text-gray-500 text-xs">{{ formatarData(noticia.publicado_em) }}</span>
        </div>
        <a
          :href="noticia.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white font-medium text-sm leading-snug hover:text-primary-400 transition-colors line-clamp-2 group-hover:text-primary-300"
        >
          {{ noticia.titulo }}
        </a>
        <p v-if="noticia.resumo" class="text-gray-400 text-xs mt-1 line-clamp-2">
          {{ noticia.resumo }}
        </p>
        <div v-if="noticia.tags?.length" class="flex flex-wrap gap-1 mt-2">
          <span v-for="tag in noticia.tags.slice(0, 4)" :key="tag" class="badge-gray text-xs">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Noticia } from '@/types/noticia.types'

defineProps<{ noticia: Noticia }>()

function formatarData(iso: string) {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: ptBR })
  } catch {
    return iso?.slice(0, 10)
  }
}

function formatarFonte(fonte: string) {
  const mapa: Record<string, string> = {
    g1: 'G1',
    agencia_brasil: 'Agência Brasil',
    senado: 'Senado',
    camara: 'Câmara',
    poder360: 'Poder360',
    congresso_em_foco: 'Congresso em Foco',
  }
  return mapa[fonte] || fonte
}
</script>
