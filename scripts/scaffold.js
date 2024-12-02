import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const year = new Date().getFullYear().toString()
const day = Number(args[0])

if (!day || day < 1 || day > 31) {
  console.error('Invalid day')
  process.exit(1)
}

const dayDir = `day${day < 10 ? '0' : ''}${day}`
const fullPath = path.join('src', year, dayDir)

fs.mkdirSync(fullPath, { recursive: true })

const files = fs.readdirSync(fullPath)

const testScaffold = `
import { readFileSync } from 'node:fs'

test('part 1', () => {
  const exampleInput = readFileSync(\`\${__dirname}/inputExample.txt\`, 'utf-8')

  const input = readFileSync(\`\${__dirname}/input.txt\`, 'utf-8')
})

`

if (!files.length) {
  fs.writeFileSync(
    path.join(fullPath, 'index.ts'),
    `// https://adventofcode.com/${year}/day/${day}`
  )
  fs.writeFileSync(path.join(fullPath, `${dayDir}.test.ts`), testScaffold)
  fs.writeFileSync(path.join(fullPath, 'input.txt'), '')
  fs.writeFileSync(path.join(fullPath, 'inputExample.txt'), '')
} else {
  console.log('Directory already exists')
}
