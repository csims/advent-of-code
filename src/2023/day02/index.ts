// https://adventofcode.com/2023/day/2

import { sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

export type Cubes = {
  readonly red: number
  readonly green: number
  readonly blue: number
}

type Game = {
  readonly id: number
  readonly rounds: readonly Cubes[]
}

const parseRound = (roundInfo: string): Cubes => {
  const redMatches = roundInfo.match(/(\d+) red/)
  const greenMatches = roundInfo.match(/(\d+) green/)
  const blueMatches = roundInfo.match(/(\d+) blue/)

  return {
    red: redMatches ? Number.parseInt(redMatches[1], 10) : 0,
    green: greenMatches ? Number.parseInt(greenMatches[1], 10) : 0,
    blue: blueMatches ? Number.parseInt(blueMatches[1], 10) : 0
  }
}

const parseGame = (line: string): Game => {
  const [gameInfo, roundInfo] = line.split(':')
  const gameId = (gameInfo.match(/\d+/) || ['0'])[0]
  const rounds = roundInfo.split(';')

  return {
    id: Number.parseInt(gameId, 10),
    rounds: rounds.map(parseRound)
  }
}

const getGames = (input: string): Game[] => parseLines(input).map(parseGame)

/**
 * Part 1:
 * Find the games where all rounds would have been possible with the given
 * configuration of cubes. Return the sum of those game ids.
 */
export const part1 = (input: string, bagContents: Cubes): number => {
  const games = getGames(input)

  return games
    .filter(game =>
      game.rounds.every(
        round =>
          round.red <= bagContents.red &&
          round.green <= bagContents.green &&
          round.blue <= bagContents.blue
      )
    )
    .reduce((prev, curr) => prev + curr.id, 0)
}

/**
 * Part 2:
 * For each game, find fewest number of cubes of each color that would need to
 * be in the bag to make the game possible. Find the power of each set of cubes,
 * then add them together.
 */
export const part2 = (input: string): number => {
  const games = getGames(input)

  const cubePowers = games.map(game => {
    const minCubes: Cubes = game.rounds.reduce((prev: Cubes, curr) => {
      return {
        red: Math.max(prev.red, curr.red),
        green: Math.max(prev.green, curr.green),
        blue: Math.max(prev.blue, curr.blue)
      }
    }, game.rounds[0])

    return minCubes.red * minCubes.green * minCubes.blue
  })

  return sum(cubePowers)
}
