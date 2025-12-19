<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"> NuxtApp </NuxtLink>
          </div>

          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 font-medium transition" active-class="text-blue-600 border-b-2 border-blue-600"> Home </NuxtLink>
            <NuxtLink to="/about" class="text-gray-600 hover:text-blue-600 font-medium transition" active-class="text-blue-600 border-b-2 border-blue-600"> About </NuxtLink>
          </div>

          <div class="flex items-center">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">Get Started</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm p-6 min-h-[60vh]">
        <slot />
      </div>
    </main>

    <footer class="bg-white border-t border-gray-200 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-gray-500 text-sm">© {{ new Date().getFullYear() }} NuxtApp Inc. All rights reserved.</div>
          <div class="flex space-x-6 text-sm">
            <NuxtLink to="#" class="text-gray-400 hover:text-gray-600">Privacy Policy</NuxtLink>
            <NuxtLink to="#" class="text-gray-400 hover:text-gray-600">Terms of Service</NuxtLink>
            <NuxtLink to="#" class="text-gray-400 hover:text-gray-600">Contact</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Transisi halus saat pindah halaman */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
