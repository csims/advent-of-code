import { add, concat, difference, div, mult, sub } from './number'

test('difference', () => {
  expect(difference(0, 0)).toEqual(0)
  expect(difference(3, 1)).toEqual(2)
  expect(difference(1, 3)).toEqual(2)
  expect(
    difference(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)
  ).toEqual(Number.POSITIVE_INFINITY)
  expect(difference(Number.NaN, 3)).toEqual(Number.NaN)
})

test('add', () => {
  expect(add(1, 2)).toEqual(3)
})

test('mult', () => {
  expect(mult(2, 3)).toEqual(6)
})

test('sub', () => {
  expect(sub(2, 3)).toEqual(-1)
})

test('div', () => {
  expect(div(6, 3)).toEqual(2)
})

test('concat', () => {
  expect(concat(3, 5)).toEqual(35)
  expect(concat(Number.NaN, 3)).toEqual(Number.NaN)
  expect(concat(Number.POSITIVE_INFINITY, 3)).toEqual(Number.NaN)
})
