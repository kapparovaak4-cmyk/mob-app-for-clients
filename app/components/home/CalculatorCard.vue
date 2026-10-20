<template>
  <section
    class="
      rounded-[20px]
      bg-[linear-gradient(132.34deg,#0D1822_6.1%,var(--color-primary)_100%)]
      px-5 py-5
      shadow-[0_8px_22px_rgba(18,61,43,0.0862745)]
    "
  >
    <h2 class="text-[20px] font-bold leading-[24px] text-white">
      Калькулятор
    </h2>

    <p class="mt-1 text-[12px] text-white/70">
      Узнайте предложения банков для вас
    </p>

    <BaseButton
      class="mt-10 !min-w-[106px]"
      text="Перейти"
      size="sm"
      @click="navigateTo('/calculator')"
    />
  </section>
</template>