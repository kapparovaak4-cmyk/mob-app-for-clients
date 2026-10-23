<template>
  <div class="flex min-h-dvh flex-col items-center justify-center bg-[#F7F9F8] px-6 text-center">
    <h1 class="text-7xl font-bold text-primary">
      {{ error.statusCode === 404 ? '404' : 'Ошибка' }}
    </h1>

    <h2 class="mt-4 text-xl font-semibold text-[#242424]">
      {{ error.statusCode === 404
        ? 'Страница не найдена'
        : 'Что-то пошло не так' }}
    </h2>

    <p class="mt-2 text-sm text-[#707070]">
      {{ error.statusCode === 404
        ? 'Возможно, страница была удалена или адрес указан неверно.'
        : 'Попробуйте повторить действие позже.' }}
    </p>

    <BaseButton
      class="mt-6"
      text="На главную"
      @click="goHome"
    />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const goHome = () => clearError({
  redirect: useRuntimeConfig().app.baseURL,
})
</script>