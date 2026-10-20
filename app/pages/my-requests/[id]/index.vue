<template>
  <div class="flex flex-col gap-3">
    <RequestDetailsCard :request="request" />

    <BaseDocuments
      title="Ваши документы"
      :documents="request.documents"
      @open="openDocument"
    />

    <RequestStatusHistory :items="request.history" />
  </div>
</template>

<script setup lang="ts">
import RequestDetailsCard from '@/pages/my-requests/RequestDetailsCard.vue'
import RequestStatusHistory from '@/pages/my-requests/RequestStatusHistory.vue'

definePageMeta({
  headerTitle: 'Информация о заявке',
})

const route = useRoute()

const request = ref({
  id: route.params.id,
  number: '10100026055076',
  createdAt: '05.02.2026, 16:37',

  bank: 'Halyk Bank',
  program: 'Баспана Хит',
  amount: 25_000_000,
  term: 20,
  rate: 7.5,

  updatedAt: 'вчера, 16:37',

  status: {
    label: 'Подписание расчета',
    variant: 'info' as const,
  },

  client: {
    fullName: 'Имя Фамилия Отчество',
    iin: '00112233444',
  },

  documents: [
    {
      id: 1,
      name: 'Длинное название документа.pdf',
      size: '1.2 MB',
      type: 'PDF',
      url: '#',
    },
    {
      id: 2,
      name: 'Длинное название Длинное название документа.pdf',
      size: '1.2 MB',
      type: 'PDF',
      url: '#',
    },
  ],

  history: [
    {
      id: 1,
      label: 'Расчеты',
      status: 'completed' as const,
    },
    {
      id: 2,
      label: 'Сертификат',
      status: 'completed' as const,
    },
    {
      id: 3,
      label: 'Добавление залога (оценки)',
      status: 'completed' as const,
    },
    {
      id: 4,
      label: 'Проверка со стороны “Onay Ipoteka”',
      status: 'current' as const,
    },
    {
      id: 5,
      label: 'Проверка Банком',
      status: 'pending' as const,
    },
    {
      id: 6,
      label: 'Завершено',
      status: 'pending' as const,
    },
  ],
})

function openDocument(document: { url: string }) {
  if (!document.url || document.url === '#') return

  window.open(document.url, '_blank')
}
</script>