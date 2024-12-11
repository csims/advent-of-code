import { at } from './array'

export const getGridSize = <T>(lines: string[] | T[][]) => {
  return [lines[0].length, lines.length]
}

export const isInBounds = ([x, y]: number[], [mapX, mapY]: number[]) => {
  return x >= 0 && x < mapX && y >= 0 && y < mapY
}

export const getAtPos = <T>(map: T[][], [x, y]: number[]) => {
  return at(at(map, y), x)
}

export const parsePos = (p: string) => p.split('|').map(Number)

export const formatPos = ([x, y]: number[]) => `${x}|${y}`
