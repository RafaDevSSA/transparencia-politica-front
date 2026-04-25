export interface Noticia {
  id: string
  titulo: string
  fonte: string
  url: string
  publicado_em: string
  resumo?: string
  imagem_url?: string
  tags: string[]
  politicos_citados: string[]
}

export interface NoticiaListResponse {
  total: number
  pagina: number
  por_pagina: number
  total_paginas: number
  dados: Noticia[]
}
