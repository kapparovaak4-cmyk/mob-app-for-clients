<template>
  <section class="rounded-[20px] card-border bg-white p-4">
    <p v-if="title" class="mb-3 text-[13px] font-normal uppercase text-[#8F95A3]">
      {{ title }}
    </p>

    <div class="flex flex-col">
      <BaseDocumentItem
        v-for="document in documents"
        :key="document.id"
        :document="document"
        :size="size"
        @open="$emit('open', $event)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RequestDocument } from './BaseDocumentItem.vue'

withDefaults(defineProps<{
  title?: string
  size?: 'sm' | 'md'
  documents: RequestDocument[]
}>(), {
  size: 'sm',
})

defineEmits<{
  open: [document: RequestDocument]
}>()
</script>