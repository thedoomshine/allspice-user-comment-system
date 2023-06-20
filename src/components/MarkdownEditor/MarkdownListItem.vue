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

// const props = withDefaults(
//   defineProps<{
//     disabled?: boolean
//   }>(),
//   {
//     disabled: true,
//   }
// )

const handleOnChange = () => {
  setAttrs({
    checked: !checked,
  })
}
</script>

<style lang="scss" scoped>
label {
  align-items: center;
  display: inline-flex;
  gap: 0.5rem;
}

input[type='checkbox'] {
  appearance: initial;
  width: 1.75em;
  height: 1.75em;
  display: grid;
  place-content: center;
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius);
  transform: translateY(-0.075em);
  color: currentColor;

  &::before {
    content: '';
    width: 1.5em;
    height: 1.5em;
    clip-path: polygon(28% 38%, 41% 53%, 75% 24%, 86% 38%, 40% 78%, 15% 50%);
    transform: scale(0);
    background-color: var(--color-primary);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus-visible {
    outline: max(2px, 0.15em) solid var(--color-primary);
    outline-offset: max(2px, 0.15em);
  }
}
</style>
