import { readFileSync } from 'node:fs'
import { part1, part2 } from '.'

test('part 1', () => {
  const exampleInput = readFileSync(`${__dirname}/inputExample.txt`, 'utf-8')
  expect(part1(exampleInput, [11, 7])).toEqual(12)

  const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  expect(part1(input, [101, 103])).toEqual(228457125)
})

test('part 2', () => {
  const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  expect(part2(input, [101, 103])).toEqual(6493)
})
