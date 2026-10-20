
<template>
    <div class="flex items-center gap-3" :class="{'rounded-[12px] card-border-light bg-white px-3 py-3': card}">
        <BaseBankImg :src="src" :name="name"  />
    
        <div class="min-w-0">
            <p class="truncate text-[20px]/[22px] font-semibold">
                {{ name }}
            </p>
            <p class="mt-0.5 truncate text-[14px]/[15px] text-primary">
                {{ program }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  src?: string
  name: string
  program?: string
  card?: boolean
}>();
</script>