<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100]"
      >
        <!-- Optional backdrop -->
        <div
          v-if="backdrop"
          class="absolute inset-0 bg-black/20"
          @click="close"
        />

        <!-- Sheet -->
        <div
          ref="sheetRef"
          class="
            absolute inset-x-0 bottom-0
            mx-auto w-full max-w-[430px]
            rounded-t-[28px] bg-white
            px-5 pt-6
            pb-[max(20px,env(safe-area-inset-bottom))]
            will-change-transform
          "
          :style="sheetStyle"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >

        <div class="flex justify-between gap-1 items-start">
          <!-- Drag handle -->
          <div
            v-if="showHandle"
            class="mb-4 flex justify-center"
          >
            <div class="h-1 w-10 rounded-full bg-[#D9DDDB]" />
          </div>

          <div class="mb-5">
            <h2 class="text-[18px] font-bold text-[#252927]">
              {{ title }}
            </h2>

            <p
              class="mt-1 max-w-[310px] text-balanced text-[13px] leading-[16px] text-[#8F95A3]"
            >
              {{ subtitle }}
            </p>
          </div>
          <base-icon name="close" class="text-[#000] opacity-70 hover:opacity-60 cursor-pointer" @click="close"/>
        </div>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    backdrop?: boolean
    showHandle?: boolean
    closeThreshold?: number
    title?: string
    subtitle?: string
  }>(),
  {
    backdrop: false,
    showHandle: false,
    closeThreshold: 80,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const sheetRef = ref<HTMLElement | null>(null)

const startY = ref(0)
const currentY = ref(0)
const dragging = ref(false)

const dragOffset = computed(() => {
  if (!dragging.value) return 0

  return Math.max(0, currentY.value - startY.value)
})

const sheetStyle = computed(() => ({
  transform: `translateY(${dragOffset.value}px)`,
  transition: dragging.value
    ? 'none'
    : 'transform 250ms ease',
}))

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function onTouchStart(event: TouchEvent) {
  const touch = event.touches[0]

  if (!touch) return

  startY.value = touch.clientY
  currentY.value = touch.clientY
  dragging.value = true
}

function onTouchMove(event: TouchEvent) {
  const touch = event.touches[0]

  if (!touch) return

  currentY.value = touch.clientY
}

function onTouchEnd() {
  const distance = currentY.value - startY.value

  dragging.value = false

  if (distance >= props.closeThreshold) {
    close()
  }

  startY.value = 0
  currentY.value = 0
}
</script>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: transform 0.25s ease;
}

.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(100%);
}
</style>