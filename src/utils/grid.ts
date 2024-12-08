export const getGridSize = (lines: string[]) => {
  return [lines[0].length, lines.length]
}

export const isInBounds = ([x, y]: number[], [mapX, mapY]: number[]) => {
  return x >= 0 && x < mapX && y >= 0 && y < mapY
}

export const parsePos = (p: string) => p.split('|').map(Number)

export const formatPos = (x: number, y: number) => `${x}|${y}`
