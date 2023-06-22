<template>
  <div :class="clsx('markdown-editor', { editable: editable })">
    <milkdown
      v-show="!showPlainText"
      :id="id"
    />

    <textarea
      v-if="showPlainText"
      class="markdown-editor__raw"
      :value="markdown"
      :onChange="onMarkdownChange"
      contenteditable
    ></textarea>

    <!-- TODO: add Uploader to file selector https://milkdown.dev/docs/api/plugin-upload -->
    <!-- <label class="file-uploader__label">
      <input
        accept=".gif,.jpeg,.jpg,.mov,.mp4,.png,.svg,.webm,.csv,.docx,.fodg,.fodp,.fods,.fodt,.gz,.log,.md,.odf,.odg,.odp,.ods,.odt,.patch,.pdf,.pptx,.tgz,.txt,.xls,.xlsx,.zip, .SchDoc"
        type="file"
        multiple
        class="file-uploader__input"
        id="file-upload"
      />
      <span>Attach files by dragging & dropping, selecting, or pasting them.</span>
    </label> -->
  </div>
  <div
    class="editor-footer"
    v-if="editable"
  >
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
    <button
      v-if="onCancel"
      @click="onCancel"
      class="button button__cancel"
    >
      Cancel
    </button>
    <button
      class="button button__submit"
      @click="onSave"
    >
      Comment
    </button>
  </div>
</template>

<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { editorViewCtx, parserCtx } from '@milkdown/core'
import { Slice } from '@milkdown/prose/model'
import { Milkdown } from '@milkdown/vue'
import clsx from 'clsx'
import { ref } from 'vue'

import { useMilkdown } from '~/components/MarkdownEditor/utils/useMilkdown'

const showPlainText = ref(false)

const props = withDefaults(
  defineProps<{
    editable?: boolean
    id: string
    markdown?: string
    onCancel?: () => void
    onChange?: (markdown: string) => void
    onSave?: () => void
  }>(),
  {
    markdown: '',
    editable: false,
  }
)
const { loading, get } = useMilkdown(props.markdown, props.editable, props.onChange)

const onMarkdownChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  if (!target) return
  const newValue = target.value
  if (loading.value) return
  const editor = get()
  editor?.action((ctx) => {
    const view = ctx.get(editorViewCtx)
    const parser = ctx.get(parserCtx)
    const doc = parser(newValue)
    if (!doc) return
    const state = view.state
    view.dispatch(state.tr.replace(0, state.doc.content.size, new Slice(doc.content, 0, 0)))
  })
}
</script>

<style lang="scss">
@import './styles/markdown-styles';

.ProseMirror.editor {
  flex: 1 1 auto;
  height: 100%;
}

.file-uploader__label {
  cursor: pointer;

  position: relative;

  width: 100%;
  margin: 0;
  padding: 0.5rem;

  font-size: 0.825rem;
  line-height: 1rem;

  background-color: var(--color-body);
  border-top: 1px dashed var(--color-secondary);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}

.file-uploader__input {
  position: absolute;

  overflow: hidden;

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  white-space: nowrap;

  clip: rect(0, 0, 0, 0);
  border-width: 0;
}

.markdown-editor {
  display: flex;
  flex-direction: column;

  &.editable {
    border: solid 1px var(--color-secondary);
    border-radius: var(--border-radius);
    &:focus-within {
      border-color: var(--color-primary);

      .file-uploader__label {
        border-top-color: var(--color-primary);
      }
    }

    .milkdown,
    .markdown-editor__raw {
      padding: 1rem;
    }
  }
  .milkdown,
  .markdown-editor__raw {
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 100%;
    min-height: 32rem;

    line-height: 1.5;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  &__raw {
    resize: vertical;
  }
}

.editor-footer {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-top: 2rem;
}

.button {
  margin-right: 0;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  &__submit {
    color: var(--color-box-body);
    background-color: var(--color-primary);
    &:hover {
      cursor: pointer;
      background-color: var(--color-primary-light-2);
    }
  }
  &__cancel {
    margin-left: auto;
    &:hover {
      cursor: pointer;
      background-color: var(--color-box-body-highlight);
    }
  }
  &:focus-visible {
    outline: solid 1px var(--color-text);
    outline-offset: -0.33rem;
  }
}

.toggle-wrapper {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  label {
    font-size: 0.9rem;
  }
}

.toggle {
  cursor: pointer;

  position: relative;

  display: inline-flex;
  flex: 0 0 auto;

  aspect-ratio: 1.75/1;
  height: 1.75rem;
  padding: 0.25rem;

  color: var(--color-grey-light);

  border: solid 1px var(--color-text);
  border-radius: 1.75rem;

  &:hover {
    background-color: var(--color-secondary-light-1);
    border-color: var(--color-primary);
  }
  &:focus-visible {
    border-color: var(--color-primary);
    outline: solid 1px var(--color-primary);
  }

  &.checked {
    color: var(--color-primary);
    background-color: var(--color-primary-light-5);
  }
}

.toggle__indicator {
  will-change: transform;

  display: inline-block;

  aspect-ratio: 1;
  height: 100%;

  background-color: currentColor;
  border-radius: 100%;

  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-property: transform, color;

  &.checked {
    transform: translateX(1.25rem);
  }
}

.thumbnail-wrapper {
  float: left;
  overflow: hidden;

  width: 250px;
  height: 220.283px;
  margin-right: 1rem;

  img {
    width: 100%;
  }
}
</style>
