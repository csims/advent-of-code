// https://adventofcode.com/2023/day/4

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
    .map(num => Number.parseInt(num, 10))

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
  const points: number[] = cards.map(({ winningNumbers, myNumbers }) => {
    const matchingNumbers = winningNumbers.intersection(myNumbers)
    return matchingNumbers.size ? 2 ** (matchingNumbers.size - 1) : 0
  })

  return sum(points)
}

/**
 * Part 2:
 * Instead of points, a card's matches gives you copies of the following cards,
 * e.g. if card 3 has 2 matches, get an extra copy of cards 4 and 5, or if card
 * 2 has 4 matches, get an extra copy of cards 3, 4, 5, and 6.
 * Return the total number of scratch cards you end up with.
 */
export const part2 = (input: string): number => {
  const lines = parseLines(input)
  const cards = lines.map(parseCard)
  const matchingNumberCounts = cards.map(
    ({ winningNumbers, myNumbers }) =>
      winningNumbers.intersection(myNumbers).size
  )
  const cardCopies = new Array(cards.length).fill(1)

  matchingNumberCounts.forEach((matchingCounts, cardIdx) => {
    const offsetsToCopy = [...Array(matchingCounts + 1).keys()].slice(1)

    offsetsToCopy.forEach(offset => {
      const oldVal = cardCopies[cardIdx + offset]
      const newVal = oldVal + cardCopies[cardIdx]
      cardCopies[cardIdx + offset] = newVal
    })
  })

  return sum(cardCopies)
}
