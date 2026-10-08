<template>
  <label
    class="flex w-full cursor-pointer items-center gap-4 rounded-[12px] p-4 px-6 transition-colors"
    :class="mode === 'dark' ? 'bg-dark text-white' : 'bg-white text-[#252927] card-border'"
  >
    <input v-model="model" type="checkbox" class="sr-only" />

    <span
      class="flex size-5 shrink-0 items-center justify-center rounded-[3px] border transition-all duration-200"
      :class="[
        model ? 'scale-110' : 'scale-100',
        model
          ? mode === 'dark' ? 'border-white bg-white' : 'border-primary bg-primary'
          : mode === 'dark' ? 'border-white' : 'border-[#9CA3A0]'
      ]"
    >
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="scale-0 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-0 opacity-0"
      >
        <BaseIcon
          v-if="model"
          name="mark-bold"
          class="icon-xs"
          :class="mode === 'dark' ? 'text-[#0D1922]' : 'icon-white'"
        />
      </Transition>
    </span>

    <span class="text-[13px] leading-[16px] pr-2">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  mode?: 'light' | 'dark'
}>(), {
  mode: 'light',
})

const model = defineModel<boolean>({ default: false })
</script>