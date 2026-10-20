
<template>
  <div class="w-full">
    <label v-if="label" class="mb-2 block text-[13px] font-semibold">
      {{ label }}
    </label>

    <div
      class="relative flex h-[56px] items-center gap-2.5 rounded-[14px] border bg-[#F7F9F8] px-4 transition-colors"
      :class="isFocused ? 'border-primary' : 'border-[#DCE5E0]'"
      @click="focusInput"
    >
      <div v-for="i in length" :key="i"
        class="flex size-[13px] items-center justify-center">
        <span
          class="size-[9px] rounded-full border transition-colors"
          :class="modelValue[i - 1] ? 'border-[#333] bg-[#333]' : 'border-[#DCE5E0] bg-white'"
        />
      </div>

      <input
        ref="inputRef"
        :value="modelValue"
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        :maxlength="length"
        :disabled="disabled"
        class="absolute inset-0 size-full cursor-text opacity-0"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string
  label?: string
  length?: number
  disabled?: boolean
}>(), {
  length: 4,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  complete: [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

const focusInput = () => {
  if (!props.disabled) inputRef.value?.focus()
}

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '').slice(0, props.length)

  input.value = value
  emit('update:modelValue', value)
  if (value.length === props.length) {
    emit('complete', value)
    input.blur()
  }
}

defineExpose({ focus: focusInput })
</script>
