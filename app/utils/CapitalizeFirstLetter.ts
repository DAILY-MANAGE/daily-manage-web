export const capitalizeFirstLetter = (name: string) =>
  name
    ? name.substring(0, 1).toUpperCase() + name.substring(1, name.length)
    : 'Erro'
