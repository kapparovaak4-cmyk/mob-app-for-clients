// plugins/app-ready.client.ts
export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()

  const FONT_FAMILY = 'Inter'
  const TIMEOUT_MS = 3000

  const loadAllFonts = async () => {
    // Every @font-face the browser has parsed for Inter (all weights/styles/subsets)
    const faces = [...document.fonts].filter(
      (f) => f.family.replace(/["']/g, '') === FONT_FAMILY
    )

    // Allow individual faces to fail without blocking the rest
    await Promise.allSettled(faces.map((f) => f.load()))
    await document.fonts.ready
  }

  nuxtApp.hook('app:mounted', async () => {
    try {
      await Promise.race([
        loadAllFonts(),
        new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS)),
      ])
    } catch (e) {
      console.warn('Font loading failed, continuing anyway', e)
    }

    document.documentElement.classList.remove('fonts-loading')
    window.AppReady?.postMessage('ready')
  })
})