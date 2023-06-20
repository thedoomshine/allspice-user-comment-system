<template>
  <editor-content
    :editor="localEditor"
    class="markdown-editor"
  />
</template>

<script setup lang="ts">
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from '@tiptap/extension-strike'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, type JSONContent, useEditor } from '@tiptap/vue-3'
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import {
  MarkdownSerializer as ProseMirrorMarkdownSerializer,
  defaultMarkdownSerializer,
} from 'prosemirror-markdown'
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model'
import { watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    editable?: boolean
  }>(),
  {
    modelValue: '',
    editable: false,
  }
)

const emit = defineEmits(['change:modelValue'])

const tableMap = new WeakMap()

function isInTable(node) {
  return tableMap.has(node)
}

function renderHardBreak(state, node, parent, index: number) {
  const br = isInTable(parent) ? '<br>' : '\\\n'
  for (let i = index + 1; i < parent.childCount; i += 1) {
    if (parent.child(i).type !== node.type) {
      state.write(br)
      return
    }
  }
}

function renderOrderedList(state, node) {
  const { parens } = node.attrs
  const start = node.attrs.start || 1
  const maxW = String(start + node.childCount - 1).length
  const space = state.repeat(' ', maxW + 2)
  const delimiter = parens ? ')' : '.'
  state.renderList(node, space, (i) => {
    const nStr = String(start + i)
    return `${state.repeat(' ', maxW - nStr.length) + nStr}${delimiter} `
  })
}

function isPlainURL(link, parent, index, side) {
  if (link.attrs.title || !/^\w+:/.test(link.attrs.href)) return false
  const content = parent.child(index + (side < 0 ? -1 : 0))
  if (
    !content.isText ||
    content.text !== link.attrs.href ||
    content.marks[content.marks.length - 1] !== link
  )
    return false
  if (index === (side < 0 ? 1 : parent.childCount - 1)) return true
  const next = parent.child(index + (side < 0 ? -2 : 1))
  return !link.isInSet(next.marks)
}

const serializerMarks = {
  ...defaultMarkdownSerializer.marks,
  [Bold.name]: defaultMarkdownSerializer.marks.strong,
  [Strike.name]: {
    open: '~~',
    close: '~~',
    mixable: true,
    expelEnclosingWhitespace: true,
  },
  [Italic.name]: {
    open: '_',
    close: '_',
    mixable: true,
    expelEnclosingWhitespace: true,
  },
  [Code.name]: defaultMarkdownSerializer.marks.code,
  [Link.name]: {
    open(state, mark, parent, index) {
      return isPlainURL(mark, parent, index, 1) ? '<' : '['
    },
    close(state, mark, parent, index) {
      const href = mark.attrs.canonicalSrc || mark.attrs.href

      return isPlainURL(mark, parent, index, -1)
        ? '>'
        : `](${state.esc(href)}${mark.attrs.title ? ` ${state.quote(mark.attrs.title)}` : ''})`
    },
  },
  [Image.name]: {
    open(state, mark, parent, index) {
      console.log('state', state, mark)
    },
    close(state, mark, parent, index) {
      console.log(state, mark)
      return `${mark.attrs.alt}](${state.esc(src)}${
        mark.attrs.title ? ` ${state.quote(mark.attrs.title)}` : ''
      })`
    },
  },
}

const serializerNodes = {
  ...defaultMarkdownSerializer.nodes,
  [Paragraph.name]: defaultMarkdownSerializer.nodes.paragraph,
  [BulletList.name]: defaultMarkdownSerializer.nodes.bullet_list,
  [TaskList.name]: defaultMarkdownSerializer.nodes.task_list,
  [TaskItem.name]: defaultMarkdownSerializer.nodes.task_item,
  [ListItem.name]: defaultMarkdownSerializer.nodes.list_item,
  [HorizontalRule.name]: defaultMarkdownSerializer.nodes.horizontal_rule,
  [OrderedList.name]: renderOrderedList,
  [HardBreak.name]: renderHardBreak,
  [CodeBlock.name]: defaultMarkdownSerializer.nodes.code_block,
  [Blockquote.name]: (state, node) => {
    if (node.attrs.multiline) {
      state.write('>>>')
      state.ensureNewLine()
      state.renderContent(node)
      state.ensureNewLine()
      state.write('>>>')
      state.closeBlock(node)
    } else {
      state.wrapBlock('> ', null, node, () => state.renderContent(node))
    }
  },
}

function serialize(schema, content: JSONContent) {
  const proseMirrorDocument = schema.nodeFromJSON(content)
  const serializer = new ProseMirrorMarkdownSerializer(serializerNodes, serializerMarks)

  return serializer.serialize(proseMirrorDocument, {
    tightLists: true,
  })
}

function deserialize(schema, content: string) {
  marked.use(gfmHeadingId())
  const html = marked.parse(content, { mangle: false })

  if (!html) return null

  const parser = new DOMParser()
  const { body } = parser.parseFromString(html, 'text/html')

  body.append(document.createComment(content))

  const state = ProseMirrorDOMParser.fromSchema(schema).parse(body)

  return state.toJSON()
}

const localEditor = useEditor({
  content: '',
  editable: props.editable,
  extensions: [
    StarterKit,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    Link,
    Image,
    TaskItem,
    TaskList,
  ],
  parseOptions: {
    preserveWhitespace: true,
  },
  onCreate({ editor }) {
    const deserialized = deserialize(editor.schema, props.modelValue)
    localEditor.value?.commands.setContent(deserialized, true)
  },
  onUpdate({ editor }) {
    console.log(serialize(editor.schema, editor.getJSON()))
    emit('change:modelValue', serialize(editor.schema, editor.getJSON()))
  },
})

watch(
  () => props.modelValue,
  (newValue: string) => {
    const deserialized = deserialize(localEditor.value?.schema, newValue)
    const isSame = JSON.stringify(deserialized) === JSON.stringify(localEditor.value?.getJSON())
    if (isSame) {
      return
    }
    // console.log(deserialized)
    localEditor.value?.commands.setContent(deserialized, false)
  }
)
</script>

<style lang="scss">
.markdown-editor {
  border-radius: var(--border-radius);
  border: solid 1px var(--color-secondary);
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  max-width: 100%;
  padding: 1rem;
  position: relative;
  white-space: pre-wrap;
  width: 100%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  position: relative;
  word-wrap: break-word;
  line-height: 1.5;
  max-width: 100%;
  min-height: 20rem;

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

    p {
      margin: 0;
    }
  }

  ul[data-type="taskList"] li {
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

    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: var(--color-accent);
      pointer-events: none;
    }
  }

  [data-item-type='task'] {
    position: relative;
    padding-left: 1rem;
  }
}
</style>
