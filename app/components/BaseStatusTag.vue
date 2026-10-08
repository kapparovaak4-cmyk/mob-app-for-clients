<template>
  <div
    class="inline-flex min-w-0 items-center gap-2 rounded-full border px-2.5 py-1 text-[14px] leading-none"
    :class="variantClasses"
  >
    <span
      v-if="showDot && !solid"
      class="h-[6px] w-[6px] shrink-0 rounded-full"
      :class="dotClass"
    />

    <span class="truncate" :class="solid ? 'font-semibold py-0.5' : ''">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StatusTagVariant } from "@/types/Status"

interface Props {
  text: string
  variant?: StatusTagVariant
  showDot?: boolean
  solid?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  showDot: true,
  solid: false,
})

const variantClasses = computed(() => {
  const variants: Record<StatusTagVariant, string> = props.solid
    ? {
        info: 'border-transparent bg-[#E7F0FE] text-[#0869F1]',
        success: 'border-transparent bg-[#DDF5EC] text-[#079669]',
        warn: 'border-transparent bg-[#FFF2D8] text-[#F59E0B]',
        danger: 'border-transparent bg-[#FBE5E5] text-[#DC2626]',
        neutral: 'border-transparent bg-[#EEEEEE] text-[#707070]',
      }
    : {
        info: 'border-[#E4E7EB] text-[#0869F1]',
        success: 'border-[#E4E7EB] text-[#079669]',
        warn: 'border-[#E4E7EB] text-[#F59E0B]',
        danger: 'border-[#E4E7EB] text-[#DC2626]',
        neutral: 'border-[#E4E7EB] text-[#707070]',
      }

  return variants[props.variant]
})

const dotClass = computed(() => {
  const variants: Record<StatusTagVariant, string> = {
    info: 'bg-[#0869F1]',
    success: 'bg-[#079669]',
    warn: 'bg-[#F59E0B]',
    danger: 'bg-[#DC2626]',
    neutral: 'bg-[#707070]',
  }

  return variants[props.variant]
})
</script>