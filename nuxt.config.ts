// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint"],
  colorMode: {
    preference: "light",
  },
  experimental: {
    typedPages: true,
  },
  app: {
    head: {
      bodyAttrs: {
        class: "bg-gray-100 dark:bg-gray-950",
      },
    },
  },
});