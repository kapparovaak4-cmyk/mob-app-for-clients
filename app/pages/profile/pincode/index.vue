
<template>
  <div class="flex flex-col gap-2.5">
    <div class="text-page-hint">
      Используйте 4 цифры, которые знаете только вы
    </div>

    <div class="card-border rounded-[12px] bg-white p-4">
      <div class="flex flex-col gap-4">
        <BasePinCodeInput
          v-model="currentPin"
          label="Текущий PIN-код"
        />

        <BasePinCodeInput
          v-model="newPin"
          label="Новый PIN-код"
        />

        <BasePinCodeInput
          v-model="confirmPin"
          label="Повторите новый PIN-код"
          @complete="save"
        />
      </div>
    </div>

    <SecurityNotice>
      Не используйте дату рождения или одинаковые цифры.
    </SecurityNotice>

    <p v-if="error" class="px-1 text-[13px] text-red-500">
      {{ error }}
    </p>

    <BaseButton
      text="Сохранить PIN-код"
      :disabled="disabled || loading"
      @click="save"
    />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  headerTitle: 'Смена PIN-кода',
  backPath: '/profile'
})

const currentPin = ref('')
const newPin = ref('')
const confirmPin = ref('')
const loading = ref(false)
const error = ref('')

const disabled = computed(() =>
  currentPin.value.length !== 4 ||
  newPin.value.length !== 4 ||
  confirmPin.value.length !== 4 ||
  newPin.value !== confirmPin.value ||
  newPin.value === currentPin.value ||
  /^(\d)\1{3}$/.test(newPin.value)
)

watch([currentPin, newPin, confirmPin], () => error.value = '')

const save = async () => {
  if (disabled.value || loading.value) return

  loading.value = true
  error.value = ''

  try {
    // TODO: Replace with your API endpoint
    // await $fetch('/api/profile/pin', {
    //   method: 'PUT',
    //   body: {
    //     currentPin: currentPin.value,
    //     newPin: newPin.value
    //   }
    // })

    // Clear PINs after successful API response
    // currentPin.value = ''
    // newPin.value = ''
    // confirmPin.value = ''
  } catch (e) {
    error.value = 'Не удалось изменить PIN-код'
  } finally {
    loading.value = false
  }
}
</script>
