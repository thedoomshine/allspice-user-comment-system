import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

export function mdToAST(markdown: string) {
  return unified().use(remarkGfm).use(remarkParse).parse(markdown)
}

function jsonParser() {
  this.Parser = function (root: string) {
    return JSON.parse(root)
  }
}
export function astToMD(ast: JSON) {
  return String(
    unified().use(jsonParser).use(remarkGfm).use(remarkStringify).processSync(JSON.stringify(ast))
  )
}
