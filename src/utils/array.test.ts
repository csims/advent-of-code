import { countOccurrences, product, range, sum, unzip, zip } from './array'

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
  expect(countOccurrences([])).toEqual({})
  expect(countOccurrences([1, 2, 3, 2, 'foo', 'foo'])).toEqual({
    1: 1,
    2: 2,
    3: 1,
    foo: 2
  })
})

test('zip', () => {
  expect(zip([], [])).toEqual([])
  expect(zip([1, 2, 3], [4, 5, 6])).toEqual([
    [1, 4],
    [2, 5],
    [3, 6]
  ])
  expect(() => zip([1], [2, 3])).toThrow()
  expect(() => zip([1, 2], [3])).toThrow()
})

test('unzip', () => {
  expect(unzip([])).toEqual([[], []])
  expect(unzip([[1, 2]])).toEqual([[1], [2]])
  expect(
    unzip([
      [1, 4],
      [2, 5],
      [3, 6]
    ])
  ).toEqual([
    [1, 2, 3],
    [4, 5, 6]
  ])
})

test('range', () => {
  expect(range(0, 0)).toEqual([])
  expect(range(0, 5)).toEqual([0, 1, 2, 3, 4])
  expect(range(1, 5)).toEqual([1, 2, 3, 4])
  expect(() => range(0, Number.NaN)).toThrow()
})
