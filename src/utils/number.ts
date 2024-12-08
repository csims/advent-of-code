export type BinaryOperation = (a: number, b: number) => number

export const difference = (a: number, b: number) => Math.abs(a - b)

export const add = (a: number, b: number) => a + b

export const mult = (a: number, b: number) => a * b

export const sub = (a: number, b: number) => a - b

export const div = (a: number, b: number) => a / b

export const concat = (a: number, b: number) => Number(`${a}${b}`)
