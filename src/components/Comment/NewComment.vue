<template>
  <comment-block
    class="new-comment"
    :user="currentUser"
  >
    <template #header>
      <markdown-toolbar
        :onChange="handleOnChange"
        :markdown="localMarkdown"
        aria-controls="markdown-editor__new"
      />
    </template>
    <template #content>
      <markdown-editor
        :markdown="localMarkdown"
        :onChange="handleOnChange"
        :onSave="handleOnSave"
        id="markdown-editor__new"
        :editable="true"
      />
    </template>
  </comment-block>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CommentBlock from '~/components/Comment/CommentBlock.vue'
import MarkdownEditor from '~/components/MarkdownEditor/MarkdownEditor.vue'
import MarkdownToolbar from '~/components/MarkdownEditor/MarkdownToolbar.vue'
import { currentUser } from '~/data/users'
import { postComment } from '~/utils/commentsApiMethods'

const localMarkdown = ref('')
const emit = defineEmits(['submit'])

const handleOnChange = (markdown: string) => {
  localMarkdown.value = markdown
}

const handleOnSave = async () => {
  try {
    await postComment(localMarkdown.value)
    localMarkdown.value = ''
    emit('submit')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss">
.new-comment {
  margin-top: 0rem;
  padding-top: 2rem;
  border-top: solid 4px var(--color-secondary);
}
</style>
