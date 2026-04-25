export interface ResultadoBusca {
  tipo: 'politico' | 'noticia' | 'lei' | 'estado' | 'cidade'
  relevancia: number
  id: string | number
  titulo: string
  descricao?: string
  url?: string
}

export interface BuscaResponse {
  total: number
  query: string
  resultados: ResultadoBusca[]
}

export interface Lei {
  id: string
  numero: string
  ementa: string
  ano?: number
  situacao: string
  data_publicacao?: string
  autor?: { id: number; nome: string }
  link_oficial?: string
  texto_url?: string
}
