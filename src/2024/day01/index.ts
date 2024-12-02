// https://adventofcode.com/2024/day/1

import { sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

const parseLists = (input: string) => {
  const rawLines = parseLines(input)
  const list1: number[] = []
  const list2: number[] = []

  rawLines.forEach(line => {
    const numbers = line.split(/\s+/).map(n => Number(n))
    list1.push(numbers[0])
    list2.push(numbers[1])
  })

  return [list1, list2]
}

/**
 * Part 1:
 * Given two lists of numbers, in order of smallest to largest for each list,
 * pair the numbers from each list, find the difference between the numbers
 * and return the sum.
 */
export const part1 = (input: string) => {
  const [list1, list2] = parseLists(input)
  const list1Sorted = list1.toSorted()
  const list2Sorted = list2.toSorted()
  const diffs: number[] = []

  list1Sorted.forEach((num, idx) => {
    const diff = Math.abs(num - list2Sorted[idx])
    diffs.push(diff)
  })

  return sum(diffs)
}

/**
 * Part 2:
 * Find how often each number from list 1 appears in list 2, multiply that
 * count by the number itself, and return the sum of all similarity scores.
 */
export const part2 = (input: string) => {
  const [list1, list2] = parseLists(input)
  const similarities: number[] = []

  const list2Counts = list2.reduce(
    (acc: Record<number, number>, curr: number) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1
      return acc
    },
    {}
  )

  list1.forEach(num => {
    const similarity = list2Counts[num] ? num * list2Counts[num] : 0
    similarities.push(similarity)
  })

  return sum(similarities)
}
