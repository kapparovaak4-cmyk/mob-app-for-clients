<template>
  <div class="flex flex-col gap-3">
    <span class="text-grey text-[13px] mt-1.5 ml-1">Неактуальные условия и предложения банков</span>
    <OfferCard v-for="offer in offers" :offer="offer" :key="offer.id" hideStatus></OfferCard>
  </div>
</template>

<script setup lang="ts">
import type { LoanOffer } from '@/types/LoanOffer.ts'
import OfferCard from './OfferCard.vue'

const offers: LoanOffer[] = [
  {
    id: 1,
    bank: 'Halyk Bank',
    program: '7-20-25',
    amount: 124_600_000,
    monthlyPayment: 1_972_540,
    gesv: '8,5%',
    term: '20 мес.',
    commission: 260_000,
    calculationDate: '12 сентября 2026',
    statusText: 'К подписанию',
    statusVariant: 'warn',
  },
  {
    id: 2,
    bank: 'Евразийский банк',
    program: 'Название программы',
    logo: 'eubank',
    amount: 24_600_000,
    monthlyPayment: 172_540,
    gesv: '8,5%',
    term: '20 мес.',
    commission: 260_000,
    calculationDate: '12 сентября 2026',
    statusText: 'К подписанию',
    statusVariant: 'warn',
  },
]

function openDetails(offer: LoanOffer) {
  navigateTo(`/offers/${offer.id}`)
}

function signOffer(offer: LoanOffer) {
  console.log('Sign:', offer.id)
}
</script>