import IssueMeta from '~/components/IssueMeta.vue'
<template>
  <aside class="issue-meta">
    <section class="meta-section">No Branch/Tag Specified</section>
    <section class="meta-section">
      <label>Labels</label>
    </section>
    <section class="meta-section">
      <label>Milestone</label>
    </section>
    <section class="meta-section">
      <label>Projects</label>
    </section>
    <section class="meta-section">
      <label>Assignees</label>
    </section>
    <section class="meta-section">
      <label>Participants</label>
    </section>
    <section class="meta-section">
      <label>Notifications</label>
    </section>
    <section class="meta-section">
      <label>Due Date</label>
    </section>
    <section class="meta-section">
      <label>Dependencies</label>
    </section>
    <section class="meta-section">
      <label>Reference</label>
    </section>
  </aside>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.issue-meta {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;

  height: max-content;
  padding: 0 1rem;

  background-color: var(--color-box-body);
  border: solid 1px var(--color-secondary);
}

.meta-section {
  padding: 1rem 0;

  label {
    font-weight: bold;
    opacity: var(--opacity-disabled);
  }
  & + .meta-section {
    border-top: solid 1px var(--color-secondary);
  }
}
</style>
