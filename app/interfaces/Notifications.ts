export interface Notifications {
  id: number;
  mensagem: string;
  equipeid: number;
  conviteid: number;
  tipo: string;
  uri: string;
  horario?: number;
}
