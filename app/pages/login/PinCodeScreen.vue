
<template>
  <div class="flex h-dvh flex-col items-center bg-white px-6 pt-8 pb-10">
    <!-- User -->
    <div class="flex flex-col items-center">
      <div class="flex size-[60px] items-center justify-center rounded-full border-[6px] border-[#F3F4F6]">
        <BaseIcon name="logo" class="icon-lg" />
      </div>

      <h2 class="mt-4 text-[20px] font-semibold">
        {{ title }}
      </h2>
      <p class="mt-1 text-[13px] text-grey">{{ subtitle }}</p>
    </div>

    <!-- PIN indicators -->
    <div class="mt-7 flex flex-col items-center gap-3">
        <!-- First PIN (completed) -->
        <div v-if="mode === 'confirm'" class="flex items-center gap-4">
            <span
                v-for="i in 4"
                :key="i"
                class="size-[14px] rounded-full bg-primary"
            />
        </div>

        <!-- Current PIN -->
        <div class="flex items-center gap-4">
            <span
            v-for="i in 4"
            :key="i"
            class="size-[14px] rounded-full border transition-all duration-150"
            :class="i <= pin.length
                ? 'border-primary bg-primary'
                : 'border-[#E5E7EB] bg-[#F3F4F6]'"
            />
        </div>
    </div>

    <p v-if="error" class="mt-3 text-center text-[12px] text-red-500">
      {{ error }}
    </p>

    <!-- Numeric keypad -->
    <div class="mt-8 grid w-full max-w-[260px] grid-cols-3 justify-items-center gap-x-9 gap-y-5">
      <template v-for="key in keys" :key="key">
        <button
            v-if="key !== 'empty'"
            type="button"
            :disabled="loading"
            class="key-btn flex size-[75px] items-center justify-center rounded-full border border-[#E5E7EB]
                bg-[#F3F4F6] text-[26px] font-medium disabled:opacity-50"
            @pointerdown="animateKey"
            @click="pressKey(key)"
        >
            <BaseIcon v-if="key === 'backspace'" name="delete" class="icon-lg" />
            <span v-else>{{ key }}</span>
        </button>
        <span v-else />
      </template>
    </div>

    <button
      v-if="mode === 'enter'"
      type="button"
      class="mt-auto text-[12px] text-[#8A9290]"
      @click="emit('recover')"
    >
      Восстановить PIN-код
    </button>
  </div>
</template>

<script setup lang="ts">
type PinMode = 'create' | 'confirm' | 'enter'

const props = withDefaults(defineProps<{
  mode?: PinMode
  userName?: string
  loading?: boolean
  error?: string
}>(), {
  mode: 'enter',
  userName: 'Имя. Ф',
  loading: false
})

const emit = defineEmits<{
  complete: [pin: string]
  recover: []
}>()

const pin = ref('')
const keys = ['1','2','3','4','5','6','7','8','9','empty','0','backspace']

const title = computed(() => props.mode === 'enter' ? props.userName : 'PIN-код')
const subtitle = computed(() => ({
  create: 'Придумайте 4-значный PIN-код',
  confirm: 'Повторите PIN-код',
  enter: 'Введите код доступа'
})[props.mode])

const animateKey = (event: PointerEvent) => {
  const btn = event.currentTarget as HTMLButtonElement
  btn.classList.remove('key-pressed')
  void btn.offsetWidth
  btn.classList.add('key-pressed')
}

const pressKey = (key: string) => {
  if (props.loading) return
  if (key === 'backspace') {
    pin.value = pin.value.slice(0, -1)
    return
  }

  if (pin.value.length >= 4) return
  pin.value += key

  if (pin.value.length === 4) emit('complete', pin.value)
}

const reset = () => pin.value = ''

watch(() => props.mode, reset)
defineExpose({ reset })
</script>

<style scoped>
.key-pressed {
  animation: keyPress 200ms ease-out;
}

@keyframes keyPress {
  0% { transform: scale(1); background: #F3F4F6; }
  40% { transform: scale(0.9); background: #E5E7EB; }
  100% { transform: scale(1); background: #F3F4F6; }
}
</style>