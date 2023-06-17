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
          <markdown-viewer :markdown="markdown" />
        </template>
      </comment-block>

      <markdown-editor
        :id="uuid"
        :user="currentUser"
        :markdown="`# yeag 🐰 🖤

![allspice](https://images.ctfassets.net/3s5io6mnxfqz/mRfZFyrCxr37N7kmOP9ws/0ceaa2bbaa53712a8107a33cbe6a2cbc/AdobeStock_193176677.jpeg?w=828)

**goth** *bitch* ***on patrol***

[link](https://allspice.io)

***

## level 2

>> you miss 100% of the shots you never take
>
> wayne gretzky
>
michael scott

> blockquote
>> blockquote blockquote
`"
      />
    </div>
    <issue-meta class="issue-meta" />
  </main>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'

import CommentBlock from '~/components/CommentBlock.vue'
import IssueMeta from '~/components/IssueMeta.vue'
import MarkdownEditor from '~/components/MarkdownEditor.vue'
import MarkdownViewer from '~/components/MarkdownViewer.vue'
import userData from '~/data/comments'
import { currentUser } from '~/data/users'

const uuid = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
  ('0' + (byte & 0xff).toString(16)).slice(-2)
).join('')
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
