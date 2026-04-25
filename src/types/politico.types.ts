export interface Politico {
  id: number
  nome: string
  cargo: string
  partido?: string
  estado?: string
  foto_url?: string
  mandato_inicio?: string
  mandato_fim?: string
  noticias_count: number
  leis_count: number
  ultima_atividade?: string
}

export interface FiltroPolitico {
  nome?: string
  cargo?: string
  partido?: string
  estado?: string
  pagina: number
  limite: number
}

export interface PoliticoListResponse {
  total: number
  pagina: number
  por_pagina: number
  total_paginas: number
  dados: Politico[]
}
