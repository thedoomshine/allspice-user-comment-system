<template>
    <milkdown />
</template>

<script setup lang="ts">
import { Editor, defaultValueCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core'
import { clipboard } from '@milkdown/plugin-clipboard'
import { cursor } from '@milkdown/plugin-cursor'
import { history } from '@milkdown/plugin-history'
import { upload } from '@milkdown/plugin-upload'
import { commonmark } from '@milkdown/preset-commonmark'
import { gfm } from '@milkdown/preset-gfm'
import { Milkdown, useEditor } from '@milkdown/vue'

import type { UserProps } from '~/types/index'

const props = withDefaults(
  defineProps<{
    user: UserProps
    markdown?: string
    editable?: boolean
  }>(),
  {
    markdown: '',
    editable: false,
  }
)

useEditor((root) => {
  return Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, props.markdown)
      ctx.set(editorViewOptionsCtx, { editable: () => props.editable })
    })
    .use(commonmark)
    .use(gfm)
    .use(clipboard)
    .use(cursor)
    .use(history)
    .use(upload)
})
</script>

<styles lang="scss" scoped>
.milkdown {
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  position: relative;
  word-wrap: break-word;
  line-height: 1.5;
  max-width: 100%;

  .editor > :first-child {
    margin-top: 0 !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding-bottom: 0.3em;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
    line-height: 1.15;
    border-bottom: solid 1px var(--color-secondary);
  }

  h1 {
    font-size: var(--font-size-h1);
    border-bottom: solid 1px var(--color-secondary);
  }

  h2 {
    font-size: var(--font-size-h2);
  }

  h3 {
    font-size: var(--font-size-h3);
  }

  h4 {
    font-size: var(--font-size-h4);
  }

  h5 {
    font-size: var(--font-size-h5);
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre,
  details {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ul ul,
  ul ol,
  ol ol,
  ol ul {
    display: inline-flex;
    margin-top: 0;
    margin-bottom: 0;
  }

  ul {
    list-style-type: disc;
  }

  ul ul {
    list-style-type: circle;
  }

  ol {
    list-style-type: none;
    counter-reset: item;
    margin: 0;
    padding: 0;
    li {
      counter-increment: item;
      &::marker {
        content: counters(item, '.') '. ';
      }
      ol li::marker {
        content: counters(item, '.') ' ';
      }
    }
  }

  ol,
  ul {
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  li {
    display: list-item;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  blockquote {
    display: flex;
    flex-direction: column;
    border-left: solid 0.25rem var(--color-secondary);
    padding-left: 0.5rem;
    & > :last-child {
      margin-bottom: 0;
    }
  }

  hr {
    height: 0.25em;
    padding: 0;
    margin: 2rem 0;
    background-color: var(--color-secondary);
  }
}
</styles>
