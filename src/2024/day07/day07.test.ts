import { readFileSync } from 'node:fs'
import { part1, part2 } from '.'

test('part 1', () => {
  const exampleInput = readFileSync(`${__dirname}/inputExample.txt`, 'utf-8')
  expect(part1(exampleInput)).toEqual(3749)

  const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  expect(part1(input)).toEqual(1611660863222)
})

test('part 2', () => {
  const exampleInput = readFileSync(`${__dirname}/inputExample.txt`, 'utf-8')
  expect(part2(exampleInput)).toEqual(11387)

  const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  expect(part2(input)).toEqual(945341732469724)
})
