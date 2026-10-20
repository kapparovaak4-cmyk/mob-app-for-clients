<template>
  <button
    type="button"
    class="flex w-full items-center gap-3 text-left"
    :class="size === 'md' ? 'py-3' : 'py-2'"
    @click="$emit('open', document)"
  >
    <div
      class="flex shrink-0 items-center justify-center rounded-[7px] bg-[#F1F6FF]"
      :class="size === 'md' ? 'size-11' : 'size-9'"
    >
      <BaseIcon
        name="doc"
        :custom-class="size === 'md' ? 'icon-big icon-blue' : 'icon-md icon-blue'"
      />
    </div>

    <div class="min-w-0 flex-1">
      <p
        class="truncate font-medium text-[#242424]"
        :class="size === 'md' ? 'text-[16px]/[17px]' : 'text-[12px]'"
      >
        {{ document.name }}
      </p>

      <p
        class="mt-0.5 text-[#8F95A3]"
        :class="size === 'md' ? 'text-[12px]' : 'text-[10px]'"
      >
        {{ document.size }} • {{ document.type }}
      </p>
    </div>

    <BaseIcon
      name="back"
      :custom-class="`shrink-0 rotate-180 icon-blue ${size === 'md' ? 'icon-md' : 'icon-sm'}`"
    />
  </button>
</template>

<script setup lang="ts">
export interface RequestDocument {
  id: number | string
  name: string
  size: string
  type: string
  url: string
}

withDefaults(defineProps<{
  document: RequestDocument
  size?: 'sm' | 'md'
}>(), {
  size: 'sm',
})

defineEmits<{
  open: [document: RequestDocument]
}>()
</script>