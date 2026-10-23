<template>
  <article
    class="relative w-full overflow-hidden rounded-[12px] card-border bg-white p-4 cursor-pointer
          transition-all duration-200 hover:border-primary/40"
    :class="[
      { 'px-6 py-5': selectable },
      selected ? 'border-primary/30' : '',
      property.statusVariant == 'warn' ? 'pointer-events-none' : '',
    ]"
    @click="selectable && toggleSelect()"
  >
    <!-- Selected indicator -->
    <div
      class="absolute left-0 top-0 h-full w-2 bg-primary transition-transform duration-200"
      :class="selected ? 'translate-x-0' : '-translate-x-full'"
    />

    <!-- Header -->
    <div class="flex items-center justify-between gap-3">
      <h3 class="text-[15px] font-semibold">№ {{ property.number }}</h3>

      <BaseStatusTag :text="property.statusText" :variant="property.statusVariant" solid/>
    </div>

    <!-- Address -->
    <p class="mt-5 text-[15px] text-[#414141]">
      {{ property.address }}
    </p>

    <!-- Price -->
    <div class="mt-3 flex items-end justify-between gap-3">
      <div>
        <p class="text-[13px] text-[#7A827E]">Стоимость объекта</p>
        <p class="text-[16px] font-semibold">
          {{ formatMoney(property.price) }} ₸
        </p>
      </div>

      <!-- Select -->
      <button
        v-if="selectable && property.statusVariant != 'warn'"
        type="button"
        class="flex size-6 shrink-0 items-center justify-center rounded-full border-2
              transition-all duration-200"
        :class="
          selected
            ? 'scale-100 border-primary bg-primary text-white'
            : 'scale-95 border-[#D0D3D1] bg-white hover:border-primary'
        "
        @click.stop="toggleSelect"
      >
        <Transition
          enter-active-class="transition duration-150"
          enter-from-class="scale-50 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-100"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-50 opacity-0"
        >
          <BaseIcon
            v-if="selected"
            name="mark-bold"
            class="icon-xs icon-white"
          />
        </Transition>
      </button>
    </div>

    <p
      v-if="property.statusDescription"
      class="mt-3 text-right text-[11px]"
      :class="property.statusVariant === 'warn' ? 'text-[#FF792E]' : 'text-[#7A827E]'"
    >
      {{ property.statusDescription }}
    </p>
  </article>
</template>

<script setup lang="ts">
import type { StatusTagVariant } from '@/types/Status'

export interface Property {
  id: number | string
  number: string
  address: string
  price: number
  statusText: string
  statusVariant?: StatusTagVariant
  statusDescription?: string
}

const props = withDefaults(defineProps<{
  property: Property
  selectable?: boolean
  selected?: boolean
}>(), {
  selectable: false,
  selected: false,
})

const emit = defineEmits<{
  'update:selected': [value: boolean]
  select: [property: Property, selected: boolean]
}>()

function toggleSelect() {
  const value = !props.selected
  emit('update:selected', value)
  emit('select', props.property, value)
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value)
}
</script>

<style scoped>
.indicator-enter-active,
.indicator-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.indicator-enter-from,
.indicator-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.check-enter-active,
.check-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.check-enter-from,
.check-leave-to {
  transform: scale(0.4) rotate(-30deg);
  opacity: 0;
}
</style>