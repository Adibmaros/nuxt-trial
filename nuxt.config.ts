import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  future: {
    compatibilityVersion: 4, // Memastikan fitur Nuxt 4 aktif
  },

  nitro: {
    preset: "vercel",
  },

  modules: ["nuxt-auth-utils"],
  // @ts-ignore
  loadingIndicator: {
    name: "circle", // atau 'bar', 'pulse'
    color: "#3b82f6",
    throttle: 200,
  },
  runtimeConfig: {
    session: {
      name: "nuxt-session",
      password: process.env.NUXT_SESSION_PASSWORD || "", // min 32 karakter
      cookie: {
        sameSite: "lax", // penting untuk production
        secure: process.env.NODE_ENV === "production", // true di production
      },
    },
  },
});
