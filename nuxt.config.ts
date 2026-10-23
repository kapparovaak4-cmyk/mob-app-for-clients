// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'node:fs'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || '',
    },
  },
   nitro: {
    prerender: {
      ignore: ['/error'],
    },
  },
  devServer: {
    host: '0.0.0.0',
  },
  hooks: {
    'build:before': () => {
      writeFileSync(
        'public/version.json',
        JSON.stringify({
          version: new Date().toISOString(),
        }),
      )
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    baseURL: '/clientCabinet/',
    head: {
      htmlAttrs: { class: 'fonts-loading' },
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
        },
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        }
      ]
    },
  },

  modules: ['@pinia/nuxt'],
})