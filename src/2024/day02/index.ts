// https://adventofcode.com/2024/day/2

import { parseLines, splitNumbers } from '../../utils/helpers'

const isSafe = (report: number[]) => {
  const levelDiffs: number[] = []

  report.forEach((level, idx) => {
    if (idx === 0) {
      return
    }
    levelDiffs.push(level - report[idx - 1])
  })

  const allIncreasing = levelDiffs.every(diff => diff > 0 && diff <= 3)
  const allDecreasing = levelDiffs.every(diff => diff < 0 && diff >= -3)

  return allIncreasing || allDecreasing
}

/**
 * Part 1:
 * Given a list of reports, count how many reports are safe. A report is safe if:
 * - all levels are either increasing or decreasing
 * - the difference between each level is between 1 and 3
 */
export const part1 = (input: string) => {
  const reports = parseLines(input).map(splitNumbers)
  return reports.reduce(
    (count: number, report) => (isSafe(report) ? count + 1 : count),
    0
  )
}

/**
 * Part 2:
 * Same as part 1, but a report also counts as safe if removing a single level
 * from an otherwise unsafe report would make it safe.
 */
export const part2 = (input: string) => {
  const reports = parseLines(input).map(splitNumbers)

  return reports.reduce((count: number, report) => {
    const anySafe = report.some((_level, idx) => {
      const modifiedReport = [...report]
      modifiedReport.splice(idx, 1)
      return isSafe(modifiedReport)
    })
    return anySafe ? count + 1 : count
  }, 0)
}
