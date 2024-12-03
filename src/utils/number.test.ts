import { difference } from './number'

test('difference', () => {
  expect(difference(0, 0)).toEqual(0)
  expect(difference(3, 1)).toEqual(2)
  expect(difference(1, 3)).toEqual(2)
  expect(
    difference(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)
  ).toEqual(Number.POSITIVE_INFINITY)
  expect(difference(Number.NaN, 3)).toEqual(Number.NaN)
})
