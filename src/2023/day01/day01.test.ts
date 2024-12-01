import { readFileSync } from 'node:fs'
import { day1 } from '.'

test('part 1', () => {
  const exampleInput = readFileSync(`${__dirname}/inputExample.txt`, 'utf-8')
  expect(day1(exampleInput)).toEqual(142)

  const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  expect(day1(input)).toEqual(55208)
})

test('part 2', () => {
  const exampleInput = readFileSync(`${__dirname}/inputExample2.txt`, 'utf-8')
  expect(day1(exampleInput, true)).toEqual(281)

  const input = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  expect(day1(input, true)).toEqual(54578)
})
