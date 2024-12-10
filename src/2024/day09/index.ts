// https://adventofcode.com/2024/day/9

import { sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

type Chunk = {
  start: number
  len: number
}

type File = Chunk & {
  val: number
}

const computeChecksum = (blocks: string[]) => {
  // const values = blocks.filter(b => b !== '.').map((b, i) => Number(b) * i)
  // return sum(values)
  return blocks.reduce((sum, curr, i) => {
    return curr === '.' ? sum : sum + Number(curr) * i
  }, 0)
}

const parseDiskMap = (diskMap: string) => {
  const blocks: string[] = []

  diskMap
    .split('')
    .map(Number)
    .forEach((block, i) => {
      if (i % 2 === 0) {
        // it's a file
        const fileBlocks: string[] = new Array(block).fill(`${i / 2}`)
        blocks.push(...fileBlocks)
      } else {
        // it's free space
        const freeSpaceBlocks: string[] = new Array(block).fill('.')
        blocks.push(...freeSpaceBlocks)
      }
    })

  return blocks
}

const moveBlocks = (_blocks: string[]) => {
  const blocks: string[] = [..._blocks]
  let forwardIdx = 0
  let revIdx = blocks.length - 1

  while (forwardIdx < revIdx) {
    if (blocks[forwardIdx] !== '.') forwardIdx += 1
    else if (blocks[revIdx] === '.') revIdx -= 1
    else {
      blocks[forwardIdx] = blocks[revIdx]
      blocks[revIdx] = '.'
    }
  }

  return blocks
}

const getFreeSpace = (blocks: string[]): Chunk[] => {
  const thisisstupid = blocks.map(b => (b !== '.' ? ' ' : b)).join('')
  const freeSpaceMatches = [...thisisstupid.matchAll(/\.+/g)]

  return freeSpaceMatches.map(m => ({
    start: m.index,
    len: m[0].length
  }))
}

const mapBlocks = (blocks: string[]) => {
  const fileMap: Record<string, Chunk> = {}

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i]

    if (block !== '.') {
      if (fileMap[block]) {
        fileMap[block].len += 1
      } else {
        fileMap[block] = {
          start: i,
          len: 1
        }
      }
    }
  }

  const files: File[] = Object.entries(fileMap).map(([k, v]) => ({
    ...v,
    val: Number(k)
  }))

  return files
}

const moveFiles = (files: File[], blocks: string[]) => {
  for (let i = files.length - 1; i >= 0; i -= 1) {
    const file = files[i]
    const freeSpace = getFreeSpace(blocks)
    const firstFree = freeSpace.find(
      free => free.len >= files[i].len && free.start < files[i].start
    )

    if (firstFree) {
      blocks.splice(
        firstFree.start,
        file.len,
        ...new Array(file.len).fill(file.val.toString())
      )
      blocks.splice(file.start, file.len, ...new Array(file.len).fill('.'))
    }
  }

  return blocks
}

/**
 * Part 1:
 */
export const part1 = (input: string) => {
  const diskMap = parseLines(input)[0]
  const blocks = parseDiskMap(diskMap)
  const movedBlocks = moveBlocks(blocks)
  return computeChecksum(movedBlocks)
}

/**
 * Part 2:
 */
export const part2 = (input: string) => {
  const diskMap = parseLines(input)[0]
  const blocks = parseDiskMap(diskMap)
  const files = mapBlocks(blocks)
  const movedFiles = moveFiles(files, blocks)
  return computeChecksum(movedFiles)
}
