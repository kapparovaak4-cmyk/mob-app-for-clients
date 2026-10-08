<template>
  <NuxtLink
    :to="to"
    class="group flex w-full items-center gap-3 rounded-[12px] p-2.5 transition"
    :class="variant === 'gradient'
      ? 'bg-[linear-gradient(132.34deg,#0D1822_6.1%,var(--color-primary)_100%)] w-menu-action-item-gradient my-2 '
      : 'hover:bg-[#F7F9F8]'
    "
  >
    <!-- Icon -->
    <div
      class="flex size-10 shrink-0 items-center justify-center rounded-[10px]"
      :class="variant === 'gradient'
        ? 'bg-white/10'
        : 'bg-[#E2F7EE]'
      "
    >
      <BaseIcon
        :name="icon"
        custom-class="icon-md"
        :class="variant === 'gradient' ? 'icon-white' : 'icon-green'"
      />
    </div>

    <!-- Text -->
    <div class="min-w-0 flex-1">
      <p
        class="text-[14px] font-semibold leading-[18px]"
        :class="variant === 'gradient'
          ? 'text-white'
          : 'text-[#242424]'
        "
      >
        {{ title }}
      </p>

      <p
        v-if="subtitle"
        class="mt-0.5 truncate text-[11px] leading-[14px]"
        :class="variant === 'gradient'
          ? 'text-white/70'
          : 'text-[#8F95A3]'
        "
      >
        {{ subtitle }}
      </p>
    </div>

    <!-- Arrow -->
    <BaseIcon
      name="back"
      custom-class="icon-sm rotate-180 shrink-0"
      :class="variant === 'gradient' ? 'icon-white' : 'icon-grey'"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    icon: string
    to: string
    variant?: 'default' | 'gradient'
  }>(),
  {
    variant: 'default',
  },
)
</script>

<style>
.w-menu-action-item-gradient{
  width: calc(100% - 14px)!important;
}
</style>