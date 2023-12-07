// https://adventofcode.com/2023/day/3

import { sum } from '../../utils/array'
import { isDefined, parseLines } from '../../utils/helpers'

type PartNumber = {
  readonly number: number
  readonly lineNumber: number
  readonly startIndex: number
  readonly endIndex: number
}

type Star = {
  readonly lineNumber: number
  readonly index: number
}

type PartMapping = Star & {
  readonly partNumbers: number[]
}

type RegExpWithIndex = RegExpMatchArray & { index: number }

const getNumbersForLine = (line: string, lineNumber: number): PartNumber[] => {
  const matches = [...line.matchAll(/\d+/g)]

  return matches
    .filter((match): match is RegExpWithIndex => isDefined(match.index))
    .map(match => ({
      number: Number.parseInt(match[0], 10),
      lineNumber,
      startIndex: match.index,
      endIndex: match.index + match[0].length - 1
    }))
}

const getStarsForLine = (line: string, lineNumber: number): Star[] => {
  const matches = [...line.matchAll(/\*/g)]

  return matches
    .filter((match): match is RegExpWithIndex => isDefined(match.index))
    .map(match => ({
      lineNumber,
      index: match.index
    }))
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

const isAdjacent = (partNumber: PartNumber, star: Star): boolean => {
  const isAdjacentRow = Math.abs(partNumber.lineNumber - star.lineNumber) <= 1
  const isAdjacentColumn =
    star.index >= partNumber.startIndex - 1 &&
    star.index <= partNumber.endIndex + 1

  return isAdjacentRow && isAdjacentColumn
}

/**
 * Part 1:
 * Any number adjacent to a symbol in the schematic, incl. diagonally,
 * is a "part number" to be summed up.
 */
export const part1 = (input: string): number => {
  const lines = parseLines(input)

  const partNumbers: number[] = lines.flatMap((line, i) => {
    const numbers = getNumbersForLine(line, i)
    return numbers
      .filter(num => isPartNumber(num, line, lines[i - 1], lines[i + 1]))
      .map(num => num.number)
  })

  return sum(partNumbers)
}

/**
 * Part 2:
 * Any star (*) symbol with exactly 2 adjacent parts is a gear.
 * The gear ratio is the product of the two parts for a particular gear.
 * Return the sum of all gear ratios.
 */
export const part2 = (input: string): number => {
  const lines = parseLines(input)
  let numbers: PartNumber[] = []
  let stars: Star[] = []

  lines.forEach((line, i) => {
    numbers = [...numbers, ...getNumbersForLine(line, i)]
    stars = [...stars, ...getStarsForLine(line, i)]
  })

  const partMappings: PartMapping[] = stars.map(star => {
    const adjacentPartNumbers = numbers
      .filter(partNum => isAdjacent(partNum, star))
      .map(partNum => partNum.number)

    return {
      ...star,
      partNumbers: adjacentPartNumbers
    }
  }, [])

  const gears = partMappings.filter(mapping => mapping.partNumbers.length === 2)
  const gearRatios: number[] = gears.map(gear =>
    gear.partNumbers.reduce((prev, curr) => prev * curr, 1)
  )

  return sum(gearRatios)
}
