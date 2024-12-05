// https://adventofcode.com/2024/day/4

import { parseLines } from '../../utils/helpers'

const parseGrid = (lines: string[]): string[][] =>
  lines.map(line => line.split(''))

const getAtCoord = (x: number, y: number, grid: string[][]) => {
  return grid[x]?.[y]
}

const findPart1Count = (x: number, y: number, grid: string[][]) => {
  const word = ['X', 'M', 'A', 'S']
  const directions = [
    [0, -1], // N
    [0, 1], // S
    [-1, 0], // W
    [1, 0], // E
    [-1, -1], // NW
    [-1, 1], // SW
    [1, -1], // NE
    [1, 1] // SE
  ]

  const matches = directions.map(d =>
    word.every(
      (letter, i) => getAtCoord(x + d[0] * i, y + d[1] * i, grid) === letter
    )
  )

  return matches.filter(m => !!m).length
}

const isPart2Match = (x: number, y: number, grid: string[][]) => {
  const word = ['M', 'A', 'S']

  // check the \ diagonal
  const checkDiagonal1 = (letter: string, i: number) =>
    getAtCoord(x + i - 1, y + i - 1, grid) === letter
  // check the / diagonal
  const checkDiagonal2 = (letter: string, i: number) =>
    getAtCoord(x - i + 1, y + i - 1, grid) === letter

  const matchesDiagonal1 =
    word.every(checkDiagonal1) || word.toReversed().every(checkDiagonal1)
  const matchesDiagonal2 =
    word.every(checkDiagonal2) || word.toReversed().every(checkDiagonal2)

  return matchesDiagonal1 && matchesDiagonal2
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
