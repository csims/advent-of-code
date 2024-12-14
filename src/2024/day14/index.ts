// https://adventofcode.com/2024/day/14

import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { product, range } from '../../utils/array'
import { getGridSize } from '../../utils/grid'
import { isDefined, parseLines } from '../../utils/helpers'

type Robot = {
  pos: number[]
  v: number[]
}

const parseRobot = (line: string): Robot | null => {
  const regex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/
  const res = line.match(regex)
  if (res) {
    return {
      pos: [Number(res[1]), Number(res[2])],
      v: [Number(res[3]), Number(res[4])]
    }
  }
  return null
}

const move = (robot: Robot, mapSize: number[]) => {
  const newX = robot.pos[0] + robot.v[0]
  const newY = robot.pos[1] + robot.v[1]
  robot.pos[0] = newX < 0 ? newX + mapSize[0] : newX % mapSize[0]
  robot.pos[1] = newY < 0 ? newY + mapSize[1] : newY % mapSize[1]
}

const calculateSafetyFactors = (
  robots: Robot[],
  mapSize: number[]
): number[] => {
  const robotCounts = [0, 0, 0, 0]
  const xSplit = (mapSize[0] - 1) / 2
  const ySplit = (mapSize[1] - 1) / 2

  robots.forEach(({ pos }) => {
    if (pos[0] < xSplit && pos[1] < ySplit) {
      robotCounts[0] += 1
    } else if (pos[0] < xSplit && pos[1] > ySplit) {
      robotCounts[1] += 1
    } else if (pos[0] > xSplit && pos[1] < ySplit) {
      robotCounts[2] += 1
    } else if (pos[0] > xSplit && pos[1] > ySplit) {
      robotCounts[3] += 1
    }
  })

  return robotCounts
}

const findXmasTree = (robots: Robot[], mapSize: number[], seconds: number) => {
  const map = Array(mapSize[1])
    .fill([])
    .map(() => Array(mapSize[0]).fill(' '))

  robots.forEach(({ pos }) => {
    map[pos[1]][pos[0]] = 'o'
  })
  const strMap = map.map(m => m.join('')).join('\n')

  if (strMap.includes('ooooooooooo')) {
    console.log('-----------------')
    console.log('FOUND SOMETHING at', seconds + 1)
    console.log(strMap)
    console.log('-----------------')
    return true
  }
}

/**
 * Part 1:
 * A bunch of robots in a bathroom of some size, each with a position and a
 * velocity that they move every second. Find where the robots will be after
 * 100 seconds. Then divide the map into quadrants, count how many robots are in
 * each quad (exluding any robots exactly on the lines), and return the product
 * of each count as the "safety factor".
 */
export const part1 = (input: string, mapSize: number[]) => {
  const lines = parseLines(input)
  const robots = lines.map(parseRobot).filter(isDefined)
  for (let i = 0; i < 100; i++) {
    robots.forEach(r => move(r, mapSize))
  }
  return product(calculateSafetyFactors(robots, mapSize))
}

/**
 * Part 2:
 * How many seconds till the robots look like a Christmas tree? 🙃 WHY?????
 */
export const part2 = (input: string, mapSize: number[]) => {
  const lines = parseLines(input)
  const robots = lines.map(parseRobot).filter(isDefined)

  for (let i = 0; i < 7000; i++) {
    robots.forEach(r => move(r, mapSize))
    const foundTree = findXmasTree(robots, mapSize, i)
    if (foundTree) {
      return i + 1
    }
  }
}
