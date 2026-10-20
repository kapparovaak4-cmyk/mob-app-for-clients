
<template>
  <div
    class="hourglass-wrapper"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg class="hourglass" :class="{ 'is-animated': animate }" viewBox="0 0 48 48" fill="none">
      <defs>
        <clipPath :id="`top-${uid}`">
          <path d="M16 10H32V13C32 18 24 21 24 24C24 21 16 18 16 13V10Z" />
        </clipPath>
        <clipPath :id="`bottom-${uid}`">
          <path d="M24 24C24 27 32 30 32 35V38H16V35C16 30 24 27 24 24Z" />
        </clipPath>
      </defs>

      <!-- Frame -->
      <path
        d="M13 7H35M13 41H35M16 8V13C16 19 24 21 24 24C24 27 16 29 16 35V40M32 8V13C32 19 24 21 24 24C24 27 32 29 32 35V40"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- Top sand -->
      <g :clip-path="`url(#top-${uid})`">
        <rect x="14" y="10" width="20" height="15" fill="currentColor" class="sand-top" />
      </g>

      <!-- Falling sand -->
      <path
        d="M24 23V35"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-dasharray="2 2"
        class="sand-stream"
      />

      <!-- Bottom sand -->
      <g :clip-path="`url(#bottom-${uid})`">
        <rect x="14" y="24" width="20" height="14" fill="currentColor" class="sand-bottom" />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  size?: number
  animate?: boolean
}>(), {
  size: 32,
  animate: true,
})

const uid = useId()
</script>

<style scoped>
.hourglass-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #079669;
}

.hourglass {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.hourglass.is-animated {
  animation: hourglass-rotate 3.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.is-animated .sand-top {
  animation: sand-empty 3.6s linear infinite;
}

.is-animated .sand-bottom {
  animation: sand-fill 3.6s linear infinite;
}

.is-animated .sand-stream {
  animation: sand-fall 3.6s ease-in-out infinite;
}

@keyframes hourglass-rotate {
  0%, 72% { transform: rotate(0deg); }
  92%, 100% { transform: rotate(180deg); }
}

@keyframes sand-empty {
  0%, 5% { transform: translateY(0); }
  70%, 100% { transform: translateY(15px); }
}

@keyframes sand-fill {
  0%, 5% { transform: translateY(14px); }
  70%, 100% { transform: translateY(0); }
}

@keyframes sand-fall {
  0%, 5% { opacity: 0; }
  10%, 65% { opacity: 1; }
  70%, 100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .hourglass, .sand-top, .sand-bottom, .sand-stream {
    animation: none;
  }
}
</style>
