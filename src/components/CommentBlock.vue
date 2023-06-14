<template>
  <div>
    <div>avatar</div>
    <div>comment
      <div>top bar
        <span>user name</span> commented <span>X ago</span>
        <div>owner</div>
      </div>
      <div>content</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
</script>

<script lang="ts">
export default defineComponent({
  name: 'CommentBlock',
})
</script>

<styles lang="scss"></styles>
