<script setup lang="ts">
definePageMeta({
  layout: "auth" as any,
});

const router = useRouter();
const { fetch } = useUserSession();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const loading = ref(false);

const register = async () => {
  error.value = "";

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;

  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
      },
    });

    // Refresh session
    await fetch();

    // Redirect ke dashboard
    router.push("/dashboard");
  } catch (e: any) {
    error.value = e.data?.message || "Registration failed";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div>
        <h2 class="text-center text-3xl font-bold">Register</h2>
      </div>

      <form @submit.prevent="register" class="space-y-6">
        <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded">
          {{ error }}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="name" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" required minlength="8" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input v-model="confirmPassword" type="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <button type="submit" :disabled="loading" class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50">
          {{ loading ? "Loading..." : "Register" }}
        </button>

        <p class="text-center text-sm">
          Sudah punya akun?
          <NuxtLink to="/login" class="text-blue-600 hover:text-blue-700"> Login </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
