<template>
  <main class="issue-page">
    <header class="issue-header">
      <div class="issue-header__content">
        AllSpice / Archimajor Files Issues 4 Design Reviews 2 Projects 1 Releases 1 Wiki Activity
      </div>
    </header>
    <div class="issue-title">
      <div>label milestone <button>new issue</button></div>
      <div>
        <h1>Failing 4KV ESD contact discharge <span>#3</span></h1>
        <div>
          <span>Open</span> <span>opened 2 years ago</span>
          <span>by <a href="#">kyle</a></span> &bullet; <span>0</span> comments
        </div>
      </div>
    </div>
    <div class="issue-feed">
      <comment-block
        v-for="{ id, attachment, user, posted_at, role, markdown } in userData"
        :key="id"
        :user="user"
        :attachment="attachment"
      >
        <template #header>
          <p>
            <a
              :href="user.profile_url"
              class="user-link"
              >{{ user.display_name }}</a
            >
            commented
            <span class="time-distance">{{ formatDistanceToNow(new Date(posted_at)) }} ago</span>
          </p>
          <div class="role-label">{{ role }}</div>
        </template>

        <template #content>
          <editor-content :modelValue="markdown" />
        </template>
      </comment-block>

      <markdown-editor
        id="new-post-editor"
        :user="currentUser"
        :modelValue="''"
      />
    </div>
    <issue-meta class="issue-meta" />
  </main>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

import CommentBlock from '~/components/CommentBlock.vue'
import IssueMeta from '~/components/IssueMeta.vue'
import EditorContent from '~/components/MarkdownEditor/EditorContent.vue'
import MarkdownEditor from '~/components/MarkdownEditor/MarkdownEditor.vue'
import userData from '~/data/comments'
import { currentUser } from '~/data/users'
</script>

<style lang="scss">
.issue-page {
  display: grid;
  grid-template-areas:
    'header  header  header  header'
    '.       title   title   .     '
    '.       main    aside   .     ';
  grid-template-columns: var(--grid-gutter) 3fr 1fr var(--grid-gutter);
  column-gap: 2rem;

  width: 100%;
  max-width: 100vw;
  padding-bottom: 5rem;
}

.issue-header {
  display: grid;
  grid-area: header;
  grid-template-areas: '. content .';
  grid-template-columns: var(--grid-gutter) auto var(--grid-gutter);
  column-gap: 2rem;

  width: 100%;
  padding: 1rem 0;

  &__content {
    grid-area: content;
  }
}

.issue-title {
  grid-area: title;

  margin-bottom: 2rem;
  padding: 1rem 0;

  border-top: solid 1px var(--color-secondary);
  border-bottom: solid 1px var(--color-secondary);
}

.issue-feed {
  display: flex;
  grid-area: main;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 1rem;
}

.issue-meta {
  grid-area: aside;
  border-radius: var(--border-radius);
}
</style>
