<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

useHead({
  meta: [
    {
      name: 'app-version',
      content: String(config.public.appVersion || ''),
    },
  ],
})

const route = useRoute()

function handleAndroidBack(): boolean {
  if (route.path.startsWith('/my-requests/')) {
    navigateTo('/my-requests', { replace: true })
    return true
  }

  const mainPages = ['/main', '/profile', '/my-requests']

  if (mainPages.includes(route.path)) {
    return true
  }

  return false
}

onMounted(() => {
  window.handleAndroidBack = handleAndroidBack
})

onUnmounted(() => {
  delete window.handleAndroidBack
})

onMounted(() => {
  window.handleAndroidBack = handleAndroidBack
  handleAndroidBack()
})

onUnmounted(() => {
  delete window.handleAndroidBack
})
</script>