<template>
  <div class="flex flex-col gap-3">
    <RequestCard
      v-for="request in requests"
      :key="request.id"
      :request="request"
      @open="openApplication"
    />
  </div>
</template>

<script setup lang="ts">
import type { Request } from '@/components/my-requests/RequestCard.vue'
import RequestCard from '@/components/my-requests/RequestCard.vue'

definePageMeta({
  headerTitle: 'Мои заявки',
})

const requests = ref<Request[]>([
  {
    id: 1,
    number: '10100026055076',
    createdAt: '05.02.2026, 16:37',
    bank: 'Halyk Bank',
    program: 'Баспана Хит',
    amount: 25_000_000,
    updatedAt: 'вчера, 16:37',
    status: 'signing',
    actionNeeded: true,
  },
  {
    id: 2,
    number: '10100026055076',
    createdAt: '05.02.2026, 16:37',
    bank: 'Halyk Bank',
    program: 'Баспана Хит',
    amount: 25_000_000,
    updatedAt: 'вчера, 16:37',
    status: 'certificate',
    daysToProcess: 3,
  },
  {
    id: 3,
    number: '10100026055076',
    createdAt: '05.02.2026, 16:37',
    bank: 'Halyk Bank',
    program: 'Баспана Хит',
    amount: 25_000_000,
    updatedAt: 'вчера, 16:37',
    status: 'completed',
  },
  {
    id: 4,
    number: '10100026055077',
    createdAt: '05.02.2026, 16:37',
    bank: 'Halyk Bank',
    program: 'Баспана Хит',
    amount: 25_000_000,
    updatedAt: 'вчера, 16:37',
    status: 'completed',
  },
  {
    id: 5,
    number: '10100026055078',
    createdAt: '05.02.2026, 16:37',
    bank: 'Halyk Bank',
    program: 'Баспана Хит',
    amount: 25_000_000,
    updatedAt: 'вчера, 16:37',
    status: 'completed',
  },
])

function openApplication(request: Request) {
  navigateTo(`/my-requests/${request.id}`)
}
</script>