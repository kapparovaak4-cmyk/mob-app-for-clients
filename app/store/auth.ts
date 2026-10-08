
import { defineStore } from 'pinia'

type PinMode = 'create' | 'confirm' | 'enter'

export const useAuthStore = defineStore('auth', () => {
  const isAuthorized = ref(false)
  const isUnlocked = ref(false)
  const hasPin = ref(false)
  const userName = ref('')

  const pinMode = computed<PinMode>(() => !hasPin.value ? 'create' : 'enter')

  const initialize = async () => {
    // TODO: Restore and verify the existing session with your backend.
    // isAuthorized.value = response.authorized
    // hasPin.value = response.hasPin
    // userName.value = response.userName
  }

  const onEgovApproved = async () => {
    // Call only after the backend has confirmed eGov approval
    // and established an authenticated session.
    isAuthorized.value = true
    isUnlocked.value = false
  }

  const verifyPin = async (pin: string) => {
    // TODO: Verify PIN using a secure backend endpoint
    // await $fetch('/api/auth/pin/verify', { method: 'POST', body: { pin } })
    // throw new Error('PIN verification API is not connected')
    
  }

  const createPin = async (pin: string) => {
    // TODO: Save PIN securely through your backend
    // await $fetch('/api/auth/pin', { method: 'POST', body: { pin } })
    // throw new Error('PIN creation API is not connected')

  }

  const unlock = () => {
    isUnlocked.value = true
  }

  const logout = async () => {
    // TODO: Revoke session on backend
    isAuthorized.value = false
    isUnlocked.value = false
    hasPin.value = false
    userName.value = ''
  }

  return {
    isAuthorized, isUnlocked, hasPin, userName, pinMode,
    initialize, onEgovApproved, verifyPin, createPin, unlock, logout
  }
})
