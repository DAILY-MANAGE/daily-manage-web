export interface User {
  usuario: string
  nome: string
  permissoes: string[]
}

export interface TeamData {
  id: number
  nome: string
  usuarios: User[]
}
