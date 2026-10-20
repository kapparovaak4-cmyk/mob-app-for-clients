<template>
  <section
    class="rounded-[20px] card-border bg-white px-4 py-4"
  >
    <!-- Header -->
    <button
      type="button"
      class="flex w-full items-center justify-between"
      @click="isOpen = !isOpen"
    >
      <span class="text-[14px] font-semibold text-[#242424]">
        История изменения статусов
      </span>

      <BaseIcon
        name="down"
        custom-class="icon-xs icon-dark transition-transform duration-200"
        :class="{
          '!rotate-180': !isOpen,
        }"
      />
    </button>

    <!-- Timeline -->
    <div
      v-if="isOpen"
      class="mt-4"
    >
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="relative flex min-h-[40px] gap-3"
      >
        <!-- Timeline -->
        <div
          class="relative flex w-2 shrink-0 justify-center"
        >
          <div
            v-if="index < items.length - 1"
            class="absolute left-1/2 top-[8px] h-full w-px -translate-x-1/2 bg-[#D9DDDA]"
          />

          <span
            class="relative z-10 mt-[5px] size-[9px] shrink-0 rounded-full"
            :class="getDotClass(item.status)"
          />
        </div>

        <!-- Label -->
        <p
          class="pb-4 text-[14px]"
          :class="getTextClass(item.status)"
        >
          {{ item.label }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export type HistoryStatus =
  | 'completed'
  | 'current'
  | 'pending'

export interface HistoryItem {
  id: number | string
  label: string
  status: HistoryStatus
}

defineProps<{
  items: HistoryItem[]
}>()

const isOpen = ref(true)

function getDotClass(status: HistoryStatus) {
  switch (status) {
    case 'completed':
      return 'bg-[#088B55]'

    case 'current':
      return 'bg-[#F59E0B]'

    default:
      return 'bg-[#A8AFB5]'
  }
}

function getTextClass(status: HistoryStatus) {
  switch (status) {
    case 'completed':
      return 'text-[#555B58] font-medium'

    case 'current':
      return 'text-orange font-medium'

    default:
      return 'text-[#B4BABE]'
  }
}
</script>