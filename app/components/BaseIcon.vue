<template>
  <img v-if="name" :src="`/icons/icon-${name}.svg`" :alt="alt" class="base-icon inline-block align-middle" :class="customClass" />
</template>

<script setup lang="ts">
interface Props {
  name: string
  alt?: string
  customClass?: string
}

withDefaults(defineProps<Props>(), {
  alt: '',
})
</script>

<style>
.icon-2xs { width: 14px; height: 14px; }
.icon-xs { width: 16px; height: 16px; }
.icon-sm { width: 18px; height: 18px; }
.icon-md { width: 24px; height: 24px; }
.icon-big { width: 26px; height: 26px; }
.icon-lg { width: 28px; height: 28px; }
.icon-xl { width: 31px; height: 31px; }
.icon-2xl { width: 36px; height: 36px; }
.icon-3xl { width: 42px; height: 42px; }
.icon-4xl { width: 54px; height: 54px; }
.icon-5xl { width: 64px; height: 64px; }
</style>