<template>
  <div class="flex flex-col gap-3">
    <span class="text-grey text-[13px] mt-1.5 ml-1">Отчёты о стоимости выбранной недвижимости</span>
    <ReatEstateCard v-for="property in properties" :key="property.id"
      :property="property" @details="openDetails" />
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports';
import ReatEstateCard, { type Property } from '@/components/real-estates/ReatEstateCard.vue'

definePageMeta({
  headerTitle: 'Мои оценки',
  backPath: '/',
})

const properties: Property[] = [
  {
    id: 1,
    number: 'ОТЧ-240918',
    address: 'Алматы, ул. Жарокова, 137',
    price: 36_900_000,
    statusText: 'Одобрен',
    statusVariant: 'success',
  },
  {
    id: 2,
    number: 'ОТЧ-240918',
    address: 'Астана, пр. Мәңгілік Ел, 42',
    price: 36_900_000,
    statusText: 'На проверке',
    statusVariant: 'warn',
  },
  {
    id: 2,
    number: 'ОТЧ-240918',
    address: 'Астана, пр. Мәңгілік Ел, 42',
    price: 36_900_000,
    statusText: 'Отклонён',
    statusVariant: 'danger',
  },
]

function openDetails(property: Property) { navigateTo(`/properties/${property.id}`) }
</script>