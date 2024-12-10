// https://adventofcode.com/2024/day/9

import { range, sum } from '../../utils/array'
import { parseLines } from '../../utils/helpers'

type Chunk = {
  start: number
  len: number
}

type File = Chunk & {
  val: number
}

const computeChecksum = (blocks: string[]) => {
  return blocks.reduce((sum, curr, i) => {
    return curr === '.' ? sum : sum + Number(curr) * i
  }, 0)
}

const computeChecksumFromFiles = (files: File[]) => {
  return files.reduce((acc, curr) => {
    const currProduct = range(curr.start, curr.start + curr.len).map(
      idx => idx * curr.val
    )
    return acc + sum(currProduct)
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

const mapFreeSpace = (blocks: string[]): Chunk[] => {
  const thisisstupid = blocks.map(b => (b !== '.' ? ' ' : b)).join('')
  const freeSpaceMatches = [...thisisstupid.matchAll(/\.+/g)]

  return freeSpaceMatches.map(m => ({
    start: m.index,
    len: m[0].length
  }))
}

const moveFiles = (files: File[], freeSpace: Chunk[]) => {
  for (let i = files.length - 1; i >= 0; i -= 1) {
    const file = files[i]
    const firstFreeIdx = freeSpace.findIndex(
      free => free.len >= files[i].len && free.start < files[i].start
    )
    const firstFree = firstFreeIdx > -1 && freeSpace[firstFreeIdx]

    if (firstFree) {
      file.start = firstFree.start
      firstFree.start += file.len
      firstFree.len -= file.len

      if (firstFree.len <= 0) {
        freeSpace.splice(firstFreeIdx, 1)
      }
    }
  }

  return files
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
  const freeSpace = mapFreeSpace(blocks)
  const movedFiles = moveFiles(files, freeSpace)
  return computeChecksumFromFiles(movedFiles)
}
