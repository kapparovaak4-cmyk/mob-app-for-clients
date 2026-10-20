<template>
  <div class="flex flex-col gap-3">
    <div class="text-page-hint">Сохранённые условия и предложения банков</div>

    <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer">
      <template #footer="{ offer }">
        <div class="divider mt-4 pt-3">
          <p class="text-[13px] text-[#7A827E]">Дата расчёта: {{ offer.calculationDate }}</p>
        </div>

        <div class="mt-5 flex flex-col gap-3">
          <BaseButton text="Подробнее" variant="secondary" block rounded @click="openDetails(offer)" />
          <BaseButton text="Подписать" block rounded @click="signOffer(offer)" />
        </div>
      </template>
    </OfferCard>
  </div>
</template>

<script setup lang="ts">
import type { LoanOffer } from '@/types/LoanOffer.ts'
import OfferCard from './OfferCard.vue'

const offers: LoanOffer[] = [
  {
    id: 1, bank: 'Halyk Bank', program: '7-20-25',
    amount: 124_600_000, monthlyPayment: 1_972_540,
    gesv: '8,5%', term: '20 мес.', commission: 260_000,
    calculationDate: '12 сентября 2026',
    statusText: 'К подписанию', statusVariant: 'warn',
  },
  {
    id: 2, bank: 'Евразийский банк', program: 'Название программы', logo: 'eubank',
    amount: 24_600_000, monthlyPayment: 172_540,
    gesv: '8,5%', term: '20 мес.', commission: 260_000,
    calculationDate: '12 сентября 2026',
    statusText: 'К подписанию', statusVariant: 'warn',
  },
]

function openDetails(offer: LoanOffer) {  }
function signOffer(offer: LoanOffer) { navigateTo(`/main/offers/${offer.id}`) }
</script>