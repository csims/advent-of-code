export const sum = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev + curr, 0)

export const product = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev * curr, 1)

export const countOccurrences = (arr: Array<string | number>) => {
  const initial: Record<string | number, number> = {}

  return arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1
    return acc
  }, initial)
}
