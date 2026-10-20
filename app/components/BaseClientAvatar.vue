<template>
    <div class="flex size-13 shrink-0 items-center justify-center rounded-full bg-[#DDF5EC]">
        <span class="text-[16px] font-semibold text-primary">
          {{ initials }}
        </span>
      </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const initials = computed(() =>
  props.name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)
</script>