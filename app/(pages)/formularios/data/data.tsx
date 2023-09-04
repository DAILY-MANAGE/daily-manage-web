import {
  RxArrowDown,
  RxArrowRight,
  RxArrowUp,
  RxCheckCircled,
  RxCircle,
  RxCrossCircled,
  RxQuestionMarkCircled,
  RxStopwatch,
} from 'react-icons/rx'

export const labels = [
  {
    value: 'bug',
    label: 'Formulário',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Log',
    icon: RxQuestionMarkCircled,
  },
  {
    value: 'todo',
    label: 'A Fazer',
    icon: RxCircle,
  },
  {
    value: 'in progress',
    label: 'Em Progresso',
    icon: RxStopwatch,
  },
  {
    value: 'done',
    label: 'Pronta',
    icon: RxCheckCircled,
  },
  {
    value: 'canceled',
    label: 'Cancelada',
    icon: RxCrossCircled,
  },
]

export const priorities = [
  {
    label: 'Baixa',
    value: 'low',
    icon: RxArrowDown,
  },
  {
    label: 'Média',
    value: 'medium',
    icon: RxArrowRight,
  },
  {
    label: 'Alta',
    value: 'high',
    icon: RxArrowUp,
  },
]
