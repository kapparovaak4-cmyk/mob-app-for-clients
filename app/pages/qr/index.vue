<template>
  <div class="fixed inset-0 z-50 bg-[#111]">
    <div class=" relative mx-auto h-dvh w-full overflow-hidden bg-black">
      <div v-if="cameraLoading && !cameraError" class="absolute z-10 inset-0 size-full bg-black"></div>
      <video
        ref="videoRef"
        autoplay
        muted
        playsinline
        class="absolute inset-0 size-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40" />

      <!-- <CameraLoading v-if="cameraLoading && !cameraError" /> -->
      <CameraError v-if="cameraError" @retry="startCamera" />

      <header class="absolute inset-x-0 top-0 z-20 flex h-[72px] items-center justify-center px-5">
        <h1 class="text-[16px] font-semibold text-white">
          Подписание через QR
        </h1>

        <button
          type="button"
          aria-label="Закрыть"
          class="absolute right-5 flex size-9 items-center justify-center rounded-full bg-white/15
            cursor-pointer hover:bg-white/20 backdrop-blur-sm"
          @click="close"
        >
          <BaseIcon
            name="close"
            custom-class="icon-sm icon-white"
          />
        </button>
      </header>

      <!-- Scanner content -->
      <main class="absolute inset-x-0 top-[120px] z-20 flex flex-col items-center">
        <!-- Logo -->
        <div class="flex items-center gap-1.5 text-white">
          <BaseIcon
            name="logo-white"
            custom-class="h-[27px]"
          />
        </div>

        <!-- Scanner -->
        <div class="relative mt-6 size-[230px] qr-container rounded-[26px]">
          <!-- Corners -->
          <span class="absolute left-0 top-0 size-[60px] rounded-tl-[26px] border-l-2 border-t-2 border-white" />
          <span class="absolute right-0 top-0 size-[60px] rounded-tr-[26px] border-r-2 border-t-2 border-white" />
          <span class="absolute bottom-0 left-0 size-[60px] rounded-bl-[26px] border-b-2 border-l-2 border-white" />
          <span class=" absolute bottom-0 right-0 size-[60px] rounded-br-[26px] border-b-2 border-r-2 border-white" />

          <!-- Scanning line -->
          <div class="scan-line absolute left-0 top-1/2 h-[2px] w-full
            bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)] blur-xs"/>
        </div>

        <!-- Flashlight -->
        <button
          type="button"
          class="
            mt-5 flex items-center gap-1.5 rounded-full
            bg-white/15 px-3 py-2
            text-[12px] text-white
            backdrop-blur-md cursor-pointer hover:bg-white/20
          "
          :class="{
            '!bg-[var(--color-primary)]': torchEnabled,
          }"
          @click="toggleTorch"
        >
          <BaseIcon
            name="flashlight"
            custom-class="icon-xs icon-white"
          />

          Фонарик
        </button>
      </main>

      <!-- How it works -->
      <button
        type="button"
        class="
          absolute bottom-8 left-1/2 z-20
          -translate-x-1/2 whitespace-nowrap
          text-[12px] text-white
        "
        @click="instructionsOpen = true"
      >
        Как это работает?
      </button>

      <!-- Instructions sheet -->
      <QrInstructionsSheet v-model="instructionsOpen" />
    </div>
  </div>
</template>

<script setup lang="ts">
import QrInstructionsSheet from "@/components/qr/QrInstructionsSheet.vue"
import CameraError from "@/components/qr/CameraError.vue"

const router = useRouter()
const videoRef = ref<HTMLVideoElement | null>(null)

const instructionsOpen = ref(false)
const cameraError = ref(false)
const torchEnabled = ref(false)

let stream: MediaStream | null = null
let videoTrack: MediaStreamTrack | null = null
const cameraLoading = ref(true)

async function startCamera() {
  stopCamera()
  cameraLoading.value = true
  cameraError.value = false

  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Camera API is not available')
    }

    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    })

    videoTrack = stream.getVideoTracks()[0] ?? null

    if (!videoRef.value) {
      throw new Error('Video element is not available')
    }

    videoRef.value.srcObject = stream
    await videoRef.value.play()

    console.log('Camera started:', videoTrack?.getSettings())
  }
  catch (error) {
    console.error('Camera error:', error)
    stopCamera()
    cameraError.value = true
  } finally {
    cameraLoading.value = false
  }
}

function stopCamera() {
  stream?.getTracks().forEach((track) => track.stop())

  stream = null
  videoTrack = null
  torchEnabled.value = false

  if (videoRef.value) {
    videoRef.value.srcObject = null
  }
}

async function toggleTorch() {
    torchEnabled.value = !torchEnabled.value
  if (!videoTrack) return

  try {
    const capabilities =
      videoTrack.getCapabilities?.() as MediaTrackCapabilities & {
        torch?: boolean
      }

    if (!capabilities?.torch) {
      console.warn('Torch is not supported on this device')
      return
    }

    const enabled = !torchEnabled.value

    await videoTrack.applyConstraints({
      advanced: [
        {
          torch: enabled,
        } as MediaTrackConstraintSet,
      ],
    })

    torchEnabled.value = enabled
  }
  catch (error) {
    console.error('Torch error:', error)
  }
}

function close() {
  stopCamera()

  if (window.history.length > 1) {
    router.back()
  }
  else {
    navigateTo('/')
  }
}

onMounted(() => {
  startCamera()
})

onBeforeUnmount(() => {
  stopCamera()
})
</script>

<style scoped>
.scan-line {
  animation: scan 2.5s ease-in-out infinite;
}

@keyframes scan {
  0%,
  100% {
    top: 15%;
    opacity: 0.5;
  }

  50% {
    top: 85%;
    opacity: 1;
  }
}

.sheet-enter-active,
.sheet-leave-active {
  transition: transform 0.25s ease;
}

.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(100%);
}

.qr-container{
    background: linear-gradient(360deg, rgba(8, 139, 85, 0.2) 0.18%, rgba(255, 255, 255, 0) 46.84%);
}
</style>