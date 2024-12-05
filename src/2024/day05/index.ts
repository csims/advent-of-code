// https://adventofcode.com/2024/day/5

import { sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

const parseUpdates = (lines: string[]) => {
  const orderingRules: number[][] = []
  const pageUpdates: number[][] = []

  lines.forEach(line => {
    if (line.includes('|')) {
      const rule = line.split('|').map(Number)
      orderingRules.push(rule)
    } else {
      const updates = line.split(',').map(Number)
      pageUpdates.push(updates)
    }
  })

  return {
    orderingRules,
    pageUpdates
  }
}

const validateRule = (pageUpdate: number[], orderingRule: number[]) => {
  const [first, second] = orderingRule
  const ruleApplies = pageUpdate.includes(first) && pageUpdate.includes(second)
  const followsRule = pageUpdate.indexOf(first) < pageUpdate.indexOf(second)

  return !ruleApplies || followsRule
}

const getMiddleNumber = (pageUpdate: number[]) =>
  pageUpdate[Math.ceil(pageUpdate.length / 2) - 1]

const sortByRule = (rule: number[], pageUpdate: number[]) => {
  return pageUpdate.sort((a, b) => {
    if (a === rule[0] && b === rule[1]) {
      return -1
    }
    if (a === rule[1] && b === rule[0]) {
      return 1
    }
    return 0
  })
}

const isUpdateValid = (update: number[], rules: number[][]) => {
  return rules.every(rule => validateRule(update, rule))
}

const sortByRules = (pageUpdate: number[], rules: number[][]) => {
  const sortedUpdate = [...pageUpdate]

  while (!isUpdateValid(sortedUpdate, rules)) {
    rules.forEach(rule => sortByRule(rule, sortedUpdate))
  }

  return sortedUpdate
}

/**
 * Part 1:
 */
export const part1 = (input: string) => {
  const lines = parseLines(input)
  const { orderingRules, pageUpdates } = parseUpdates(lines)

  const validUpdates = pageUpdates.map(update => {
    return isUpdateValid(update, orderingRules) ? getMiddleNumber(update) : 0
  })

  return sum(validUpdates)
}

/**
 * Part 2:
 */
export const part2 = (input: string) => {
  const lines = parseLines(input)
  const { orderingRules, pageUpdates } = parseUpdates(lines)

  const invalidUpdates = pageUpdates.filter(
    update => !isUpdateValid(update, orderingRules)
  )
  const fixedUpdates = invalidUpdates.map(update =>
    sortByRules(update, orderingRules)
  )

  return sum(fixedUpdates.map(getMiddleNumber))
}
