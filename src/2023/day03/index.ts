// https://adventofcode.com/2023/day/3

import { isDefined, parseLines, sum } from '../../utils'

type PartNumber = {
  readonly number: number
  readonly startIndex: number
  readonly endIndex: number
}

const getNumbersForLine = (line: string): PartNumber[] => {
  const matches = line.matchAll(/\d+/g)
  let numbers = []

  for (const match of matches) {
    isDefined(match.index) &&
      numbers.push({
        number: Number.parseInt(match[0], 10),
        startIndex: match.index,
        endIndex: match.index + match[0].length - 1
      })
  }

  return numbers
}

const isPartNumber = (
  partNumber: PartNumber,
  line: string,
  prevLine = '',
  nextLine = ''
): boolean => {
  return [prevLine, line, nextLine].some(l => {
    const substr = l.substring(
      partNumber.startIndex - 1,
      partNumber.endIndex + 2
    )
    return /[^\d\w\.]/.test(substr)
  })
}

/**
 * Part 1:
 * Any number adjacent to a symbol in the schematic, incl. diagonally,
 * is a "part number" to be summed up.
 */
export const part1 = (input: string): number => {
  const lines = parseLines(input)

  const partNumbers: number[] = lines.flatMap((line, i) => {
    const numbers = getNumbersForLine(line)
    return numbers
      .filter(num => isPartNumber(num, line, lines[i - 1], lines[i + 1]))
      .map(num => num.number)
  })

  return sum(partNumbers)
}
