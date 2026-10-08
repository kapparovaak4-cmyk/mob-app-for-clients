<template>
    <BaseFileCard
        name="Полный график платежей.pdf"
        description="24 платежа · 86 КБ"
        @download="downloadSchedule"
    />

    <BaseTable
        :columns="columns"
        :items="payments"
        :limit="4"
        :show-all-text="`Показать все ${payments.length} платежа`"
        class="mt-3 card-border"
    />

    <div class="text-page-hint pt-1">
        Проценты включены в каждый платёж. Даты могут меняться из-за выходных
    </div>
</template>

<script lang="ts" setup>
const columns = [
  { label: '#', key: 'number', cellClass: 'text-[#7A827E]' },
  { label: 'Дата', key: 'date' },
  { label: 'Платёж', key: 'payment' },
  { label: 'Основной долг', key: 'principal', cellClass: 'text-[#7A827E]' },
]

const payments = Array.from({ length: 100 }, (_, index) => {
  const date = new Date(2026, 9 + index, 15)

  return {
    id: index + 1,
    number: String(index + 1).padStart(2, '0'),
    date: date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace('.', ''),
    payment: '451 000,32 ₸',
    principal: '3 850 000,49 ₸',
  }
})

function downloadSchedule(){

}
</script>