<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :aria-label="ariaLabel || (iconOnly ? text : undefined)"
    class="inline-flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer"
    :class="[
      variantClasses,
      sizeClasses,
      {
        'w-full': block,
        'cursor-not-allowed': isDisabled,
        '!rounded-full': rounded,
        '!px-1 !min-h-8 !min-w-8': variant == 'icon',
      },
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Loading -->
    <span
      v-if="loading"
      class="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent"
      aria-hidden="true"
    />

    <template v-else>
      <!-- Left icon -->
      <BaseIcon
        v-if="icon && iconPosition === 'left'"
        :name="icon"
        :class="['icon-sm', iconClass]"
      />

      <!-- Text -->
      <span v-if="text && !iconOnly">
        {{ text }}
      </span>

      <!-- Right icon -->
      <BaseIcon
        v-if="icon && iconPosition === 'right' && !iconOnly"
        :name="icon"
        :class="['icon-sm', iconClass]"
      />
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'icon'
  | 'logout'
  | 'login'

type ButtonSize =
  | 'sm'
  | 'md'
  | 'lg'

interface Props {
  text?: string
  icon?: string

  variant?: ButtonVariant
  size?: ButtonSize

  iconOnly?: boolean
  iconPosition?: 'left' | 'right'

  loading?: boolean
  disabled?: boolean
  block?: boolean
  rounded?: boolean

  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string

  iconClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  iconPosition: 'left',
  loading: false,
  disabled: false,
  block: false,
  rounded: false,
  iconOnly: false,
  type: 'button',
  iconClass: 'icon-sm',
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const isDisabled = computed(() =>
  props.disabled || props.loading
)

const variantClasses = computed(() => {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:opacity-80 disabled:bg-[#6DBB9F] disabled:text-white',
    secondary: 'border border-[#DCE3DF] bg-[#F8FAF9] text-[#242424] hover:bg-[#F1F4F2] disabled:opacity-60',
    ghost: 'bg-transparent text-[#242424] hover:bg-[#F5F5F5] disabled:opacity-50',
    icon: 'bg-[#F5F5F5] text-[#A4A4A4] hover:bg-[#EBEBEB] disabled:opacity-50',
    logout: 'bg-[#EDEDED] border border-[#C4C4C4] text-[#505050] hover:bg-[#E5E5E5] disabled:opacity-80',
    login: 'bg-primary-linear-button border border-[#C4C4C4] text-[#F5F5F5] hover:bg-[#E5E5E5] disabled:opacity-80',
  }

  return variants[props.variant]
})

const sizeClasses = computed(() => {
  if (props.iconOnly) {
    const iconSizes: Record<ButtonSize, string> = {
      sm: 'h-7 w-7 rounded-lg',
      md: 'h-10 w-10 rounded-xl',
      lg: 'h-12 w-12 rounded-xl',
    }

    return iconSizes[props.size]
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'min-h-10 rounded-[10px] px-4 text-[14px] font-semibold',
    md: 'min-h-12 rounded-[10px] px-5 text-[16px] font-semibold',
    lg: 'min-h-14 rounded-[10px] px-6 text-[18px] font-semibold',
  }

  return sizes[props.size]
})
</script>