
<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="mb-2 ml-[4px] block text-[13px] font-semibold text-[#333]">
      {{ label }}
    </label>

    <input
      :id="inputId"
      :value="displayValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="mask === 'iin' ? 12 : maxlength"
      :inputmode="mask === 'iin' ? 'numeric' : undefined"
      :autocomplete="autocomplete"
      class="h-[58px] w-full rounded-[12px] border bg-[#F7F9F8] px-4 text-[16px] text-[#292D34] outline-none transition-colors placeholder:text-[#A4AAA7]"
      :class="[
        error ? 'border-red-500 focus:border-red-500' : 'border-[#D7D1D1] focus:border-primary',
        disabled ? 'cursor-not-allowed opacity-60' : ''
      ]"
      @input="handleInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <p v-if="error" class="mt-1.5 text-[12px] text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  type?: string
  mask?: 'iin'
  masked?: boolean
  error?: string
  disabled?: boolean
  maxlength?: number
  autocomplete?: string
}>(), {
  modelValue: '',
  type: 'text',
  masked: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = useId()
const isFocused = ref(false)

const displayValue = computed(() => {
  const value = props.modelValue || ''

  if (props.mask === 'iin' && props.masked && !isFocused.value && value.length === 12) {
    return `${value.slice(0, 6)}••••${value.slice(-2)}`
  }

  return value
})

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value

  if (props.mask === 'iin') value = value.replace(/\D/g, '').slice(0, 12)

  input.value = value
  emit('update:modelValue', value)
}
</script>
