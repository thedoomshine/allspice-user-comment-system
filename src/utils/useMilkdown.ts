import { Editor, defaultValueCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core'
import { clipboard } from '@milkdown/plugin-clipboard'
import { cursor } from '@milkdown/plugin-cursor'
import { history } from '@milkdown/plugin-history'
import { upload } from '@milkdown/plugin-upload'
import { commonmark, listItemSchema } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { $view } from '@milkdown/utils'
import { useEditor } from '@milkdown/vue'
import { useNodeViewFactory } from '@prosemirror-adapter/vue'

import MarkdownListItem from '~/components/MarkdownEditor/MarkdownListItem.vue'

export const useMilkdown = (markdown: string, editable: boolean) => {
  const nodeViewFactory = useNodeViewFactory()
  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, markdown)
        ctx.set(editorViewOptionsCtx, { editable: () => editable })
      })
      .use(commonmark)
      .use(gfm)
      .use(clipboard)
      .use(cursor)
      .use(history)
      .use(upload)
      .use(
        $view(listItemSchema.node, () => nodeViewFactory({ component: MarkdownListItem, as: 'li' }))
      )
  )

  return editor
}
