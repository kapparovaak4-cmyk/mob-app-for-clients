
<template>
  <div class="absolute inset-0 z-30 flex items-center justify-center bg-[#111] px-8 text-center">
    <div>
      <p class="text-[16px] font-semibold text-white">
        Не удалось открыть камеру
      </p>

      <p class="mt-2 text-[13px] text-white/60">
        Разрешите доступ к камере в настройках приложения
      </p>

      <div class="flex flex-col">
        <BaseButton
          text="Перейти в настройки"
          class="mt-5"
          @click="openSettings"
        />

        <button
          class="mt-4 text-[13px] text-white/60"
          @click="emit('retry')"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  retry: []
}>()

function openSettings() {
  const flutter = (
    window as Window & {
      CameraSettings?: {
        postMessage: (message: string) => void
      }
    }
  ).CameraSettings

  if (flutter) {
    flutter.postMessage('open')
  }
  else {
    alert('Разрешите доступ к камере в настройках браузера')
  }
}
</script>