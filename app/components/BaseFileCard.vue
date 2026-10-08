<template>
  <div class="flex items-center gap-4 rounded-[16px] bg-dark px-5 py-4">
    <div class="flex items-center gap-3">
        <BaseIcon name="file" class="icon-lg shrink-0 icon-white"/>

        <div class="min-w-0 flex-1">
            <p class="truncate text-[16px] font-semibold text-white">
                {{ name }}
            </p>

            <p v-if="description" class="text-[14px] text-[#E1E1E1]">
                {{ description }}
            </p>
        </div>
    </div>

    <button
      type="button"
      class="flex size-10 shrink-0 items-center justify-center icon-white"
      @click="$emit('download')"
    >
      <BaseIcon name="download" class="icon-md" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description?: string
}>()

defineEmits<{
  download: []
}>()
</script>