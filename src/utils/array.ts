export const sum = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev + curr, 0)

export const product = (numbers: number[]) =>
  numbers.reduce((prev, curr) => prev * curr, 1)
