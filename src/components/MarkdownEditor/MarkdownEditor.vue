<template>
  <comment-block
    class="editor-wrapper"
    :user="user"
  >
    <template #header>
      <markdown-toolbar
        :usePlainText="showPlainText"
        :aria-controls="`markdown-editor-${id}`"
      />
    </template>
    <template #content>
      <editor-content
        v-show="!showPlainText"
        v-model="localMarkdown"
        :editable="true"
      />

      <textarea
        ref="rawMarkdownInput"
        v-if="showPlainText"
        class="markdown-editor"
        v-model="localMarkdown"
        contenteditable
      ></textarea>
      <div class="editor-footer">
        <div class="toggle-wrapper">
          <SwitchGroup>
            <Switch
              v-model="showPlainText"
              class="toggle"
              :class="showPlainText ? 'checked' : ''"
            >
              <span
                class="toggle__indicator"
                :class="showPlainText ? 'checked' : ''"
              />
            </Switch>
            <SwitchLabel>Use plain text</SwitchLabel>
          </SwitchGroup>
        </div>
        <button class="button">Comment</button>
      </div>
    </template>
  </comment-block>
</template>

<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { ref, watch } from 'vue'

import CommentBlock from '~/components/CommentBlock.vue'
import EditorContent from '~/components/MarkdownEditor/EditorContent.vue'
import MarkdownToolbar from '~/components/MarkdownEditor/MarkdownToolbar.vue'
import type { UserProps } from '~/types/index'

const props = withDefaults(
  defineProps<{
    id: string
    user: UserProps
    markdown?: string
  }>(),
  {
    markdown: '',
  }
)

const showPlainText = ref(false)
const localMarkdown = ref(props.markdown)
const rawMarkdownInput = ref()

const toBase64 = async (blob: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

const handlePaste = async (event) => {
  console.log(event.clipboardData.getData('image'))
  const input = rawMarkdownInput.value
  const clipboardContents = await navigator.clipboard.read()
  for (const item of clipboardContents) {
    const imgType = item.types.find((type: string) => new RegExp(/image/i).test(type))
    if (imgType) {
      const blob = await item.getType(imgType)
      // const base64 = await toBase64(blob)
      // const formattedImageString = `![image](${base64})`
      // const start = input.selectionStart
      // const end = input.selectionEnd

      // input.setRangeText(formattedImageString, start, end)
    }
  }
}

watch(
  () => localMarkdown.value,
  (newValue) => {
    console.log(newValue)
  }
)
</script>

<style lang="scss">
.editor-wrapper {
  border-top: solid 4px var(--color-secondary);
  padding-top: 2rem;
  margin-top: 1rem;
}

.editor-footer {
  display: flex;
  margin-top: 2rem;
  align-items: flex-end;
}

.button {
  background-color: var(--color-accent);
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  margin-left: auto;
  margin-right: 0;
  &:hover {
    cursor: pointer;
    background-color: var(--color-primary-light-2);
  }
}

.toggle-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  label {
    font-size: 0.9rem;
  }
}

.toggle {
  position: relative;
  display: inline-flex;
  border-radius: 1.75rem;
  border: solid 1px var(--color-text);
  height: 1.75rem;
  aspect-ratio: 1.75/1;
  padding: 0.25rem;
  cursor: pointer;
  color: var(--color-grey-light);
  flex: 0 0 auto;

  &:hover {
    background-color: var(--color-secondary-light-1);
    border-color: var(--color-primary);
  }
  &:focus-visible {
    outline: solid 1px var(--color-accent);
    border-color: var(--color-accent);
  }

  &.checked {
    background-color: var(--color-primary-light-5);
    color: var(--color-primary);
  }
}

.toggle__indicator {
  display: inline-block;
  aspect-ratio: 1;
  height: 100%;
  border-radius: 100%;
  background-color: currentColor;
  will-change: transform;
  transition-property: transform, color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &.checked {
    transform: translateX(1.25rem);
  }
}
</style>
