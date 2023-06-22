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
      <div
        class="issues"
        role="group"
      >
        <comment-content
          ariaRole="listitem"
          v-for="{ id, attachment, user, posted_at, markdown } in userComments"
          :key="id"
          :id="id"
          :user="user"
          :attachment="attachment"
          :markdown="markdown"
          :posted_at="posted_at"
          @submit="handleSubmit"
        />
      </div>

      <new-comment @submit="handleSubmit" />
    </div>
    <issue-meta class="issue-meta" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import CommentContent from '~/components/Comment/CommentContent.vue'
import NewComment from '~/components/Comment/NewComment.vue'
import IssueMeta from '~/components/IssueMeta.vue'
import { fetchComments } from '~/utils/commentsApiMethods'

const userComments = ref()

const handleSubmit = () => {
  userComments.value = fetchComments()
}

onMounted(() => {
  userComments.value = fetchComments()
})
</script>

<style lang="scss">
.issue-page {
  display: grid;
  grid-template-areas:
    'header  header  header  header'
    '.       title   title   .     '
    '.       main    main    .     '
    '.       aside   aside   .     ';
  grid-template-columns: var(--grid-gutter) 3fr 1fr var(--grid-gutter);
  row-gap: 1rem;
  column-gap: var(--column-gap);

  width: 100%;
  max-width: 100vw;
  padding-bottom: 5rem;
}

.issue-header {
  display: grid;
  grid-area: header;
  grid-template-areas: '. content .';
  grid-template-columns: var(--grid-gutter) auto var(--grid-gutter);
  column-gap: var(--column-gap);

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

.issue-feed,
.issues {
  display: flex;
  grid-area: main;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 2rem;
}

.issue-meta {
  grid-area: aside;
  border-radius: var(--border-radius);
}

@media only screen and (min-width: 1280px) {
  .issue-page {
    grid-template-areas:
      'header  header  header  header'
      '.       title   title   .     '
      '.       main    aside   .     ';
    row-gap: 0;
  }
}
</style>
