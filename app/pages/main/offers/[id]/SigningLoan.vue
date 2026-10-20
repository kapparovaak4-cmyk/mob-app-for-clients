<template>

<div class="flex flex-col gap-2">
    <!-- <div class="text-[22px] ml-1">
        Всё готово
    </div> -->
    <div class="text-page-hint">
        Проверьте данные ниже. Подписывая заявку, вы подтверждаете сведения и условия кредита
    </div>

      <div class="w-full rounded-[18px] card-border bg-white px-5 py-5">
        <div class="flex justify-between gap-6">
        <div>
            <p class="summary-label">Кредит</p>
            <p class="summary-value">10 000 000 ₸</p>
        </div>

        <div>
            <p class="summary-label">В месяц</p>
            <p class="summary-value text-primary">451 000,32 ₸</p>
        </div>
        </div>

        <div class="mt-7 flex flex-col gap-3">
        <div class="check-item">
            <BaseIcon name="mark-green" class="icon-md text-primary" />
            <span>2 участника проверены</span>
        </div>

        <div class="check-item">
            <BaseIcon name="mark-green" class="icon-md text-primary" />
            <span>Условия кредита проверены</span>
        </div>

        <div class="check-item">
            <BaseIcon name="mark-green" class="icon-md text-primary" />
            <span>График платежей доступен</span>
        </div>
        </div>

        <BaseDocumentItem
            :key="document.id"
            :document="document"
            size="md"
            class="!p-0 mt-6"
            @open="$emit('open', $event)"
        />
    </div>

    <BaseCheckbox v-model="agreed" mode="dark">
        Я ознакомился(-ась) с заявкой и согласен(-на) подписать её электронной подписью
    </BaseCheckbox>
</div>

</template>

<script lang="ts" setup>
import { useSignOffer } from '~/store/signOffer';

const signOfferStore = useSignOffer()
const { agreed } = storeToRefs(signOfferStore)

const document = {
    id: 1,
    name: 'Заявление на получение кредита.pdf',
    size: '1.2 MB',
    type: 'PDF',
    url: '#',
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

.summary-label {
  @apply text-[13px] uppercase text-[#7A827E];
}

.summary-value {
  @apply mt-1 text-[23px] font-normal leading-none;
}

.check-item {
  @apply flex items-center gap-2 text-[14px] text-[#414141];
}

.check-icon {
  @apply flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10;
}
</style>