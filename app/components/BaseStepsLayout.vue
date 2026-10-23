<template>
  <div class="flex h-dvh flex-col bg-[#F7F9F8]">
    <template v-if="!done">
      <!-- Header -->
      <header class="shrink-0 px-3 pt-4 pb-3">
        <div class="flex items-center justify-between">
          <div class="bg-white p-2 rounded-full border border-[#F2F2F2] clickable" @click="handleBack">
            <BaseIcon name="arrow-left" class="icon-md hover:opacity-80 cursor-pointer"/>
          </div>

          <div class="min-w-0 flex-1 px-3">
            <p class="text-[12px] font-normal uppercase text-primary">
              ШАГ {{ currentStep + 1 }} ИЗ {{ steps.length }}
            </p>
            <p class="truncate text-[18px]/[18px] font-semibold">
              {{ currentStepData?.title }}
            </p>
          </div>

          <div class="bg-white p-2 rounded-full border border-[#F2F2F2] clickable" @click="$emit('close')">
            <BaseIcon name="close" class="icon-danger icon-md hover:opacity-80 cursor-pointer"/>
          </div>
        </div>

        <div class="mt-4 flex gap-1.5">
          <div
            v-for="(_, index) in steps"
            :key="index"
            class="h-[4px] flex-1 rounded-full transition-colors duration-300"
            :class="index <= currentStep ? 'bg-primary' : 'bg-[#DDE5E1]'"
          />
        </div>
      </header>

      <!-- Content -->
      <main class="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        <slot :step="currentStep" :step-data="currentStepData" />
      </main>

      <!-- Footer -->
      <footer class="shrink-0 border-t border-[#E5E8E6] bg-white p-4">
        <BaseButton
          :text="nextButtonText"
          :disabled="disabled || loading"
          :icon="nextIcon"
          icon-position="right"
          class="w-full !justify-between"
          icon-class="icon-white icon-md"
          @click="$emit('next')"
        />
      </footer>
    </template>

    <!-- Done -->
    <slot v-else name="done" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'

export interface Step {
  title: string
  [key: string]: any
}

const props = withDefaults(defineProps<{
  steps: Step[]
  currentStep: number
  nextText?: string
  disabled?: boolean
  loading?: boolean
  nextIcon?: string
  done?: boolean
}>(), {
  nextText: 'Продолжить',
  nextIcon: 'arrow-right',
  disabled: false,
  loading: false,
  done: false,
})

const emit = defineEmits<{
  next: []
  back: []
  close: []
  'update:currentStep': [step: number]
}>()

const route = useRoute()
const router = useRouter()

const currentStepData = computed(() => props.steps[props.currentStep])
const nextDisabled = computed(() => props.disabled)
const nextButtonText = computed(() => props.nextText || 'Далее')

const getStepFromHash = () => {
  const step = Number(route.hash.replace('#step-', '')) - 1
  return step >= 0 && step < props.steps.length ? step : 0
}

onMounted(() => {
  emit('update:currentStep', getStepFromHash())
})

watch(() => props.currentStep, step => {
  router.replace({ hash: `#step-${step + 1}` })
})

watch(() => route.hash, () => {
  const step = getStepFromHash()
  if (step !== props.currentStep) emit('update:currentStep', step)
})

const handleBack = () => {
  if (props.currentStep > 0) emit('back')
  else emit('close')
}
</script>