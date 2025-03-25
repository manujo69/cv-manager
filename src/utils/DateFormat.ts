import { Job } from '@/models'

export function formatDate(value: string | Date | null): string {
  if (!value) return ''

  const date = value instanceof Date ? value : new Date(value)

  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  // Obtener el nombre del mes y el año
  const mes = meses[date.getMonth()]
  const año = date.getFullYear()

  // Retornar en el formato solicitado: "Mes de Año"
  return `${mes} de ${año}`
}

/**
 * Order by startDate (descending) and id (descending)
 *
 * @param a -- Item A
 * @param b -- Item B
 * @returns Order by startDate (descending) and id (descending)
 *
 */
export function orderByStartDate<T extends { startDate: Date; id: number }>(a: T, b: T): number {
  // Handle null startDate
  if (a.startDate === null && b.startDate === null) {
    return b.id - a.id // If both are null, sort by id
  }
  if (a.startDate === null) {
    return 1 // Nulls go to the end
  }
  if (b.startDate === null) {
    return -1 // Nulls go to the end
  }

  // Sort by startDate (descending)
  const dateA = new Date(a.startDate).getTime()
  const dateB = new Date(b.startDate).getTime()

  if (dateA !== dateB) {
    return dateB - dateA // Descending order
  }

  // If startDate is the same, sort by id (descending)
  return b.id - a.id
}

export const orderByDateApplied = (a: Job, b: Job) => {
  if (!a.dateApplied && !b.dateApplied) return 0
  if (!a.dateApplied) return 1
  if (!b.dateApplied) return -1
  return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
}
