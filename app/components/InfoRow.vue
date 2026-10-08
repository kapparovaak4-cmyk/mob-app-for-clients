<template>
  <div class="flex items-start justify-between gap-4">
    <span class="text-[12px] text-[#8F95A3]">
      {{ label }}
    </span>

    <span
      class="text-right text-[12px] font-semibold text-[#242424]"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
}>()
</script>