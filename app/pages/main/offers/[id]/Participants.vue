
<template>
    <div class="flex flex-col gap-3">
        <div class="text-page-hint">Проверьте участников, указанных в этой заявке</div>
        <ParticipantCard
            v-for="participant in participants"
            :key="participant.id"
            v-bind="participant"
        />
    </div>
</template>

<script lang="ts" setup>
import ParticipantCard from './ParticipantCard.vue';

const participants = [
  {
    id: 1,
    name: 'Алекс Морган',
    phone: '+7 ••• ••• 0148',
    role: 'Заёмщик',
  },
  {
    id: 2,
    name: 'Джордан Тейлор',
    phone: '+7 ••• ••• 0148',
    role: 'Гарант',
    isCurrentUser: true,
  },
]

</script>