<!-- Done.vue -->
<template>
  <div class="flex h-full flex-col px-5 pt-20 pb-8">
    <!-- Success -->
    <div class="flex flex-col items-center text-center">
      <div class="flex items-center justify-center">
        <BaseIcon name="done" class="icon-green" />
      </div>

      <h1 class="mt-5 text-[24px] font-medium text-[#292D34]">
        Заявка подписана
      </h1>

      <p class="mt-3 max-w-[260px] text-[12px] leading-[17px] text-[#7A827E]">
        Вы можете посмотреть статус заявки<br>
        на странице
        <NuxtLink to="/my-requests" class="app-link">
          «Мои заявки»
        </NuxtLink>
      </p>
    </div>

    <!-- Document -->
    <div class="mt-8 rounded-[12px] bg-white px-3 py-2 card-border">
      <BaseDocumentItem
        v-for="document in documents"
        :key="document.id"
        :document="document"
        size="sm"
        @open="openDocument"
      />
    </div>

    <!-- Info -->
    <div class="mt-3 rounded-[12px] bg-white p-4 card-border">
      <div class="info-row">
        <span>Заявка</span>
        <span>LN–2048</span>
      </div>

      <div class="info-row">
        <span>Подписано</span>
        <span>9:41 15 сент. 2026</span>
      </div>
    </div>

    <!-- Bottom -->
    <NuxtLink
      to="/main"
      class="mt-auto text-center text-[12px] transition-colors text-primary hover:opacity-85"
    >
      Вернуться на главную
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { RequestDocument } from '@/components/BaseDocumentItem.vue'

const documents: RequestDocument[] = [
  {
    id: 1,
    name: 'Заявление на получение кредита',
    size: '1.2 MB',
    type: 'PDF',
    url: '/documents/application.pdf',
  },
]

const openDocument = (document: RequestDocument) => {
  window.open(document.url, '_blank')
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

.app-link {
  @apply cursor-pointer font-semibold text-[#1685E5] transition-opacity hover:opacity-70;
}

.info-row {
  @apply flex items-center justify-between gap-4 text-[12px] text-[#7A827E];

  & + & {
    @apply mt-3;
  }

  span:last-child {
    @apply font-medium text-[#292D34];
  }
}
</style>