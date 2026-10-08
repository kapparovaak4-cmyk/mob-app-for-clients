<template>
  <section
    class="rounded-[16px] border border-[#E8EBE9] bg-white p-4"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <h3 class="text-[14px] font-semibold text-[#242424]">
          Сканировать QR для подписания
        </h3>

        <p class="mt-0.5 text-[11px] text-[#8F95A3]">
          Безопасное подписание
        </p>
      </div>

      <div
        class="
          flex size-10 shrink-0 items-center justify-center
          rounded-[10px] bg-[#E2F7EE]
        "
      >
        <BaseIcon
          name="qr"
          custom-class="icon-md icon-green"
        />
      </div>
    </div>

    <BaseButton
      class="mt-3 w-full"
      text="Открыть камеру"
      variant="primary"
      size="sm"
      @click="$emit('scan')"
    />
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  scan: []
}>()
</script>