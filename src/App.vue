<script setup lang="ts">
import CommentEditor from './components/CommentEditor.vue'
</script>

<template>
  <header>
    <a
      href="#"
      class="nav-item logo"
    >
      <img
        alt="Allspice"
        class="logo"
        src="./assets/logo.svg"
      />
    </a>
    <nav class="nav-bar">
      <a
        href="#"
        class="nav-item nav-item__left"
      >
        Explore
      </a>
      <a
        href="#"
        class="nav-item nav-item__left"
      >
        Help
      </a>
      <a
        href="#"
        class="nav-item nav-item__right"
      >
        Register
      </a>

      <a
        href="#"
        class="nav-item nav-item__right"
      >
        Sign in
      </a>
    </nav>
  </header>

  <main>
    <comment-editor />
  </main>
</template>

<style lang="scss">
header {
  display: grid;
  align-items: center;
  grid-template-columns: calc(25vw - 16rem) max-content auto calc(25vw - 16rem);
  background-color: var(--color-header-bar);
  line-height: 1.5;
  padding: 0.25rem 1rem;
  width: 100%;
  border-bottom: 1px solid var(--color-secondary);
}

.logo {
  grid-column: 2;
  svg {
    width: 2rem;
    height: 2rem;
  }
}

.nav-bar {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 0.35rem;
}

.nav-item {
  border-radius: 0.35rem;
  padding: 0.75rem 1rem;
  white-space: nowrap;
  &:hover {
    background: var(--color-hover);
  }
  &__left {
    margin-left: 0;
  }
  &__right {
    margin-right: 0;
  }

  &__left + &__right {
    margin-left: auto;
  }
}
</style>
