<script setup lang="ts">
definePageMeta({
  layout: "auth" as any, // opsional, buat layout khusus auth
});

const router = useRouter();
const { fetch } = useUserSession();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const login = async () => {
  error.value = "";
  loading.value = true;

  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    // Refresh session
    await fetch();

    // Redirect ke dashboard
    router.push("/dashboard");
  } catch (e: any) {
    error.value = e.data?.message || "Login failed";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div>
        <h2 class="text-center text-3xl font-bold">Login</h2>
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded">
          {{ error }}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <button type="submit" :disabled="loading" class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50">
          {{ loading ? "Loading..." : "Login" }}
        </button>

        <p class="text-center text-sm">
          Belum punya akun?
          <NuxtLink to="/register" class="text-blue-600 hover:text-blue-700"> Register </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
