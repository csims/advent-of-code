// https://adventofcode.com/2024/day/1

import { countOccurrences, sum, zip } from '../../utils/array'
import { parseLines } from '../../utils/helpers'
import { difference } from '../../utils/number'

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
  const zipped = zip(list1Sorted, list2Sorted)

  return sum(zipped.map(x => difference(...x)))
}

/**
 * Part 2:
 * Find how often each number from list 1 appears in list 2, multiply that
 * count by the number itself, and return the sum of all similarity scores.
 */
export const part2 = (input: string) => {
  const [list1, list2] = parseLists(input)
  const list2Counts = countOccurrences(list2)
  const similarities: number[] = []

  list1.forEach(num => {
    const similarity = (list2Counts[num] || 0) * num
    similarities.push(similarity)
  })

  return sum(similarities)
}
