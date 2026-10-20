<template>
  <div
    class="rounded-[20px] border border-[#E8EBE9] bg-white py-2 px-1.5 flex flex-col gap-[2px] items-center"
  >
    <template
      v-for="(item, index) in items"
      :key="item.title"
    >
      <HomeActionItem
        :title="item.title"
        :subtitle="item.subtitle"
        :icon="item.icon"
        :to="item.to"
        :variant="item.variant"
      />

      <div
        v-if="index < items.length - 1"
        class="mx-2 h-px bg-[#ECEFEC] w-[92%]"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
export interface HomeMenuItem {
  title: string
  subtitle?: string
  icon: string
  to: string
  variant?: 'default' | 'gradient'
}

defineProps<{
  items: HomeMenuItem[]
}>()
</script>