// https://adventofcode.com/2023/day/4

import { intersection } from '../../utils/set'
import { sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

type Card = {
  winningNumbers: Set<number>
  myNumbers: Set<number>
}

const parseNumbers = (str = ''): Set<number> => {
  const numbers = str
    .trim()
    .split(/\s+/g)
    .map(num => parseInt(num, 10))

  return new Set(numbers)
}

const parseCard = (line: string): Card => {
  const match = line.match(/.*:(?<winning>.*)\|(?<mine>.*)/)

  return {
    winningNumbers: parseNumbers(match?.groups?.winning),
    myNumbers: parseNumbers(match?.groups?.mine)
  }
}

/**
 * Part 1:
 * Each scratch card has winning numbers followed by your numbers.
 * Each card is worth 1 point for the first match, and each subsequent
 * match doubles the point value.
 * Return the total point value of all scratch cards.
 */
export const part1 = (input: string): number => {
  const lines = parseLines(input)
  const cards = lines.map(parseCard)
  const points: number[] = cards.map(card => {
    const winningNumbers = intersection(card.winningNumbers, card.myNumbers)
    return winningNumbers.size ? Math.pow(2, winningNumbers.size - 1) : 0
  })

  return sum(points)
}

/**
 *
 */
export const part2 = (input: string): number => {
  return 0
}
