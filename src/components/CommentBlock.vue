<template>
  <div class="comment-block">
    <a :href="user.profile_url">
      <img
        class="avatar"
        :src="user.profile_image"
        :alt="`${user.first_name} ${user.last_name}`"
      />
    </a>
    <div class="comment">
      <header class="comment-header">
        <slot name="header" />
      </header>
      <div class="comment-content">
        <slot
          name="content"
          :markdown="markdown"
        />

        <div
          v-if="attachment?.url"
          class="dropzone-attachments"
        >
          <a
            :href="attachment.url"
            class="attachment-url"
            ><file-icon class="icon" />{{ attachment.title }}</a
          >
          <span class="attachment-size">{{ attachment.size }}</span>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import type { UserProps } from '~/types'
import FileIcon from '~/components/icons/file.svg'

defineProps<{
  user: UserProps
  attachment?: {
    url: string
    title: string
    size: string
  }
  markdown?: string
}>()
</script>

<script lang="ts">
export default defineComponent({
  name: 'CommentBlock',
})
</script>

<styles lang="scss" scoped>
:root {
  --avatar-size: 2.5rem;
}

.avatar {
  border-radius: var(--border-radius);
  width: var(--avatar-size);
  aspect-ratio: 1;
}

.comment-block {
  display: grid;
  grid-template-columns: 2.5rem auto;
  column-gap: 1rem;
}

.comment {
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius);
  position: relative;

  &::before {
    background-color: var(--color-secondary);
  }

  &::after,
  &::before {
    position: absolute;
    top: 11px;
    right: 100%;
    left: -8px;
    display: block;
    width: 8px;
    height: 16px;
    pointer-events: none;
    content: '';
    clip-path: polygon(0 50%, 100% 0, 100% 100%);
  }
}

.comment-header {
  align-items: center;
  display: flex;
  padding: 0.5rem 1rem;
  background-color: var(--color-secondary);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}

.user-link {
  font-weight: bold;
  color: var(--color-text);
}

.role-label {
  border: 1px solid var(--color-light-border);
  color: var(--color-text-light);
  padding: 0.5rem;
  background-color: var(--color-light);
  font-size: 0.75rem;
  border-radius: var(--border-radius);
  margin-right: 0;
  margin-left: auto;
}

.comment-content {
  background-color: var(--color-box-body);
  padding: 1rem;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.dropzone-attachments {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--color-light-border);
  padding: 1rem 0;
}

.attachment-url {
  align-items: flex-end;
  display: inline-flex;
  gap: 0.5rem;
}
.icon {
  fill: currentcolor;
  aspect-ratio: 1;
  height: 1.25em;
}
</styles>
