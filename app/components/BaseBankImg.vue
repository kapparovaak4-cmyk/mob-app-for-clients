<template>
    <div
        class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px]"
        :class="{ 'bg-[#018467]': !logo }"
    >
        <img v-if="logo" :src="logo" class="h-full w-full rounded-full object-contain" :alt="name" />

        <span v-else class="text-[16px] font-semibold uppercase text-white">
            {{ getInitialsOfBank(name) }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import { useBankLogo } from "@/composables/useBankLogo";

const props = defineProps<{
  src?: string
  name: string
}>()

const logo = computed(() => useBankLogo(props.src || '', true)?.value?.href || '')

function getInitialsOfBank(bank: string) {
  return bank.trim().split(/\s+/).filter(Boolean).map(word => word[0]).join('')
}
</script>