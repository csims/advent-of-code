import { countOccurrences, product, sum, unzip, zip } from './array'

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
  // probably not ideal but whatever
  expect(zip([1], [2, 3])).toEqual([[1, 2]])
  expect(zip([1, 2], [3])).toEqual([
    [1, 3],
    [2, undefined]
  ])
})

test('unzip', () => {
  expect(unzip([])).toEqual([[], []])
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
  expect(unzip([[1, 2]])).toEqual([[1], [2]])
  expect(
    unzip([
      [1, 3],
      [2, undefined]
    ])
  ).toEqual([
    [1, 2],
    [3, undefined]
  ])
})
