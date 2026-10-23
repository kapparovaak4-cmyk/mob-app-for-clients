<template>
  <div class="min-h-dvh flex justify-center">
    <div class="relative w-full h-dvh bg-[#F7F9F8] flex flex-col overflow-hidden">
      <!-- Home header -->
      <header
        v-if="isHome"
        class="shrink-0 h-[64px] px-4 flex items-center justify-between bg-transparent"
      >
        <NuxtLink to="/" class="flex items-center gap-1.5">
          <BaseIcon name="logo-black" custom-class="h-[24px]" />
        </NuxtLink>

        <NuxtLink
          to="/profile"
          class="text-[13px] font-medium text-[#252927]"
        >
          {{ userName }}
        </NuxtLink>
      </header>

      <!-- Header for other pages -->
      <header
        v-else-if="route.meta.headerTitle"
        class="shrink-0 h-[54px] px-3 flex items-center bg-white"
      >
        <NuxtLink
          v-if="route.meta.backPath"
          :to="route.meta.backPath"
          class="flex items-center gap-2 text-[18px] font-normal"
        >
          <BaseIcon name="back" custom-class="icon-md" />
          {{ route.meta.headerTitle }}
        </NuxtLink>
        <div v-else class="flex items-center gap-2 pl-2 text-[18px] font-normal">
          {{ route.meta.headerTitle }}
        </div>
      </header>

      <BaseTabs
        v-if="pageTabs.length"
        customClass="pt-[10px]"
        :tabs="pageTabs"
        :active-tab="activeTab"
        @select="selectTab"
      />

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto bg-[#F4F7F5] px-3 py-[8px]">
        <slot />
      </main>

      <!-- Bottom navigation -->
      <nav  class="shrink-0 min-h-[76px] 
      -fit px-4 pb-[env(safe-area-inset-bottom)] bg-white border-t border-[#EEF0EF]">
        <div class="h-full flex items-center justify-around">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="flex-1 h-full flex flex-col items-center justify-center gap-1 text-[10px] transition-colors font-medium"
            :class="isActive(item.to) ? 'text-[#000]' : 'text-[#808682]'"
          >
            <!-- Icon + notification badge -->
            <div class="relative">
              <BaseIcon
                :name=" isActive(item.to) && item.activeIcon ? item.activeIcon : item.icon"
                :custom-class="isActive(item.to) ? 'text-[#000] icon-green icon-md' : 'text-[#808682] icon-md'"
              />

              <span
                v-if="item.hasNotification && newRequestCount > 0"
                class="absolute -top-[5px] -right-[10px] min-w-[20px] h-[20px] px-[5px] flex items-center justify-center
                  rounded-full bg-primary text-white text-[10px] leading-none font-semibold border-2  border-white"
              >
                {{ formattedRequestCount }}
              </span>
            </div>

            <span :class="isActive(item.to) ? 'text-primary' : 'text-[#808682]'">{{ item.label }}</span>
          </NuxtLink>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NavigationItem {
  label: string
  icon: string
  activeIcon?: string
  to: string
  hasNotification?: boolean
}

const route = useRoute()
const userName = 'ИМЯ Ф.'
const isHome = computed(() => route.path === '/main' || route.path === '/main/')
const newRequestCount = ref(1)

const formattedRequestCount = computed(() => {
  return newRequestCount.value > 99 ? '99+' : newRequestCount.value
})

const navigation: NavigationItem[] = [
  {
    label: 'Главная',
    icon: 'home',
    activeIcon: 'home-solid',
    to: '/main',
  },
  {
    label: 'QR сканер',
    icon: 'qr',
    to: '/qr',
  },
  {
    label: 'Заявки',
    icon: 'bell',
    activeIcon: 'bell-solid',
    to: '/my-requests',
    hasNotification: true,
  },
  {
    label: 'Профиль',
    icon: 'profile',
    activeIcon: 'profile-solid',
    to: '/profile',
  },
]

interface TabItem {
  id: string
  label: string
}

const pageTabs = computed<TabItem[]>(() => {
  return (route.meta.tabs as TabItem[] | undefined) ?? []
})

const activeTab = computed(() => {
  const hash = route.hash.replace('#', '')

  const exists = pageTabs.value.some(tab => tab.id === hash)

  return exists
    ? hash
    : pageTabs.value[0]?.id ?? ''
})

function selectTab(id: string) {
  navigateTo({
    path: route.path,
    query: route.query,
  }, {
    replace: true,
  })
}

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}
</script>