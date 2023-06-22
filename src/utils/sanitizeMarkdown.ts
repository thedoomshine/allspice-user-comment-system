import rehypeRemark from 'rehype-remark'
import rehypeSanitize from 'rehype-sanitize'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

export const sanitizeMarkdown = async (markdown: string) =>
  String(
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeRemark)
      .use(remarkStringify)
      .process(markdown)
  )
