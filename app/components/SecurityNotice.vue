<template>
  <div
    class="
      flex items-center gap-2 rounded-[10px]
      bg-primary/10 px-3 py-2.5 text-primary
    "
  >
    <BaseIcon
      name="secure"
      custom-class="icon-sm icon-green"
    />

    <p class="text-[11px]">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts" setup>

</script>