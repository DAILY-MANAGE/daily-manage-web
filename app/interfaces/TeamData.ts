interface User {
  usuario: string
  nome: string
  permissoes: string[]
}

export interface TeamData {
  idEquipe: number
  nome: string
  usuarios: User[]
}
