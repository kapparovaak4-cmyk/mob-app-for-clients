export {}

declare global {
  interface Window {
    handleAndroidBack?: () => boolean,
    AppReady?: {
      postMessage(message: string): void
    }
  }
}