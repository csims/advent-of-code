// https://adventofcode.com/2024/day/11

import { sum } from '../../utils/array'
import { memoize, parseLines, splitNumbers } from '../../utils/helpers'

const blink = memoize((stone: number, blinks: number): number => {
  const stoneStr = stone.toString()
  const stoneLen = stoneStr.length

  if (blinks === 0) {
    return 1
  }
  if (stone === 0) {
    return blink(1, blinks - 1)
  }
  if (stoneLen % 2 === 0) {
    const stone1 = Number(stoneStr.slice(0, stoneLen / 2))
    const stone2 = Number(stoneStr.slice(stoneLen / 2))
    return blink(stone1, blinks - 1) + blink(stone2, blinks - 1)
  }
  return blink(stone * 2024, blinks - 1)
})

/**
 * Part 1:
 * You have an array of stones with numbers on them. Every time you blink, each
 * stone in the array changes once depending on a set of 3 rules. How many
 * stones do you have after 25 blinks?
 */
export const part1 = (input: string) => {
  const lines = parseLines(input)
  const initialStones = splitNumbers(lines[0])
  const stones = initialStones.map(stone => blink(stone, 25))
  return sum(stones)
}

/**
 * Part 2:
 * Same as above but how many stones do you have after 75 blinks?
 * HOPE YOU LIKE RECURSION GLHF
 */
export const part2 = (input: string) => {
  const lines = parseLines(input)
  const initialStones = splitNumbers(lines[0])
  const stones = initialStones.map(stone => blink(stone, 75))
  return sum(stones)
}
