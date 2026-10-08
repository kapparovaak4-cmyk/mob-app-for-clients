
<template>
  <LoginFlow
    v-if="!auth.isAuthorized"
    @authorized="handleAuthorized"
  />

  <PinCodeScreen
    v-else
    ref="pinRef"
    :key="pinMode"
    :mode="pinMode"
    :user-name="auth.userName || 'Имя. Ф'"
    :loading="loading"
    :error="error"
    @complete="handlePin"
    @recover="recoverPin"
  />
</template>

<script setup lang="ts">
import LoginFlow from './LoginFlow.vue'
import PinCodeScreen from './PinCodeScreen.vue'
import { useAuthStore } from '@/store/auth.ts'

definePageMeta({ layout: 'empty', showHeader: false })

const auth = useAuthStore()
const { isAuthorized } = storeToRefs(auth)
const pinRef = ref<InstanceType<typeof PinCodeScreen> | null>(null)
const pinMode = ref<'create' | 'confirm' | 'enter'>('enter')
const firstPin = ref('')
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  await auth.initialize()
  pinMode.value = auth.hasPin ? 'enter' : 'create'
})

watch(() => isAuthorized.value, authorized => {
  if (authorized) pinMode.value = auth.hasPin ? 'enter' : 'create'
})

const handleAuthorized = () => {
  pinMode.value = auth.hasPin ? 'enter' : 'create'
}

const handlePin = async (pin: string) => {
  if (loading.value) return
  error.value = ''

  if (pinMode.value === 'create') {
    firstPin.value = pin
    pinMode.value = 'confirm'
    return
  }

  if (pinMode.value === 'confirm' && pin !== firstPin.value) {
    error.value = 'PIN-коды не совпадают'
    firstPin.value = ''
    pinMode.value = 'create'
    return
  }

  loading.value = true

  try {
    if (pinMode.value === 'confirm') {
      await auth.createPin(pin)
      firstPin.value = ''
    } else {
      await auth.verifyPin(pin)
    }

    auth.unlock()
    await navigateTo('/main', { replace: true })
  } catch {
    error.value = 'Неверный PIN-код или ошибка авторизации'
    pinRef.value?.reset()
  } finally {
    loading.value = false
  }
}

const recoverPin = async () => {
  // TODO: Start secure PIN recovery through eGov
  await auth.logout()
}
</script>
