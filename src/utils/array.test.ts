import { countOccurrences, product, sum } from './array'

test('sum', () => {
  expect(sum([])).toEqual(0)
  expect(sum([1, 2, 3])).toEqual(6)
})

test('product', () => {
  expect(product([])).toEqual(1)
  expect(product([2, 0])).toEqual(0)
  expect(product([1, 2, 3])).toEqual(6)
})

test('countOccurrences', () => {
  expect(countOccurrences([1, 2, 3, 2, 'foo', 'foo'])).toEqual({
    1: 1,
    2: 2,
    3: 1,
    foo: 2
  })
  expect(countOccurrences([])).toEqual({})
})
