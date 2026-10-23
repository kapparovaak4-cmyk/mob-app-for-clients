
<template>
  <div class="rounded-[14px] card-border bg-white p-3">
    <div class="flex items-center gap-3">
      <!-- Avatar -->
      <BaseClientAvatar :name="name"/>

      <!-- Info -->
      <div class="min-w-0">
        <p class="truncate text-[16px]/[18px] font-semibold text-[#292D34]">
          {{ name }}
        </p>

        <div class="mt-1 flex items-center gap-1">
          <span
            v-if="role"
            class="rounded-full bg-[#DDF5EC] px-2 py-1 text-[11px] font-semibold uppercase leading-none text-primary"
          >
            {{ role }}
          </span>

          <span
            v-if="isCurrentUser"
            class="rounded-full bg-primary px-2 py-1 text-[11px] font-semibold uppercase leading-none text-white"
          >
            ВЫ
          </span>
        </div>
      </div>
    </div>

    <!-- Phone -->
    <p v-if="phone" class="mt-3 text-[13px] text-grey">
      {{ phone }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  phone?: string
  role?: string
  isCurrentUser?: boolean
}>()
</script>