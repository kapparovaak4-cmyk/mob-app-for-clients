<template>
  <div class="flex flex-col gap-2">
    <!-- Amount -->
    <div class="rounded-[12px] gradient-card px-5 py-4 text-white">
      <p class="text-[13px] uppercase text-primary-light">Сумма кредита</p>

      <p class="mt-1 text-[34px] font-semibold leading-none">
        {{ formatAmount(data.amount) }} ₸
      </p>

      <p class="mt-3 text-[13px] text-primary-light">
        Заявка {{ data.requestNumber }}
      </p>
    </div>

    <BaseBankBlock :src="data.logo" :name="data.bank" :program="data.program" card/>

    <!-- Details -->
    <div class="rounded-[12px] card-border-light bg-white px-4 py-1">
      <div
        v-for="(item, index) in details"
        :key="item.label"
        class="flex items-center justify-between gap-4 py-3"
        :class="{ 'border-b border-[#EEF0EF]': index !== details.length - 1 }"
      >
        <span class="text-[14px] text-[#8B918E]">
          {{ item.label }}
        </span>

        <span
          class="text-right text-[14px] font-semibold"
          :class="item.highlight ? 'text-primary' : 'text-[#3D4140]'"
        >
          {{ item.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: {
    amount: number
    requestNumber: string
    bank: string
    program: string
    logo?: string
    monthlyPayment: number
    interestRate: number
    term: number
    commission: number
    totalPayment: number
    repaymentMethod: string
    overpayment: number
  }
}>()

const formatAmount = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

const bankInitials = computed(() =>
  props.data.bank
    .split(' ')
    .map(item => item[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
)

const details = computed(() => [
  {
    label: 'Ежемесячный платёж',
    value: `${formatAmount(props.data.monthlyPayment)} ₸`,
  },
  {
    label: 'Процентная ставка',
    value: `${props.data.interestRate}% годовых`,
  },
  {
    label: 'Срок',
    value: `${props.data.term} месяца`,
  },
  {
    label: 'Комиссия',
    value: `${formatAmount(props.data.commission)} ₸`,
  },
  {
    label: 'Общая сумма выплат',
    value: `${formatAmount(props.data.totalPayment)} ₸`,
    highlight: true,
  },
  {
    label: 'Метод погашения',
    value: props.data.repaymentMethod,
  },
  {
    label: 'Переплата',
    value: `${formatAmount(props.data.overpayment)} ₸`,
    highlight: true,
  },
])
</script>


<style>
.gradient-card{
  background: linear-gradient(132.34deg, #0D1822 6.1%, #093F2E 100%);
}
</style>