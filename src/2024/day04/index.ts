// https://adventofcode.com/2024/day/4

import { parseLines } from '../../utils/helpers'

const parseGrid = (lines: string[]): string[][] =>
  lines.map(line => line.split(''))

const getAtCoord = (x: number, y: number, grid: string[][]) => {
  return grid[x]?.[y]
}

// wow this is dumb
const findPart1Count = (x: number, y: number, grid: string[][]) => {
  const word = ['X', 'M', 'A', 'S']

  const matchesN = word.every(
    (letter, i) => getAtCoord(x, y - i, grid) === letter
  )
  const matchesS = word.every(
    (letter, i) => getAtCoord(x, y + i, grid) === letter
  )
  const matchesW = word.every(
    (letter, i) => getAtCoord(x - i, y, grid) === letter
  )
  const matchesE = word.every(
    (letter, i) => getAtCoord(x + i, y, grid) === letter
  )
  const matchesNW = word.every(
    (letter, i) => getAtCoord(x - i, y - i, grid) === letter
  )
  const matchesNE = word.every(
    (letter, i) => getAtCoord(x + i, y - i, grid) === letter
  )
  const matchesSW = word.every(
    (letter, i) => getAtCoord(x - i, y + i, grid) === letter
  )
  const matchesSE = word.every(
    (letter, i) => getAtCoord(x + i, y + i, grid) === letter
  )
  const matches = [
    matchesN,
    matchesS,
    matchesW,
    matchesE,
    matchesNW,
    matchesNE,
    matchesSW,
    matchesSE
  ]
  return matches.filter(m => !!m).length
}

// this is also dumb
const isPart2Match = (x: number, y: number, grid: string[][]) => {
  const word = ['M', 'A', 'S']

  const matches1Forwards = word.every(
    (letter, i) => getAtCoord(x + i - 1, y + i - 1, grid) === letter
  )
  const matches1Backwards = word
    .toReversed()
    .every((letter, i) => getAtCoord(x + i - 1, y + i - 1, grid) === letter)
  const matches2Forwards = word.every(
    (letter, i) => getAtCoord(x - i + 1, y + i - 1, grid) === letter
  )
  const matches2Backwards = word
    .toReversed()
    .every((letter, i) => getAtCoord(x - i + 1, y + i - 1, grid) === letter)

  return (
    (matches1Forwards || matches1Backwards) &&
    (matches2Forwards || matches2Backwards)
  )
}

/**
 * Part 1:
 * In a grid of letters, find all instances of "XMAS" in any direction
 * (up, down, diagonal, reversed)
 */
export const part1 = (input: string) => {
  const lines = parseLines(input)
  const grid = parseGrid(lines)
  let count = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      count += findPart1Count(i, j, grid)
    }
  }

  return count
}

/**
 * Part 2:
 * In a grid of letters, find all instances of "MAS" in an X shape
 * (forwards or backwards)
 */
export const part2 = (input: string) => {
  const lines = parseLines(input)
  const grid = parseGrid(lines)
  let count = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      count += isPart2Match(i, j, grid) ? 1 : 0
    }
  }

  return count
}
