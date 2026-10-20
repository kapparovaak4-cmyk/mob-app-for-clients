<template>
  <BaseBottomSheet
    v-model="open"
    backdrop
    :show-handle="false"
    title="Нужна помощь?"
    subtitle="Свяжитесь с нашей службой поддержки любым удобным способом"
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
            flex size-10 shrink-0 items-center justify-center
            rounded-full
            bg-[color-mix(in_srgb,var(--color-primary)_10%,white)]
            text-[13px] font-semibold
            text-[var(--color-primary)]
          "
        >
          <BaseIcon :name="step.icon" custom-class="icon-green"/>
        </div>

        <div>
          <p
            class="
              text-[12px]
              leading-[17px] text-grey
            "
          >
            {{ step.title }}
          </p>

          <p
            class="
              mt-0.5 text-[14px]
              leading-[14px] font-semibold
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
    title: 'Телефон',
    description: '+7 (777) 000-00-00',
    icon: 'call',
},
{
    title: 'Почта',
    description: 'support@onayipoteka.kz',
    icon: 'mail',
},
{
    title: 'Время работы',
    description: 'Ежедневно, 09:00–21:00',
    icon: 'time',
},
]
</script>