import { parser } from "@lezer/javascript"
import { printTree } from "../src/index"

const source = `
function norm(a: number, b: number): number {
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}
`

const tree = parser.parse(source)

console.log(`Built-in\n\n${tree.toString()}\n\n`)
console.log(`printTree\n\n${printTree(tree, source)}`)