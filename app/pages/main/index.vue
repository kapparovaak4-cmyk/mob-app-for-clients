<template>
  <div class="flex flex-col gap-4 pb-4">
    <CalculatorCard />
    <HomeMenuCard :items="menuItems" />
    <QrSigningCard @scan="openQrScanner" />
    <SecurityNotice>Данные защищены и доступны только вам</SecurityNotice>
  </div>
</template>

<script setup lang="ts">
import type { HomeMenuItem } from '@/components/home/HomeMenuCard.vue'
import CalculatorCard from '@/components/home/CalculatorCard.vue'
import HomeMenuCard from '@/components/home/HomeMenuCard.vue'
import QrSigningCard from '@/components/home/QrSigningCard.vue'
import SecurityNotice from '@/components/SecurityNotice.vue'

definePageMeta({
  layout: 'default',
})

const menuItems: HomeMenuItem[] = [
  {
    title: 'Мои расчёты',
    subtitle: 'Сохранённые предложения банков',
    icon: 'calculator',
    to: '/main/offers',
  },
  {
    title: 'Мои оценки',
    subtitle: 'Результаты проверок недвижимости',
    icon: 'building',
    to: '/main/real-estates',
  },
  {
    title: 'Мои заявки',
    subtitle: 'Отслеживайте статусы заявок',
    icon: 'wallet',
    to: '/my-requests',
  },
  {
    title: 'AI-агент',
    subtitle: 'Ваш помощник',
    icon: 'chat',
    to: '/main/ai-agent',
    variant: 'gradient',
  },
]

function openQrScanner() {
  // open scanner / navigate to QR scanner
}
</script>