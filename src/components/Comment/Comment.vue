<template>
  <comment-block
    :user="user"
    :attachment="attachment"
    :ariaRole="ariaRole"
  >
    <template #header>
      <template v-if="!editComment">
        <p>
          <a
            :href="user.profile_url"
            class="user-link"
            >{{ user.display_name }}</a
          >
          commented
          <span class="time-distance">{{ formatDistanceToNow(new Date(posted_at)) }} ago</span>
        </p>
        <div class="role-label">{{ user.role }}</div>
        <Popover
          v-if="user.id === currentUser.id"
          class="popover"
        >
          <PopoverButton class="popover-button">
            <component
              class="icon"
              :is="IconKebab"
            />
          </PopoverButton>

          <PopoverPanel class="popover-panel">
            <button
              class="popover-panel__button"
              type="button"
              :onClick="handleEditComment"
            >
              Edit comment
            </button>
          </PopoverPanel>
        </Popover>
      </template>
      <markdown-toolbar
        v-else
        :markdown="markdown"
        aria-controls="markdown-editor__new"
        :onChange="handleOnChange"
      />
    </template>

    <template #content>
      <markdown-viewer
        v-if="!editComment"
        :markdown="markdown"
      />
      <markdown-editor
        v-else
        :markdown="markdown"
        id="markdown-editor__new"
        :onCancel="handleOnCancel"
        :onChange="handleOnChange"
        :onSave="handleOnSave"
      />
    </template>
  </comment-block>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { formatDistanceToNow } from 'date-fns'
import { ref } from 'vue'

import CommentBlock from '~/components/Comment/CommentBlock.vue'
import MarkdownEditor from '~/components/MarkdownEditor/MarkdownEditor.vue'
import MarkdownToolbar from '~/components/MarkdownEditor/MarkdownToolbar.vue'
import MarkdownViewer from '~/components/MarkdownEditor/MarkdownViewer.vue'
import IconKebab from '~/components/icons/kebab.svg'
import { currentUser } from '~/data/users'
import type { CommentProps } from '~/types'
import { updateComment } from '../../utils/commentsApiMethods'

const props = defineProps<CommentProps & { ariaRole?: string }>()
const emit = defineEmits(['submit'])
const editComment = ref(false)
const localMarkdown = ref(props.markdown)

const handleOnCancel = () => {
  editComment.value = false
}

const handleEditComment = () => {
  editComment.value = true
}

const handleOnSave = async () => {
  try {
    await updateComment(props.id, localMarkdown.value)
    editComment.value = false
    emit('submit')
  } catch (error) {
    console.error(error)
  }
}

const handleOnChange = (value: string) => {
  localMarkdown.value = value
}
</script>

<style lang="scss">
.popover {
  position: relative;
}

.popover-button {
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  padding: 0.5rem;
  margin: 0;
  &:hover {
    cursor: pointer;
    background-color: var(--color-secondary-dark-2);
  }
}

.popover-panel {
  position: absolute;
  background-color: var(--color-box-body);
  border: solid 1px var(--color-secondary);
  border-radius: var(--border-radius);
  right: 0;
  top: calc(100% + 0.125rem);
  padding: 0.25rem 0;
  white-space: nowrap;

  &::after,
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
  }
  &::after {
    left: auto;
    right: 10px;
    top: -14px;
  }
  &::after {
    border: 7px solid transparent;
    border-bottom: 7px solid var(--color-box-body);
  }
  &::before {
    left: auto;
    right: 9px;
    top: -16px;
  }
  &::before {
    border: 8px solid transparent;
    border-bottom: 8px solid var(--color-box-body);
  }
}

.popover-panel__button {
  padding: 0.5rem;
  border-radius: 0;
  &:hover {
    background-color: var(--color-accent);
  }
}
</style>
