import { readFileSync } from 'fs'
import { part1, part2 } from '.'

test('part 1', () => {
  const exampleInput = readFileSync(__dirname + '/inputExample.txt', 'utf-8')
  expect(part1(exampleInput)).toEqual(13)

  const input = readFileSync(__dirname + '/input.txt', 'utf-8')
  expect(part1(input)).toEqual(26443)
})
