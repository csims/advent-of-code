// https://adventofcode.com/2024/day/10

import { sum } from '../../utils/array'
import { formatPos, getAtPos, getGridSize, isInBounds } from '../../utils/grid'
import { parseLines } from '../../utils/helpers'

const parseMap = (lines: string[]) => {
  const trailheads: number[][] = []

  const map = lines.map((line, y) => {
    return line.split('').map((heightStr, x) => {
      const height = Number(heightStr)
      if (height === 0) {
        trailheads.push([x, y])
      }
      return height
    })
  })

  return {
    trailheads,
    map
  }
}

const getNextPos = (map: number[][], [x, y]: number[]): number[][] => {
  const height = getAtPos(map, [x, y])

  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1]
  ].filter(
    pos =>
      isInBounds(pos, getGridSize(map)) && getAtPos(map, pos) - height === 1
  )
}

const hike = (
  map: number[][],
  pos: number[]
): {
  summits: Set<string>
  trails: number
} => {
  if (getAtPos(map, pos) === 9) {
    return {
      summits: new Set<string>().add(formatPos(pos)),
      trails: 1
    }
  }

  const next = getNextPos(map, pos).map(nextPos => hike(map, nextPos))

  return {
    summits: next.reduce((acc, curr) => {
      return acc.union(curr.summits)
    }, new Set<string>()),
    trails: sum(next.map(n => n.trails))
  }
}

/**
 * Part 1:
 * A topographic map has trailheads at height 0 and summits at height 9.
 * A trail can be hiked starting at a trailhead and increasing by a height of 1
 * in N/E/S/W direction. A trailhead's score is the number of summits that can
 * be reached from it. Return the sum of all trailhead scores for the given map.
 */
export const part1 = (input: string) => {
  const lines = parseLines(input)
  const { trailheads, map } = parseMap(lines)
  const scores = trailheads.map(th => hike(map, th).summits.size)
  return sum(scores)
}

/**
 * Part 2:
 * Same as above, but a trailhead's rating is the number of paths that can be
 * taken to get from the trailhead to any summit. Return the sum of all
 * trailhead ratings for the given map.
 */
export const part2 = (input: string) => {
  const lines = parseLines(input)
  const { trailheads, map } = parseMap(lines)
  const ratings = trailheads.map(th => hike(map, th).trails)
  return sum(ratings)
}
