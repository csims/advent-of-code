export const parseLines = (input: string) => input.split('\n').filter(l => !!l)

export const isDefined = <T>(x: T | null | undefined): x is NonNullable<T> =>
  x !== null && x !== undefined

export const splitNumbers = (line: string) => line.split(/\s+/).map(Number)

// biome-ignore lint/suspicious/noExplicitAny:
export const memoize = <T extends (...args: any[]) => any>(fn: T) => {
  const cache: Record<string, ReturnType<T>> = {}

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    if (cache[key]) {
      return cache[key]
    }
    const result = fn(...args)
    cache[key] = result
    return result
  }
}
