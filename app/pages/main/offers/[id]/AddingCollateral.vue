<template>
  <div class="flex flex-col gap-3">
    <ReatEstateCard
      v-for="property in properties"
      :key="property.id"
      :property="property"
      selectable
      :selected="selectedCollateralIds.includes(property.id)"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import type { Property } from '@/pages/main/real-estates/ReatEstateCard.vue'
import ReatEstateCard from '@/pages/main/real-estates/ReatEstateCard.vue'
import { useSignOffer } from '~/store/signOffer'

const signOfferStore = useSignOffer()
const { selectedCollateralIds } = storeToRefs(signOfferStore)

function handleSelect(property: Property, selected: boolean) {
  if (selected) {
    if (!selectedCollateralIds.value.includes(property.id)) selectedCollateralIds.value.push(property.id)
  } else {
    selectedCollateralIds.value = selectedCollateralIds.value.filter(id => id !== property.id)
  }
}

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
    number: 'ОТЧ-240921',
    address: 'Астана, пр. Мәңгілік Ел, 42',
    price: 36_900_000,
    statusText: 'Одобрен',
    statusVariant: 'success',
  },
  {
    id: 3,
    number: 'ОТЧ-240921',
    address: 'Астана, пр. Мәңгілік Ел, 42',
    price: 29_400_000,
    statusText: 'На проверке',
    statusVariant: 'warn',
    statusDescription: 'Срок рассмотрения — до 5 рабочих дней',
  },
]
</script>