<template>
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { defineComponent } from 'vue'

const editor = useEditor({
  content: `<p>I'm running Tiptap with Vue.js. 🎉</p>`,
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'CommentEditor',
})
</script>

<styles></styles>
