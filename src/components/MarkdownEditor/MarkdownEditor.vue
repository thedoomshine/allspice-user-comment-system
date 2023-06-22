<template>
  <div class="markdown-editor">
    <markdown-viewer
      v-show="!showPlainText"
      class="markdown-editor__content"
      editable
      :markdown="markdown"
      :onChange="onChange"
      :id="id"
    />

    <textarea
      v-if="showPlainText"
      class="markdown-editor__content markdown-editor__raw"
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
    <button v-if="onCancel" @click="onCancel" class="button button__cancel">Cancel</button>
    <button class="button button__submit" @click="onSave">Comment</button>
  </div>
</template>

<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { useMilkdown } from '~/components/MarkdownEditor/useMilkdown'
import { editorViewCtx, parserCtx } from '@milkdown/core'
import { Slice } from '@milkdown/prose/model'
import { ref } from 'vue'

import MarkdownViewer from '~/components/MarkdownEditor/MarkdownViewer.vue'

const showPlainText = ref(false)

const props = withDefaults(
  defineProps<{
    onCancel?: () => void
    markdown?: string
    id: string
    onChange?: (markdown: string) => void
    onSave?: () => void
  }>(),
  {
    markdown: ''
  }
)
const { loading, get } = useMilkdown(props.markdown, true, props.onChange)

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
    view.dispatch(
      state.tr.replace(
        0,
        state.doc.content.size,
        new Slice(doc.content, 0, 0)
      )
    )
  })
}
</script>

<style lang="scss">
.markdown-editor {
  border-radius: var(--border-radius);
  border: solid 1px var(--color-secondary);
  display: flex;
  flex-direction: column;
  &:focus-within {
    border-color: var(--color-primary);

    .file-uploader__label {
      border-top-color: var(--color-primary);
    }
  }
  &__content {
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
    min-height: 32rem;
  }
  &__raw {
    resize: vertical;
  }
}

.file-uploader__label {
  cursor: pointer;
  padding: 0.5rem;
  margin: 0;
  font-size: 0.825rem;
  line-height: 1rem;
  background-color: var(--color-body);
  border-top: 1px dashed var(--color-secondary);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  width: 100%;
  position: relative;
}

.file-uploader__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.editor-footer {
  display: flex;
  margin-top: 2rem;
  align-items: flex-end;
  gap: 1rem;
}

.button {
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  margin-right: 0;
  &__submit {
    background-color: var(--color-primary);
    color: var(--color-box-body);
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
    outline: solid 1px var(--color-primary);
    border-color: var(--color-primary);
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

.thumbnail-wrapper {
  float: left;
  overflow: hidden;
  height: 220.283px;
  width: 250px;
  margin-right: 1rem;

  img {
    width: 100%;
  }
}
</style>
