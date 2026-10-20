
<template>
  <div>
    <BaseInput
      v-model="iin"
      label="ИИН"
      mask="iin"
      masked
      placeholder="Введите ИИН"
      autocomplete="off"
      :error="error"
    />

    <BaseButton
      text="Продолжить"
      block
      variant="login"
      class="mt-3 !py-4"
      :loading="loading"
      @click="emit('continue', iin)"
    />

    <SecurityNotice class="bg-transparent !text-black/50">
      Мы используем данные только для входа и не храним их на устройстве
    </SecurityNotice>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
  error?: string
}>()

const emit = defineEmits<{
  continue: [iin: string]
}>()

const iin = defineModel<string>({ default: '' })
</script>
