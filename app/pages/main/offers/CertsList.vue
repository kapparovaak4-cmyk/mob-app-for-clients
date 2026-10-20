<template>
  <div class="flex flex-col gap-3">
    <div class="text-page-hint">Документы для подтверждения доступной суммы</div>

    <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer">
      <template #footer>
        <div class="mt-4 flex items-end justify-between border-t border-[#DCE3DF] pt-4">
          <div>
            <p class="text-[20px] font-semibold">№ СЕР-009184</p>
            <p class="text-[13px] text-[#7A827E]">от 10.09.26</p>
          </div>

          <div class="text-right">
            <p class="text-[13px] text-[#7A827E]">Срок действия</p>
            <p class="text-[16px] font-semibold">до 10.12.2026</p>
          </div>
        </div>
      </template>
    </OfferCard>
  </div>
</template>

<script setup lang="ts">
import type { LoanOffer } from './OfferCard.vue'
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
</script>