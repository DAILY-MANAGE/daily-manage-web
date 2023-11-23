import { AxiosResponse } from 'axios';

interface Form {
  idFormulario: number;
}

interface User {
  id: number;
  email: string;
  usuario: string;
  nome: string;
  formularios?: Form[];
}

export interface AuthResponse extends AxiosResponse {
  errors?: string[];
  token: string;
  refreshToken: string;
  usuario: User;
}
