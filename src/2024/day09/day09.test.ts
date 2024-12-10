import { readFileSync } from 'node:fs'
import { part1, part2 } from '.'

test('part 1', () => {
  const exampleInput = readFileSync(`${__dirname}/inputExample.txt`, 'utf-8')
  expect(part1(exampleInput)).toEqual(1928)
  const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  expect(part1(input)).toEqual(6225730762521)
})

test('part 2', () => {
  const exampleInput = readFileSync(`${__dirname}/inputExample.txt`, 'utf-8')
  expect(part2(exampleInput)).toEqual(2858)

  const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  expect(part2(input)).toEqual(6250605700557)
})
