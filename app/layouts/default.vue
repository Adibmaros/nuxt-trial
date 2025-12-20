<script setup lang="ts">
import { computed } from "vue";
const { loggedIn, user, clear } = useUserSession();
const router = useRouter();

const displayName = computed(() => (user as any)?.name ?? "");

const logout = async () => {
  await $fetch("/api/auth/logout", { method: "POST" });
  await clear();
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900"> My App </NuxtLink>
          </div>

          <div class="flex items-center space-x-4">
            <template v-if="loggedIn">
              <NuxtLink to="/dashboard" class="text-gray-700 hover:text-gray-900"> Dashboard </NuxtLink>
              <div class="flex items-center space-x-3">
                <span class="text-sm text-gray-600">{{ displayName }}</span>
                <button @click="logout" class="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md">Logout</button>
              </div>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="text-gray-700 hover:text-gray-900"> Login </NuxtLink>
              <NuxtLink to="/register" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"> Register </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main>
      <slot />
    </main>
  </div>
</template>
