export const parseLines = (input: string) => input.split('\n').filter(l => !!l)

export const isDefined = <T>(x: T | null | undefined): x is NonNullable<T> =>
  x !== null && x !== undefined

export const splitNumbers = (line: string) => line.split(/\s+/).map(Number)
