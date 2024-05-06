// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    serverHost: "10.0.0.1",
    serverAuth : "dXNlcjpwYXNzd29yZA=="
  }
})