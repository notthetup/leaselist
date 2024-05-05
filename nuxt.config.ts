// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    serverHost: process.env.SERVER_HOST,
    serverAuth : process.env.SERVER_AUTH
  }
})