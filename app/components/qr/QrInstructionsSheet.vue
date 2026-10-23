<template>
  <BaseBottomSheet
    v-model="open"
    backdrop
    :show-handle="false"
    title="Как это работает"
    subtitle="Наведите камеру на QR-код документа, отображаемый на экране вашего компьютера"
  >
    <div>
      <div
        v-for="(step, index) in steps"
        :key="step.title"
        class="
          flex gap-3 border-b border-[#E9ECEA]
          py-3 last:border-0
        "
      >
        <div
          class="
            flex size-8 shrink-0 items-center justify-center
            rounded-full
            bg-[color-mix(in_srgb,var(--color-primary)_10%,white)]
            text-[13px] font-semibold
            text-[var(--color-primary)]
          "
        >
          {{ index + 1 }}
        </div>

        <div>
          <p
            class="
              text-[13px] font-semibold
              leading-[17px] text-[#252927]
            "
          >
            {{ step.title }}
          </p>

          <p
            class="
              mt-0.5 text-[11px]
              leading-[14px] text-[#8F95A3]
            "
          >
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </BaseBottomSheet>
</template>

<script setup lang="ts">
const open = defineModel<boolean>({
  default: false,
})

const steps = [
  {
    title: 'Сканируйте код',
    description:
      'Камера автоматически распознает зашифрованную ссылку',
  },
  {
    title: 'Дайте согласие',
    description:
      'Подтвердите условия использования электронной подписи',
  },
  {
    title: 'Подпишите быстро',
    description:
      'Документы будут заверены в течение нескольких секунд',
  },
]
</script>