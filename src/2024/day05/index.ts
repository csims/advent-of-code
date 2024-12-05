// https://adventofcode.com/2024/day/5

import { sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

const parseUpdates = (lines: string[]) => {
  const rules: number[][] = []
  const ruleSet: Set<string> = new Set()
  const pageUpdates: number[][] = []

  lines.forEach(line => {
    if (line.includes('|')) {
      const rule = line.split('|').map(Number)
      rules.push(rule)
      ruleSet.add(line)
    } else {
      const updates = line.split(',').map(Number)
      pageUpdates.push(updates)
    }
  })

  return {
    rules,
    ruleSet,
    pageUpdates
  }
}

const formatRule = (a: number, b: number) => `${a}|${b}`

const validateRule = (pageUpdate: number[], orderingRule: number[]) => {
  const [first, second] = orderingRule
  const firstIndex = pageUpdate.indexOf(first)
  const secondIndex = pageUpdate.indexOf(second)
  const ruleApplies = firstIndex >= 0 && secondIndex >= 0
  const followsRule = firstIndex < secondIndex

  return !ruleApplies || followsRule
}

const isUpdateValid = (update: number[], rules: number[][]) => {
  return rules.every(rule => validateRule(update, rule))
}

const getMiddleNumber = (pageUpdate: number[]) =>
  pageUpdate[Math.ceil(pageUpdate.length / 2) - 1]

const sortByRules = (ruleSet: Set<string>) => (pageUpdate: number[]) => {
  return pageUpdate.toSorted((a, b) => {
    return ruleSet.has(formatRule(a, b))
      ? -1
      : ruleSet.has(formatRule(b, a))
        ? 1
        : 0
  })
}

/**
 * Part 1:
 * Given a list rules (2 number each) and a list of updates, find the updates
 * that satisfy all rules, grab the middle number from each update, and return
 * the sum.
 * If an update contains both numbers of a rule, those numbers must appear in
 * the order specified in the rule for the update to be valid.
 */
export const part1 = (input: string) => {
  const lines = parseLines(input)
  const { rules, pageUpdates } = parseUpdates(lines)

  const validUpdates = pageUpdates.map(update => {
    return isUpdateValid(update, rules) ? getMiddleNumber(update) : 0
  })

  return sum(validUpdates)
}

/**
 * Part 2:
 * Same as part 1, but instead find the updates that are NOT valid, reorder
 * them to make them valid, and return the sum of the middle numbers from the
 * previously invalid updates.
 */
export const part2 = (input: string) => {
  const lines = parseLines(input)
  const { rules, pageUpdates, ruleSet } = parseUpdates(lines)

  const invalidUpdates = pageUpdates.filter(
    update => !isUpdateValid(update, rules)
  )
  const fixedUpdates = invalidUpdates.map(sortByRules(ruleSet))

  return sum(fixedUpdates.map(getMiddleNumber))
}
