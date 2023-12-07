// https://adventofcode.com/2023/day/1

import { sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

/**
 * Part 1:
 * Input has lines of text.
 * Each line originally contained a value that needs to be recovered.
 * The value on each line can be found by combining the first and last digits to form a single two-digit number.
 * What is the sum of all the values?
 *
 * Part 2:
 * Same as above, but parse number words 'one' thru 'nine'.
 */

const isNumber = (x: string) => !!Number.parseInt(x, 10)

const numberMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

export const day1 = (input: string, parseWords = false): number => {
  const rawLines = parseLines(input)

  const regex = new RegExp(`^(${Object.keys(numberMap).join('|')}|[\\d])`)

  const values: number[] = rawLines.map(line => {
    let lineNumbers: number[] = []

    for (let i = 0; i < line.length; i++) {
      const matches = line.slice(i).match(regex)

      if (matches) {
        const match = matches[0]

        if (isNumber(match)) {
          lineNumbers.push(Number.parseInt(match, 10))
        } else if (parseWords) {
          lineNumbers.push(numberMap[match])
        }
      }
    }

    const first = lineNumbers[0]
    const last = lineNumbers[lineNumbers.length - 1]
    return Number.parseInt(`${first}${last}`, 10)
  })

  return sum(values)
}
