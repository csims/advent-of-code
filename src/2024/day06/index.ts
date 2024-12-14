// https://adventofcode.com/2024/day/6

import { formatPos, getGridSize, isInBounds, parsePos } from '../../utils/grid'
import { parseLines } from '../../utils/helpers'

const guardHeadings = ['>', 'v', '<', '^']

type Guard = {
  readonly x: number
  readonly y: number
  readonly heading: string
}

const guardVectors: Record<string, [number, number]> = {
  '>': [1, 0],
  v: [0, 1],
  '<': [-1, 0],
  '^': [0, -1]
}

const formatGuardPos = (guard: Guard) => formatPos([guard.x, guard.y])

const guardToString = (guard: Guard) => JSON.stringify(guard)

const parseMap = (lines: string[]) => {
  let guard: Guard = { x: 0, y: 0, heading: '>' }
  const obstacles: Set<string> = new Set()

  lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
      if (guardHeadings.includes(char)) {
        guard = { x, y, heading: char }
      } else if (char === '#') {
        obstacles.add(formatPos([x, y]))
      }
    })
  })

  return {
    guard,
    obstacles
  }
}

const isGuardOnMap = (guard: Guard, mapSize: number[]) =>
  isInBounds([guard.x, guard.y], mapSize)

const rotateGuard = (guard: Guard) => {
  const newHeadingIndex = guardHeadings.indexOf(guard.heading) + 1
  const newHeading = guardHeadings[newHeadingIndex % guardHeadings.length]

  return {
    ...guard,
    heading: newHeading
  }
}

const moveForward = (guard: Guard) => {
  const vector = guardVectors[guard.heading]

  return {
    x: guard.x + vector[0],
    y: guard.y + vector[1],
    heading: guard.heading
  }
}

const moveGuard = (guard: Guard, obstacles: Set<string>) => {
  const movedGuard = moveForward(guard)

  if (obstacles.has(formatGuardPos(movedGuard))) {
    return rotateGuard(guard)
  }
  return movedGuard
}

const getAllGuardPositions = (
  _guard: Guard,
  obstacles: Set<string>,
  mapSize: number[]
) => {
  let guard: Guard = { ..._guard }
  let isOnMap = isGuardOnMap(guard, mapSize)
  const positions: Set<string> = new Set()

  while (isOnMap) {
    guard = moveGuard(guard, obstacles)
    isOnMap = isGuardOnMap(guard, mapSize)
    isOnMap && positions.add(formatGuardPos(guard))
  }

  return positions
}

/**
 * Part 1:
 * A map has a guard facing N/S/E/W and a bunch of obstacles. The guard moves
 * forward until it hits an obstacle, then turns right and keeps going unti
 * it's off the map. Find the number of distinct positions the guard will be in
 * before it goes off the map.
 */
export const part1 = (input: string) => {
  const lines = parseLines(input)
  const mapSize = getGridSize(lines)
  const { guard, obstacles } = parseMap(lines)
  const guardPositions = getAllGuardPositions(guard, obstacles, mapSize)

  return guardPositions.size
}

/**
 * Part 2:
 * Placing a new obstacle in certain places on the map can cause the guard
 * to get into a loop. Find the number of places on the map (excluding the
 * guard's initial position) where placing an obstacle can make this happen.
 */
export const part2 = (input: string) => {
  const lines = parseLines(input)
  const loopPositions: Set<string> = new Set()
  const mapSize = getGridSize(lines)
  const { guard, obstacles } = parseMap(lines)

  const intialRunPositions = getAllGuardPositions(guard, obstacles, mapSize)

  intialRunPositions.forEach(pos => {
    const [x, y] = parsePos(pos)

    if ((guard.x === x && guard.y === y) || obstacles.has(formatPos([x, y]))) {
      return
    }

    let isOnMap = true
    let isInLoop = false
    let guardCopy: Guard = { ...guard }
    const obstaclesCopy: Set<string> = new Set(obstacles).add(formatPos([x, y]))
    const guardPositions: Set<string> = new Set(guardToString(guard))

    while (isOnMap && !isInLoop) {
      guardCopy = moveGuard(guardCopy, obstaclesCopy)
      isOnMap = isGuardOnMap(guardCopy, mapSize) // is the guard still on the map
      isInLoop = guardPositions.has(guardToString(guardCopy)) // has the guard been here before
      isInLoop && loopPositions.add(formatPos([x, y])) // if so, add to possible loop positions
      guardPositions.add(guardToString(guardCopy)) // keep track of guard position history
    }
  })

  return loopPositions.size
}
