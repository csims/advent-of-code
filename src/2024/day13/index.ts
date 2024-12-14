// https://adventofcode.com/2024/day/13

import { sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

type ClawMachine = {
  a: [number, number]
  b: [number, number]
  prize: [number, number]
}

const parseClawMachines = (input: string, isPart2 = false) => {
  const lines = parseLines(input)
  const clawMachines: ClawMachine[] = []
  const valueRegex = /X[+=](\d+), Y[+=](\d+)/

  lines.forEach(line => {
    const lastMachine = clawMachines.at(-1)
    const values = line.match(valueRegex)

    // this is real dumb :)
    if (line.startsWith('Button A') && values) {
      clawMachines.push({
        a: [Number(values[1]), Number(values[2])],
        b: [0, 0],
        prize: [0, 0]
      })
    } else if (line.startsWith('Button B') && lastMachine && values) {
      lastMachine.b = [Number(values[1]), Number(values[2])]
    } else if (line.startsWith('Prize') && lastMachine && values) {
      const adjustment = isPart2 ? 10000000000000 : 0
      lastMachine.prize = [
        Number(values[1]) + adjustment,
        Number(values[2]) + adjustment
      ]
    }
  })

  return clawMachines
}

const solveIt = ({ a, b, prize }: ClawMachine): number => {
  const bPresses =
    (prize[0] * a[1] - prize[1] * a[0]) / (b[0] * a[1] - b[1] * a[0])
  const aPresses = (prize[0] - bPresses * b[0]) / a[0]

  if (!Number.isInteger(aPresses) || !Number.isInteger(bPresses)) {
    return 0
  }
  return aPresses * 3 + bPresses * 1
}

/**
 * Part 1:
 * You have a bunch of claw machines, each with Button A and Button B.
 * Button A costs 3 tokens per press and moves the claw ax units along the
 * x axis and ay units along the y axis. Button B costs 1 token per press and
 * moves the claw bx units along the x axis and by units along the y axis. The
 * prize is located at px, py. Not all claw machines are winnable.
 * For each claw machine, if it is winnable, find the minimum amount of presses
 * of Button A and Button B to reach the prize, and how many tokens it would
 * cost.
 * Return the minimum amount of tokens it would cost to win all winnable claw
 * machines.
 */
export const part1 = (input: string) => {
  const clawMachines = parseClawMachines(input)
  const tokens = clawMachines.map(solveIt)
  return sum(tokens)
}

/**
 * Part 2:
 * Same as part 1 but biggerer
 */
export const part2 = (input: string) => {
  const clawMachines = parseClawMachines(input, true)
  const tokens = clawMachines.map(solveIt)
  return sum(tokens)
}
