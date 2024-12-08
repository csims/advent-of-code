import { formatPos, getGridSize, isInBounds, parsePos } from './grid'

test('getGridSize', () => {
  expect(getGridSize(['....', '....', '....'])).toEqual([4, 3])
})

test('isInBounds', () => {
  expect(isInBounds([0, 0], [5, 4])).toBe(true)
  expect(isInBounds([4, 3], [5, 4])).toBe(true)
  expect(isInBounds([5, 4], [5, 4])).toBe(false)
  expect(isInBounds([0, 0], [0, 0])).toBe(false)
  expect(isInBounds([], [])).toBe(false)
})

test('parsePos', () => {
  expect(parsePos('4|5')).toEqual([4, 5])
})

test('formatPos', () => {
  expect(formatPos(4, 5)).toEqual('4|5')
})
