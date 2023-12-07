import { intersection, union } from './set'

test('intersection', () => {
  expect(intersection(new Set([]), new Set([]))).toEqual(new Set([]))
  expect(intersection(new Set([1, 2, 3]), new Set([3, 4, 5]))).toEqual(
    new Set([3])
  )
})

test('union', () => {
  expect(union(new Set(), new Set())).toEqual(new Set())
  expect(union(new Set([1, 2, 3]), new Set([3, 4, 5]))).toEqual(
    new Set([1, 2, 3, 4, 5])
  )
})
