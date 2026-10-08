
<template>
  <div class="flex flex-col items-center text-center">
    <!-- <div class="flex size-[56px] items-center justify-center rounded-full bg-[#DDF5E9]">
      <BaseHourglass :size="30" :animate="false" />
    </div> -->

    <div class="mt-10 flex items-center gap-2 text-[13px] text-primary">
      <span class="size-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      Ожидаем разрешения
    </div>

    <!-- <h2 class="mt-4 text-[16px] font-semibold text-[#292D34]">
      Подтвердите доступ
    </h2> -->

    <BaseButton
      text="Открыть eGov"
      variant="login"
      block
      class="mt-4 !py-4"
      @click="emit('openEgov')"
    />

    <p class="mt-5 text-[12px] text-[#7A827E]">
      После подтверждения вернитесь сюда
    </p>

    <p v-if="error" class="mt-3 text-[13px] text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth.ts'

defineProps<{ error?: string }>()

const authStore = useAuthStore()
const { isAuthorized } = storeToRefs(authStore)

const emit = defineEmits<{
  openEgov: []
}>()

onMounted(() => {
    setTimeout(() => {
        isAuthorized.value = true
    }, 2000);
})
</script>

