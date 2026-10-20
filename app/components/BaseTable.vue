<template>
  <div class="overflow-hidden rounded-[14px] bg-white">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead class="bg-[#EEF2F0]">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="whitespace-nowrap px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#747D79]"
              :class="column.class"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in visibleItems"
            :key="item[itemKey] ?? index"
            class="border-b border-[#E8ECEA]"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="whitespace-nowrap px-4 py-4 text-[13px] text-[#353A38]"
              :class="column.cellClass"
            >
              {{ item[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Show all -->
    <button
      v-if="hasMore && !expanded"
      class="w-full border-t border-[#E8ECEA] py-4 text-[14px] font-medium text-primary"
      @click="expanded = true"
    >
      {{ showAllText || `Показать все ${items.length}` }}
    </button>

    <!-- Floating collapse -->
    <Teleport to="body">
      <button
        v-if="hasMore && expanded"
        class="fixed right-4 bottom-24 z-50 flex items-center gap-1.5 rounded-full bg-[#0D1822] px-4 py-2.5 text-[13px] font-normal text-white/90 shadow-lg"
        @click="collapse"
      >
        Скрыть таблицу
        <BaseIcon name="collapse-2" class="icon-sm icon-white" />
      </button>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  columns: {
    label: string
    key: string
    class?: string
    cellClass?: string
  }[]
  items: Record<string, any>[]
  itemKey?: string
  limit?: number
  showAllText?: string
}>(), {
  itemKey: 'id',
})

const expanded = ref(false)

const hasMore = computed(() =>
  !!props.limit && props.items.length > props.limit
)

const visibleItems = computed(() =>
  props.limit && !expanded.value
    ? props.items.slice(0, props.limit)
    : props.items
)

const collapse = () => {
  expanded.value = false
}
</script>