<template>
  <comment-block
    class="editor-wrapper"
    :user="user"
  >
    <template #content>
      <markdown-viewer
        class="markdown-editor"
        :markdown="markdown"
        editable
      />
    </template>

    <div class="editor-footer">
      <button class="button">Comment</button>
    </div>
  </comment-block>
</template>

<script setup lang="ts">
import CommentBlock from '~/components/CommentBlock.vue'
import MarkdownViewer from '~/components/MarkdownViewer.vue'
import type { UserProps } from '~/types/index'

withDefaults(
  defineProps<{
    user: UserProps
    markdown?: string
  }>(),
  {
    markdown: '',
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
  padding: 1rem;
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
}
</style>
