// https://adventofcode.com/2024/day/8

import { formatPos, getGridSize, isInBounds, parsePos } from '../../utils/grid'
import { parseLines } from '../../utils/helpers'

const parseMap = (lines: string[]) => {
  const antennas: Record<string, string[]> = {}

  lines.forEach((row, y) => {
    row.split('').forEach((col, x) => {
      if (col === '.') {
        return
      }
      if (!antennas[col]) {
        antennas[col] = []
      }
      antennas[col].push(formatPos([x, y]))
    })
  })

  return antennas
}

const getAntinode = ([x1, y1]: number[], [x2, y2]: number[]) => {
  const dist = [x2 - x1, y2 - y1]
  return [x2 + dist[0], y2 + dist[1]]
}

const getAntinodeAtMultiplier = (
  [x, y]: number[],
  [distX, distY]: number[],
  multiplier: number
) => {
  return [x + distX * multiplier, y + distY * multiplier]
}

const getHarmonicAntinodes = (
  [x1, y1]: number[],
  [x2, y2]: number[],
  mapSize: number[]
) => {
  const dist = [x2 - x1, y2 - y1]
  const antinodes: number[][] = []
  let multiplier = 1
  let inBounds = true

  while (inBounds) {
    const nextAntinode = getAntinodeAtMultiplier([x1, y1], dist, multiplier)

    if (isInBounds(nextAntinode, mapSize)) {
      antinodes.push(nextAntinode)
      multiplier += 1
    } else {
      inBounds = false
    }
  }

  return antinodes
}

const permutations = (positions: number[][]) => {
  const results: number[][][] = []

  positions.forEach((p1, i) => {
    positions.forEach((p2, j) => {
      if (i === j) {
        return
      }
      results.push([p1, p2])
    })
  })

  return results
}

/**
 * Part 1:
 */
export const part1 = (input: string) => {
  const lines = parseLines(input)
  const antennas = parseMap(lines)
  const mapSize = getGridSize(lines)
  const allAntinodes: Set<string> = new Set()

  Object.entries(antennas).forEach(([_freq, locs]) => {
    const perms = permutations(locs.map(parsePos))

    perms.forEach(([point1, point2]) => {
      const antinode = getAntinode(point1, point2)
      const inBounds = isInBounds(antinode, mapSize)
      inBounds && allAntinodes.add(formatPos(antinode))
    })
  })

  return allAntinodes.size
}

/**
 * Part 2:
 */
export const part2 = (input: string) => {
  const lines = parseLines(input)
  const antennas = parseMap(lines)
  const mapSize = getGridSize(lines)
  const allAntinodes: Set<string> = new Set()

  Object.entries(antennas).forEach(([_freq, locs]) => {
    const perms = permutations(locs.map(parsePos))

    perms.forEach(([point1, point2]) => {
      const antinodes = getHarmonicAntinodes(point1, point2, mapSize)
      antinodes.forEach(n => allAntinodes.add(formatPos(n)))
    })
  })

  return allAntinodes.size
}
