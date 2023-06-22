import { Editor, defaultValueCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core';
import { clipboard } from '@milkdown/plugin-clipboard'
import { cursor, dropCursorConfig } from '@milkdown/plugin-cursor'
import { history } from '@milkdown/plugin-history'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { upload } from '@milkdown/plugin-upload'
import { commonmark, listItemSchema } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { $view } from '@milkdown/utils'
import { useEditor } from '@milkdown/vue'
import { useNodeViewFactory } from '@prosemirror-adapter/vue'
import debounce from 'lodash.debounce'

import MarkdownListItem from '~/components/MarkdownEditor/MarkdownListItem.vue'
import thumbnail from '~/components/MarkdownEditor/thumbnail.ts'

export const useMilkdown = (
  markdown: string,
  editable: boolean,
  onChange?: (markdown: string) => void
) => {
  const nodeViewFactory = useNodeViewFactory()
  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, markdown)
        ctx.set(editorViewOptionsCtx, { editable: () => editable })
        ctx.set(dropCursorConfig.key, { color: 'var(--color-text)' })
        ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
          if (onChange) {
            onChange(markdown)
          }
        })
      })
      .use(commonmark)
      .use(gfm)
      .use(clipboard)
      .use(cursor)
      .use(history)
      .use(listener)
      .use(thumbnail)
      .use(upload)
      .use(
        $view(listItemSchema.node, () =>
          nodeViewFactory({
            component: MarkdownListItem,
            as: 'li',
            contentAs: 'label',
          })
        )
      )
  )

  return editor
}
