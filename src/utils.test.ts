import { isDefined, parseLines, product, sum } from './utils'

test('parseLines', () => {
  expect(parseLines('')).toEqual([])
  expect(parseLines('\n\n')).toEqual([])
  expect(parseLines('\nhello\nworld\n')).toEqual(['hello', 'world'])
})

test('isDefined', () => {
  expect(isDefined(null)).toEqual(false)
  expect(isDefined(undefined)).toEqual(false)

  expect(isDefined(false)).toEqual(true)
  expect(isDefined([])).toEqual(true)
  expect(isDefined(0)).toEqual(true)
  expect(isDefined('')).toEqual(true)
  expect(isDefined('foo')).toEqual(true)
})

test('sum', () => {
  expect(sum([])).toEqual(0)
  expect(sum([1, 2, 3])).toEqual(6)
})

test('product', () => {
  expect(product([])).toEqual(1)
  expect(product([2, 0])).toEqual(0)
  expect(product([1, 2, 3])).toEqual(6)
})
