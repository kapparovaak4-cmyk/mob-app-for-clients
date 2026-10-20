
<template>
  <div class="relative flex h-dvh flex-col overflow-hidden bg-[#F7F9F8]">
    <!-- Background -->
    <div
      class="absolute inset-x-0 top-0 bg-[linear-gradient(120deg,#0D1822,#064D36)] transition-all duration-700 ease-in-out"
      :class="step === 'splash' ? 'h-full' : 'h-[180px]'"
    />

    <!-- Logo -->
    <div
      class="absolute inset-x-0 z-10 flex items-center justify-center transition-all duration-700 ease-in-out"
      :class="step === 'splash' ? 'top-1/2 -translate-y-1/2' : 'top-[32px]'"
    >
      <div class="flex flex-col items-center gap-1">
        <BaseIcon name="logo-white" custom-class="h-[32px]" />

        <Transition name="fade">
          <p v-if="step !== 'splash'" class="text-[13px] text-white/80">
            Вход в приложение
          </p>
        </Transition>
      </div>
    </div>

    <!-- Steps -->
    <Transition name="slide-up">
      <div
        v-if="step !== 'splash'"
        class="absolute inset-x-0 top-[112px] bottom-0 z-20 flex flex-col rounded-t-[16px] bg-[#F7F9F8] px-4 pt-6 pb-8"
      >
        <Transition name="step-fade" mode="out-in">
          <LoginStep
            v-if="step === 'login'"
            v-model="iin"
            :loading="loading"
            :error="error"
            @continue="continueLogin"
          />

          <WaitingStep
            v-else-if="step === 'waiting'"
            :error="error"
            @open-egov="openEgov"
          />
        </Transition>

        <!-- Help -->
        <button
          type="button"
          class="card-border mt-auto flex min-h-[52px] w-full items-center gap-2 rounded-[12px] bg-white px-4 text-left"
          @click="isHelpOpen = true"
        >
          <BaseIcon name="question" class="icon-sm icon-green" />
          <span class="text-[14px] font-medium">Нужна помощь?</span>
        </button>
      </div>
    </Transition>
  </div>

  <HelpDeskInfo v-model="isHelpOpen" />
</template>

<script setup lang="ts">
import HelpDeskInfo from './HelpDeskInfo.vue'
import LoginStep from './LoginStep.vue'
import WaitingStep from './WaitingStep.vue'

definePageMeta({
  layout: 'empty',
  showHeader: false,
})

type LoginStepType = 'splash' | 'login' | 'waiting'

const step = ref<LoginStepType>('splash')
const iin = ref('')
const error = ref('')
const loading = ref(false)
const isHelpOpen = ref(false)

let splashTimer: ReturnType<typeof setTimeout>

onMounted(() => {
  splashTimer = setTimeout(() => step.value = 'login', 1500)
})

onUnmounted(() => clearTimeout(splashTimer))
watch(iin, () => error.value = '')

const continueLogin = async (value: string) => {
  if (value.length !== 12 || loading.value) return

  loading.value = true
  error.value = ''

  try {
    // TODO: Start authentication API
    // const response = await $fetch('/api/auth/start', {
    //   method: 'POST',
    //   body: { iin: value }
    // })

    step.value = 'waiting'
    // startPolling(response.requestId)
  } catch {
    error.value = 'Не удалось выполнить вход. Попробуйте снова.'
  } finally {
    loading.value = false
  }
}

const openEgov = () => {
  // TODO: Open verification URL returned by API
}

const onAuthSuccess = async () => {
  await navigateTo('/main', { replace: true })
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

.slide-up-enter-active { transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease; }
.slide-up-enter-from { transform: translateY(100%); opacity: 0; }

.fade-enter-active { transition: opacity 0.5s ease 0.3s; }
.fade-enter-from { opacity: 0; }

.step-fade-enter-active, .step-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.step-fade-enter-from { opacity: 0; transform: translateY(8px); }
.step-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
