<template>
  <label v-if="checked !== null">
    <input
      :checked="checked"
      @change="handleOnChange"
      class="checkbox"
      type="checkbox"
    />
    <span :ref="contentRef" />
  </label>
  <span
    v-else
    :ref="contentRef"
  />
</template>

<script setup lang="ts">
import { useNodeViewContext } from '@prosemirror-adapter/vue'

const { contentRef, node, setAttrs } = useNodeViewContext()
const attrs = node.value.attrs
const checked = attrs.checked

const handleOnChange = () => {
  setAttrs({
    checked: !checked,
  })
}
</script>

<style lang="scss" scoped>
label {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

input[type='checkbox'] {
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;

  width: 1.75em;
  height: 1.75em;

  color: currentColor;

  appearance: initial;
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius);

  &::before {
    content: '';

    transform: scale(0);

    width: 1.5em;
    height: 1.5em;

    background-color: var(--color-primary);
    clip-path: polygon(28% 38%, 41% 53%, 75% 24%, 86% 38%, 40% 78%, 15% 50%);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus-visible {
    border: solid 1px var(--color-primary);
    outline: 0;
  }
}
</style>
