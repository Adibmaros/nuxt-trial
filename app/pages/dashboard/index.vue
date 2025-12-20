<script setup lang="ts">
definePageMeta({
  middleware: ["auth"] as unknown as any, // Gunakan middleware untuk protect page
});

const { loggedIn, user, clear } = useUserSession();
const router = useRouter();

const logout = async () => {
  await $fetch("/api/auth/logout", { method: "POST" });
  await clear();
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Dashboard</h1>
          <button @click="logout" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Logout</button>
        </div>

        <div v-if="user" class="space-y-4">
          <p><strong>Name:</strong> {{ (user as any).name }}</p>
          <p><strong>Email:</strong> {{ (user as any).email }}</p>
          <p><strong>User ID:</strong> {{ (user as any).id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
