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

export const zip = <T, V>(a: T[], b: V[]): [T, V][] => {
  if (a.length !== b.length) {
    throw new Error('Array lengths must be equal')
  }
  return a.map((x, idx) => [x, b[idx]])
}

export const unzip = <T, V>(tuples: [T, V][]): [T[], V[]] => {
  const arr1: T[] = []
  const arr2: V[] = []

  tuples.forEach(([a, b]) => {
    arr1.push(a)
    arr2.push(b)
  })

  return [arr1, arr2]
}

export const range = (start: number, stop: number) => {
  if (!Number.isInteger(start) || !Number.isInteger(stop)) {
    throw new Error('start and stop must be integers')
  }
  const len = stop - start
  return Array.from(Array(len).keys()).map(x => x + start)
}

export const at = <T>(array: T[], idx: number): T => {
  if (idx > array.length - 1 || idx < 0) {
    throw new Error(`${idx} isn't a valid index, try again?`)
  }
  return array[idx]
}
