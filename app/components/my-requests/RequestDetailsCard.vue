<template>
  <article
    class="rounded-[20px] card-border bg-white px-4 py-4"
  >
    <!-- Header -->
    <div class="flex items-center justify-between gap-3">
      <p class="text-[13px] font-semibold text-[#242424]">
        № {{ request.number }}
      </p>

      <p class="text-[11px] text-[#707070]">
        от {{ request.createdAt }}
      </p>
    </div>

    <!-- Information -->
    <div class="mt-3 flex flex-col gap-2">
      <InfoRow
        label="Банк"
        :value="request.bank"
      />

      <InfoRow
        label="Программа"
        :value="request.program"
      />

      <InfoRow
        label="Сумма кредита"
        :value="`${formatAmount(request.amount)} ₸`"
      />

      <InfoRow
        label="Срок"
        :value="`${request.term} лет`"
      />

      <InfoRow
        label="Ставка"
        :value="`${request.rate}%`"
      />
    </div>

    <!-- Status -->
    <div class="mt-4">
      <BaseStatusTag
        :text="request.status.label"
        :variant="request.status.variant"
      />

      <p class="mt-2 text-[11px] text-[#B0B0B0]">
        Последнее обновление: {{ request.updatedAt }}
      </p>
    </div>

    <div class="my-3 h-px bg-[#EEEEEE]" />

    <!-- Client -->
    <div>
      <p class="text-[13px] font-semibold text-[#242424]">
        {{ request.client.fullName }}
      </p>

      <p class="mt-0.5 text-[11px] text-[#707070]">
        ИИН {{ request.client.iin }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { StatusTagVariant } from "@/types/Status"

interface Props {
  request: {
    number: string
    createdAt: string

    bank: string
    program: string
    amount: number
    term: number
    rate: number

    updatedAt: string

    status: {
      label: string
      variant: StatusTagVariant
    }

    client: {
      fullName: string
      iin: string
    }
  }
}

defineProps<Props>()

function formatAmount(amount: number) {
  return new Intl.NumberFormat('ru-RU').format(amount)
}
</script>