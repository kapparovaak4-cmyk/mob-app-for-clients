<template>
  <div>
    <OffersList v-if="activeTab === 'offers'" />
    <CertsList v-else-if="activeTab === 'certificates'" />
    <ArchiveOffersList v-else-if="activeTab === 'archive'" />
  </div>
</template>

<script setup lang="ts">
import OffersList from "./OffersList.vue"
import CertsList from "./CertsList.vue"
import ArchiveOffersList from "./ArchiveOffersList.vue"

definePageMeta({
  headerTitle: 'Мои расчёты',
  backPath: '/',
  tabs: [
    {
      id: 'offers',
      label: 'Предложения',
    },
    {
      id: 'certificates',
      label: 'Сертификаты',
    },
    {
      id: 'archive',
      label: 'Архив',
    },
  ],
})

const route = useRoute()

const activeTab = computed(() => {
  return route.hash.replace('#', '') || 'offers'
})

</script>