import { readFileSync } from 'fs'
import { part1, part2 } from '.'

test('part 1', () => {
  const exampleInput = readFileSync(__dirname + '/inputExample.txt', 'utf-8')
  expect(part1(exampleInput)).toEqual(4361)

  const input = readFileSync(__dirname + '/input.txt', 'utf-8')
  expect(part1(input)).toEqual(540212)
})

test('part 2', () => {
  const exampleInput = readFileSync(__dirname + '/inputExample.txt', 'utf-8')
  expect(part2(exampleInput)).toEqual(467835)

  const input = readFileSync(__dirname + '/input.txt', 'utf-8')
  expect(part2(input)).toEqual(87605697)
})
