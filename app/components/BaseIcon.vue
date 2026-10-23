
<template>
  <img
    v-if="name"
    :src="`${baseURL}icons/icon-${name}.svg`"
    :alt="alt"
    :class="['base-icon', customClass]"
    decoding="async"
  />
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

const baseURL = useRuntimeConfig().app.baseURL
</script>

<style>
.base-icon {
  display: inline-block;
  width: auto;
  height: 24px;
  max-width: 100%;
  flex-shrink: 0;
  vertical-align: middle;
}

.icon-2xs { height: 14px; }
.icon-xs { height: 16px; }
.icon-sm { height: 18px; }
.icon-md { height: 24px; }
.icon-big { height: 26px; }
.icon-lg { height: 28px; }
.icon-xl { height: 31px; }
.icon-2xl { height: 36px; }
.icon-3xl { height: 42px; }
.icon-4xl { height: 54px; }
.icon-5xl { height: 64px; }
</style>
