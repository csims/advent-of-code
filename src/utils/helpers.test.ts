import { isDefined, memoize, parseLines, splitNumbers } from './helpers'

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

test('splitNumbers', () => {
  expect(splitNumbers('0   1   2 3 foo')).toEqual([0, 1, 2, 3, Number.NaN])
})

test('memoize', () => {
  const memoizedParseLines = memoize(parseLines)
  expect(memoizedParseLines('\nhello\nworld\n')).toEqual(['hello', 'world'])
  expect(memoizedParseLines('\nhello\nworld\n')).toEqual(['hello', 'world'])
  expect(memoizedParseLines('\nhi\nthere\n')).toEqual(['hi', 'there'])
})
