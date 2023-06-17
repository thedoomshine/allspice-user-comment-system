<template>
  <header
    role="toolbar"
    aria-label="Text formatting"
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
  </header>
</template>

<script setup lang="ts">
import type { CmdKey } from '@milkdown/core'
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInHeadingCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark'
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm'
import { VueKeyboardTrapDirectiveFactory } from '@pdanpdan/vue-keyboard-trap'

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

const props = defineProps<{ call: <T>(command: CmdKey<T>, payload?: T) => boolean }>()

const controlButtons = [
  {
    name: 'Heading',
    icon: IconHeading,
    onClick: () => props.call(wrapInHeadingCommand.key),
  },
  {
    name: 'Bold',
    icon: IconBold,
    onClick: () => props.call(toggleStrongCommand.key),
  },
  {
    name: 'Italic',
    icon: IconItalic,
    onClick: () => props.call(toggleEmphasisCommand.key),
  },
  {
    name: 'Strikethrough',
    icon: IconStrike,
    onClick: () => props.call(toggleStrikethroughCommand.key),
  },
  {
    name: 'Quote',
    icon: IconQuote,
    onClick: () => props.call(wrapInBlockquoteCommand.key),
  },
  {
    name: 'Link',
    icon: IconLink,
    // onClick: () => props.call(),
  },
  {
    name: 'Unordered List',
    icon: IconListUL,
    onClick: () => props.call(wrapInBulletListCommand.key),
  },
  {
    name: 'Ordered List',
    icon: IconListOL,
    onClick: () => props.call(wrapInOrderedListCommand.key),
  },
  {
    name: 'Task List',
    icon: IconListTask,
    // onClick: () => props.call(wrapInTaskListCommand.key),
  },
]
</script>

<styles lang="scss" scoped>
.markdown-editor__toolbar {
  display: flex;
  gap: 0.5rem;
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
  &:focus-visible {
    outline: solid 1px var(--color-accent);
    border-color: var(--color-accent);
  }
  &:active {
    color: var(--color-primary);
    stroke: currentColor;
  }
}
</styles>
