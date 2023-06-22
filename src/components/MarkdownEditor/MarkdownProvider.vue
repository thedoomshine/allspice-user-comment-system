<template>
  <milkdown-provider>
    <prosemirror-adapter-provider>
      <slot />
    </prosemirror-adapter-provider>
  </milkdown-provider>
</template>

<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'
</script>
