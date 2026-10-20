
<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
        @click.self="close"
      >
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          class="w-full max-w-[320px] rounded-[14px] bg-white p-5 shadow-xl"
        >
          <p id="confirm-dialog-title" class="mb-3 text-[15px] font-bold leading-[20px] text-[#292D34]">
            {{ text }}
          </p>

          <div class="flex flex-col gap-1.5 mt-5">
            <BaseButton
              :text="confirmText"
              :loading="loading"
              :disabled="loading"
              block
              class="!min-h-[44px] !rounded-[10px] !text-[14px]"
              :class="variant === 'danger' ? '!bg-[#B15D60] hover:!bg-[#9F4F52]' : ''"
              @click="confirm"
            />

            <BaseButton
              :text="cancelText"
              variant="secondary"
              :disabled="loading"
              block
              class="!min-h-[44px] !rounded-[10px] !text-[14px]"
              @click="close"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  text?: string
  confirmText?: string
  cancelText?: string
  variant?: 'primary' | 'danger'
  loading?: boolean
}>(), {
  text: 'Вы уверены, что хотите продолжить?',
  confirmText: 'Подтвердить',
  cancelText: 'Отмена',
  variant: 'primary',
  loading: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

const close = () => {
  if (props.loading) return
  emit('update:modelValue', false)
  emit('cancel')
}

const confirm = () => {
  if (!props.loading) emit('confirm')
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-enter-active > div,
.dialog-leave-active > div {
  transition: transform 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from > div,
.dialog-leave-to > div {
  transform: scale(0.95);
}
</style>
