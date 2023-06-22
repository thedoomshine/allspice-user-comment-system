<template>
  <milkdown />
</template>

<script setup lang="ts">
import { Milkdown } from '@milkdown/vue'

import { useMilkdown } from '~/components/MarkdownEditor/useMilkdown'

const props = withDefaults(
  defineProps<{
    markdown?: string
    editable?: boolean
    onChange?: (markdown: string) => void
  }>(),
  {
    markdown: '',
    editable: false,
  }
)

useMilkdown(props.markdown, props.editable, props.onChange)
</script>

<styles lang="scss" scoped>
.milkdown {
  &,
  .editor {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
  }
  .editor > :first-child {
    margin-top: 0;
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
    clear: both;
  }

  h1,
  h2 {
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
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    max-width: 80ch;
    overflow-wrap: anywhere;
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

  ul ul ul {
    list-style-type: square;
  }

  ol {
    list-style-type: numeric;
  }

  ol,
  ul {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  li {
    display: list-item;
    gap: 0.5rem;
    margin: 0.25rem 0;

    p {
      margin: 0;
    }
  }

  ul[data-type='taskList'] li {
    display: inline-flex;
    align-items: center;
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

  del {
    text-decoration: line-through;
  }

  code {
    font-family: var(--font-family-monospace);
    font-size: inherit;
  }

  p + img,
  img + p {
    margin-top: 1rem;
  }

  /* Code in text */
  p > code,
  li > code,
  dd > code,
  td > code {
    background: var(--color-black);
    color: var(--color-white);
    box-decoration-break: clone;
    border-radius: var(--border-radius);
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 90%;
    white-space: break-spaces;
  }

  pre {
    padding: 1rem;
    overflow: auto;
    font-size: 90%;
    line-height: 1.45;
    color: var(--color-white);
    background-color: var(--color-black);
    border-radius: var(--border-radius);
  }

  pre code {
    -webkit-overflow-scrolling: touch;
    font-size: 90%;
    margin: 0;
    overflow: visible;
    padding: 0.2em 0.4em;
    white-space: break-spaces;

    display: inline;
    padding: 0;
    line-height: inherit;
    word-wrap: normal;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    margin: 0;
    overflow: hidden;
    display: block;
    width: 100%;
    overflow: auto;
    p {
      margin: 0;
    }

    th {
      font-weight: 600;
      background-color: var(--color-box-body);
    }

    th,
    td {
      padding: 0.5rem 1rem;
      border: 1px solid var(--color-secondary);
      position: relative;
    }

    tr {
      background-color: var(--color-box-body);
      border-top: 1px solid var(--color-secondary);

      &:nth-child(even) {
        background-color: var(--color-secondary-light-1);
      }
    }
  }

  [data-item-type='task'] {
    position: relative;
    padding-left: 1rem;
  }
}
</styles>
