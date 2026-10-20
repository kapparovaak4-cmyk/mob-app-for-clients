<template>
  <BaseStepsLayout
    v-model:current-step="currentStep"
    :steps="steps"
    :done="done"
    :disabled="nextDisabled"
    :loading="loading"
    :next-text="currentStepItem?.nextText"
    :next-icon="currentStepItem?.icon"
    @next="handleNext"
    @back="currentStep--"
    @close="close"
  >
    <LoanConditions v-if="currentStep === 0" :data="loanData" />
    <Participants v-else-if="currentStep === 1" />
    <PaymentTable v-else-if="currentStep === 2" />
    <AddingCollateral v-else-if="currentStep === 3" />
    <SigningLoan v-else-if="currentStep === 4" />

    <template #done>
      <Done @close="close" />
    </template>
  </BaseStepsLayout>
</template>

<script setup lang="ts">
import type { Step } from "@/components/BaseStepsLayout.vue"
import LoanConditions from "./LoanConditions.vue"
import Participants from "./Participants.vue"
import PaymentTable from "./PaymentTable.vue"
import AddingCollateral from "./AddingCollateral.vue"
import SigningLoan from "./SigningLoan.vue"
import Done from "./Done.vue"
import { useSignOffer } from "~/store/signOffer.ts"

definePageMeta({
  layout: 'empty'
})

const currentStep = ref(0)
const currentStepItem = computed(() => steps[currentStep.value])
const loading = ref(false)

const steps = [
  { title: 'Условия кредита', nextText: 'Запустить заявку' },
  { title: 'Участники заявки', nextText: 'Подтвердить участников' },
  { title: 'График платежей', nextText: 'Далее' },
  { title: 'Добавление залога', nextText: 'Далее' },
  { title: 'Проверка и подписание', nextText: 'Подписать заявку', icon: 'sign' },
] as Step[]

const signOfferStore = useSignOffer()
const { loanData, done, agreed, selectedCollateralIds } = storeToRefs(signOfferStore)

const nextDisabled = computed(() => {
  switch (currentStep.value) {
    case 3:
      return !selectedCollateralIds.value.length
    case 4:
      return !agreed.value
    default:
      return false
  }
})

const handleNext = async () => {
  if (nextDisabled.value || loading.value) return

  loading.value = true

  try {
    switch (currentStep.value) {
      case 0:
        await createApplication()
        break
      case 4:
        // await signApplication()
        done.value = true
        return
    }

    currentStep.value++
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const createApplication = async () => {
  // await $fetch(...)
}

const close = () => {
  navigateTo('/main/offers')
}
</script>