<template>
<div class="flex flex-col gap-[10px]">
    <div class="card-border bg-white rounded-[12px] p-5">
        <div class="flex gap-3 items-center">
            <BaseClientAvatar :name="user.name"/>
            <p class="truncate text-[16px]/[18px] font-bold text-balance !w-[60%]">
                {{ user.name }}
            </p>
        </div>
        <div class="divider mt-4 pt-4">
            <div>
                <p class="text-[13px] text-[#7A827E]">Номер телефона</p>
                <p class="text-[16px] font-semibold">
                    {{ user.phone }}
                </p>
            </div>
        </div>
    </div>

    <div class="card-border bg-white rounded-[12px] p-4 flex justify-between cursor-pointer hover:bg-[#F0F6F3]"
        @click="updatePinCode">
        <div class="">
            <div class="text-[16px] font-bold">Сменить PIN-код</div>
            <div class="text-[12px] text-grey pl-[.5px]">Безопасность приложения</div>
        </div>
        <BaseIcon name="back" class="rotate-[180deg]"/>
    </div>

    <div class="bg-primary/10 p-4 rounded-[10px] flex flex-col gap-1">
        <div class="text-[15px] font-bold text-primary">Служба поддержки</div>
        <div class="text-[12px] text-grey text-primary">
            <div>+7 (777) 000-00-00 - support@onayipoteka.kz</div>
            <div>Ежедневно, 09:00–21:00</div>
        </div>
    </div>
    <BaseButton
        text="Выйти из аккаунта"
        variant="logout"
        size="md"
        block
        @click="showLogoutDialog = true"
    />

    <BaseConfirmDialog
        v-model="showLogoutDialog"
        text="Вы уверены, что хотите выйти из аккаунта?"
        confirm-text="Выйти"
        variant="danger"
        :loading="loading"
        @confirm="logout"
    />
</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth.ts'

definePageMeta({
    layout: 'default',
    headerTitle: 'Профиль'
})

const router = useRouter()
const auth = useAuthStore()
const { isAuthorized, isUnlocked } = storeToRefs(auth)

const user = {
    id: 1,
    name: 'Алекс Морган Морганұлы',
    phone: '+7 ••• ••• 0148',
}

const showLogoutDialog = ref(false)
const loading = ref(false)

async function logout(){
  loading.value = true
  try {
    // await logoutApi()
    setTimeout(() => {
        showLogoutDialog.value = false
        navigateTo('/login')
        loading.value = false
    }, 2000);
  } finally {
  }
}

function updatePinCode(){
    router.push('/profile/pincode')
    isAuthorized.value = false
    isUnlocked.value = false
}
</script>