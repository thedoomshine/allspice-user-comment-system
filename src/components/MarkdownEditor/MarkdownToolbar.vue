<template>
  <div
    role="toolbar"
    aria-label="Text formatting toolbar press left arrow to enter"
    class="markdown-editor__toolbar"
    dir="ltr"
    v-kbd-trap.roving.horizontal
  >
    <button
      v-for="button in controlButtons"
      :key="button.name"
      type="button"
      aria-pressed="false"
      :value="button.name"
      class="format-button"
      @click="button.onClick"
    >
      <component
        class="icon"
        :is="button.icon"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { type CmdKey } from '@milkdown/core'
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInHeadingCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark'
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm'
import { callCommand } from '@milkdown/utils'
// @ts-ignore
import { VueKeyboardTrapDirectiveFactory } from '@pdanpdan/vue-keyboard-trap'

import { useMilkdown } from '~/components/MarkdownEditor/useMilkdown'
import IconBold from '~/components/icons/bold.svg'
import IconHeading from '~/components/icons/heading.svg'
import IconItalic from '~/components/icons/italic.svg'
import IconLink from '~/components/icons/link.svg'
import IconListOL from '~/components/icons/list-ol.svg'
import IconListTask from '~/components/icons/list-task.svg'
import IconListUL from '~/components/icons/list-ul.svg'
import IconQuote from '~/components/icons/quote.svg'
import IconStrike from '~/components/icons/strike.svg'

const vKbdTrap = VueKeyboardTrapDirectiveFactory().directive

const props = withDefaults(
  defineProps<{
    markdown?: string
    onChange?: (markdown: string) => void
  }>(),
  {
    markdown: '',
  }
)

const { get } = useMilkdown(props.markdown, true, props.onChange)

function call<T>(command: CmdKey<T>, payload?: T) {
  return get()?.action(callCommand(command, payload))
}

const controlButtons = [
  {
    name: 'Heading',
    icon: IconHeading,
    onClick: () => call(wrapInHeadingCommand.key),
  },
  {
    name: 'Bold',
    icon: IconBold,
    onClick: () => call(toggleStrongCommand.key),
  },
  {
    name: 'Italic',
    icon: IconItalic,
    onClick: () => call(toggleEmphasisCommand.key),
  },
  {
    name: 'Strikethrough',
    icon: IconStrike,
    onClick: () => call(toggleStrikethroughCommand.key),
  },
  {
    name: 'Quote',
    icon: IconQuote,
    onClick: () => call(wrapInBlockquoteCommand.key),
  },
  {
    name: 'Link',
    icon: IconLink,
    // onClick: () => call(),
  },
  {
    name: 'Unordered List',
    icon: IconListUL,
    onClick: () => call(wrapInBulletListCommand.key),
  },
  {
    name: 'Ordered List',
    icon: IconListOL,
    onClick: () => call(wrapInOrderedListCommand.key),
  },
  {
    name: 'Task List',
    icon: IconListTask,
    // onClick: () => call(wrapInTaskListCommand.key),
  },
]
</script>

<styles lang="scss" scoped>
.markdown-editor__toolbar {
  display: flex;
  gap: 0.5rem;
  z-index: 0;
}

.format-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  border: solid 1px var(--color-text);
  border-radius: var(--border-radius);
  padding: 0.5rem;
  aspect-ratio: 1;
  cursor: pointer;
  .icon {
    fill: currentColor;
    height: 1rem;
    width: 1rem;
  }

  &:hover {
    background-color: var(--color-secondary-light-1);
    color: var(--color-primary);
  }
  &:active {
    color: var(--color-primary);
    stroke: currentColor;
  }
}
</styles>
