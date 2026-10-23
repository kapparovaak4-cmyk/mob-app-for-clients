<template>
  <article
    role="button"
    tabindex="0"
    class="
      w-full cursor-pointer select-none
      rounded-[20px] card-border bg-white px-4 py-4
      transition-[transform,background-color,border-color]
      duration-150 ease-out
      active:scale-[0.99]
      active:bg-[#F0F8F4]
      active:border-[#088B55]
      touch-manipulation
      [-webkit-tap-highlight-color:transparent]
      focus-visible:outline-2
      focus-visible:outline-[#088B55]
    "
    @click="openDetails"
    @keydown.enter.prevent="openDetails"
    @keydown.space.prevent="openDetails"
  >
    <!-- Header -->
    <div class="flex items-center justify-between gap-3">
      <p class="text-[14px] font-semibold text-[#242424]">
        № {{ request.number }}
      </p>

      <p class="shrink-0 text-[13px] text-[#707070]">
        от {{ request.createdAt }}
      </p>
    </div>

    <!-- Main info -->
    <div class="mt-3">
      <h3 class="text-[16px] font-semibold leading-[20px] text-[#242424]">
        {{ request.bank }},
        {{ request.program }},
        {{ formatAmount(request.amount) }} ₸
      </h3>

      <p class="mt-1 text-[12px] text-[#B0B0B0]">
        Последнее обновление: {{ request.updatedAt }}
      </p>
    </div>

    <!-- Status -->
    <div class="mt-2 flex items-center justify-between gap-3">
      <BaseStatusTag
        :text="statusConfig.label"
        :variant="statusConfig.variant"
      />

      <BaseButton
        icon="back"
        icon-only
        variant="icon"
        size="sm"
        icon-class="rotate-180 icon-grey icon-sm"
      />
    </div>

    <!-- Action needed -->
    <p
      v-if="request.actionNeeded"
      class="mt-4 text-right text-[12px] text-orange"
    >
      Требуется ваше действие
    </p>

    <!-- Processing time -->
    <p
      v-else-if="request.daysToProcess"
      class="mt-4 text-right text-[12px] text-grey-2"
    >
      Рассмотрение заявки — до {{ request.daysToProcess }}
      {{ getDaysLabel(request.daysToProcess) }}
    </p>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { StatusTagVariant } from "@/types/Status"

export type ApplicationStatus =
  | 'signing'
  | 'certificate'
  | 'completed'

export interface Request {
  id: number | string
  number: string
  createdAt: string

  bank: string
  program: string
  amount: number

  updatedAt: string
  status: ApplicationStatus

  actionNeeded?: boolean
  daysToProcess?: number
}

interface Props {
  request: Request
}

const props = defineProps<Props>()
const router = useRouter()

defineEmits<{
  open: [request: Request]
}>()

const statusConfig = computed(() => {
  const statuses = {
    signing: {
      label: 'Подписание расчета',
      variant: 'info',
    },

    certificate: {
      label: 'Сертификат сформирован',
      variant: 'info',
    },

    completed: {
      label: 'Завершено',
      variant: 'success',
    },
  } satisfies Record<
    ApplicationStatus,
    {
      label: string
      variant: StatusTagVariant
    }
  >

  return statuses[props.request.status]
})

function formatAmount(amount: number) {
  return new Intl.NumberFormat('ru-RU').format(amount)
}

function getDaysLabel(days: number) {
  const mod10 = days % 10
  const mod100 = days % 100

  if (mod10 === 1 && mod100 !== 11) {
    return 'рабочего дня'
  }

  return 'рабочих дней'
}

function openDetails(){
    router.push(`/my-requests/${props.request?.id}`)
}
</script>