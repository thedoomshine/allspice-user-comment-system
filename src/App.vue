<template>
  <header class="app-header" aria-label="Website Navigation press left arrow to enter" dir="ltr"
    v-kbd-trap.roving.horizontal>
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

  <issue-page />
</template>

<script setup lang="ts">
// @ts-ignore
import { VueKeyboardTrapDirectiveFactory } from '@pdanpdan/vue-keyboard-trap'
import IssuePage from '~/components/IssuePage.vue'

const vKbdTrap = VueKeyboardTrapDirectiveFactory().directive
</script>

<style lang="scss">
:root {
  --grid-gutter: calc(25vw - 16rem);
  --border-radius: 0.35rem;
}
.app-header {
  display: grid;
  grid-template-columns: var(--grid-gutter) max-content auto var(--grid-gutter);
  align-items: center;

  width: 100%;
  padding: 0.25rem 2rem;

  line-height: 1.5;

  background-color: var(--color-header-bar);
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
  display: none;
  flex: 1 1 auto;
  gap: 0.35rem;
  align-items: center;
}

.nav-item {
  padding: 0.75rem 1rem;
  color: var(--color-text);
  white-space: nowrap;
  border-radius: var(--border-radius);
  &:hover {
    text-decoration: none;
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

@media only screen and (min-width: 1280px) {
  .nav-bar {
		display: flex;
	}
}
</style>
