<template>
  <article
    class="w-full rounded-[14px] border card-border bg-white px-4 py-5"
  >
    <!-- Bank -->
    <div class="flex items-start justify-between gap-3">
      <!-- <div class="flex min-w-0 items-center gap-3">
        <BaseBankImg :src="offer.logo" :name="offer.bank"/>

        <div class="min-w-0">
          <h3 class="text-[20px] font-semibold leading-[24px]">
            {{ offer.bank }}
          </h3>

          <p class="mt-1 text-[14px] leading-[18px] text-primary">
            {{ offer.program }}
          </p>
        </div>
      </div> -->

      <BaseBankBlock :src="offer.logo" :name="offer.bank" :program="offer.program" />

      <BaseStatusTag
        v-if="!hideStatus"
        :text="offer.statusText"
        :variant="offer.statusVariant"
        :show-dot="false"
      />
    </div>

    <!-- Main amounts -->
    <div class="mt-9 flex justify-between gap-3">
      <div>
        <p class="text-[13px] leading-5 text-[#7A827E]">
          Сумма займа
        </p>

        <p class="text-[20px] font-semibold leading-6 text-[#242424]">
          {{ formatMoney(offer.amount) }} ₸
        </p>
      </div>

      <div class="text-right">
        <p class="text-[13px] leading-5 text-[#7A827E]">
          Ежемесячный платёж
        </p>

        <p class="text-[20px] font-semibold leading-6 text-[#242424]">
          {{ formatMoney(offer.monthlyPayment) }} ₸ / мес.
        </p>
      </div>
    </div>

    <!-- Conditions -->
    <div class="mt-4 flex gap-1">
      <div class="condition">
        <span class="condition-label">ГЭСВ</span>
        <strong>{{ offer.gesv }}</strong>
      </div>

      <div class="condition">
        <span class="condition-label">Срок</span>
        <strong>{{ offer.term }}</strong>
      </div>

      <div class="condition">
        <span class="condition-label">Комиссия</span>
        <strong>{{ formatMoney(offer.commission) }} ₸</strong>
      </div>
    </div>

    <slot name="footer" :offer="offer" :format-money="formatMoney" />
  </article>
</template>

<script setup lang="ts">
import type { LoanOffer } from "@/types/LoanOffer"

const props = defineProps<{
  offer: LoanOffer
  hideStatus?: boolean
}>()

const emit = defineEmits<{
  details: [offer: LoanOffer]
  sign: [offer: LoanOffer]
}>()

function formatMoney(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value)
}
</script>

<style>
@reference "~/assets/css/main.css";

.condition {
  @apply w-full flex flex-col rounded-[16px] bg-[#F4F7F5] px-4 py-3;
}

.condition-label {
  @apply mb-1 text-[10px] uppercase leading-none text-[#7A827E];
}

.condition strong {
  @apply whitespace-nowrap text-[18px] font-semibold leading-5 text-[#182027];
}
</style>