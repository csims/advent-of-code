import { readFileSync } from 'fs'
import { Cubes, part1, part2 } from '.'

const BAG_CONTENTS: Cubes = {
  red: 12,
  green: 13,
  blue: 14
}

test('part 1', () => {
  const exampleInput = readFileSync(__dirname + '/inputExample.txt', 'utf-8')
  expect(part1(exampleInput, BAG_CONTENTS)).toEqual(8)

  const input = readFileSync(__dirname + '/input.txt', 'utf-8')
  expect(part1(input, BAG_CONTENTS)).toEqual(2505)
})

test('part 2', () => {
  const exampleInput = readFileSync(__dirname + '/inputExample.txt', 'utf-8')
  expect(part2(exampleInput)).toEqual(2286)

  const input = readFileSync(__dirname + '/input.txt', 'utf-8')
  expect(part2(input)).toEqual(70265)
})
