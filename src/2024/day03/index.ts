// https://adventofcode.com/2024/day/3

import { sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

const parseInstructions = (input: string) => {
  const regex =
    /(?<mul>mul\((\d+),(\d+)\))|(?<enable>do\(\))|(?<disable>don't\(\))/g

  const matches = [...input.matchAll(regex)]

  return matches.map(match => {
    if (match.groups?.mul) {
      return Number(match[2]) * Number(match[3])
    }
    if (match.groups?.enable) {
      return true
    }
    return false
  })
}

/**
 * Part 1:
 * Parse all mul() instructions from the input, compute the products,
 * and return the sum of all products.
 */
export const part1 = (input: string) => {
  const lines = parseLines(input)
  const instructions = lines.flatMap(parseInstructions)
  const products = instructions.filter(n => typeof n === 'number')
  return sum(products)
}

/**
 * Part 2:
 * Same as part 1, but also parse do() and don't() instructions.
 * Ignore any mul() instructions after a don't() instruction until the next
 * do() instruction.
 */
export const part2 = (input: string) => {
  const lines = parseLines(input)
  const instructions = lines.flatMap(parseInstructions)
  let enabled = true

  return instructions.reduce((acc: number, curr) => {
    if (enabled && typeof curr === 'number') {
      return acc + curr
    }
    if (curr === true) {
      enabled = true
      return acc
    }
    enabled = false
    return acc
  }, 0)
}
