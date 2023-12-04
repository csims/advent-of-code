import { readFileSync } from 'fs'
import { part1 } from '.'

test('part 1', () => {
  const exampleInput = readFileSync(__dirname + '/inputExample.txt', 'utf-8')
  expect(part1(exampleInput)).toEqual(4361)

  const input = readFileSync(__dirname + '/input.txt', 'utf-8')
  expect(part1(input)).toEqual(540212)
})
