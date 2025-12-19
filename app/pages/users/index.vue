<script setup lang="ts">
// Nuxt 4 otomatis mengimpor ref, useFetch, dll.
const name = ref("");
const email = ref("");
const password = ref("");
const editingId = ref<number | null>(null);

const { data: users, refresh, pending } = await useFetch("/api/users");

// Helper untuk reset form agar tidak duplikasi kode
const resetForm = () => {
  editingId.value = null;
  name.value = "";
  email.value = "";
  password.value = "";
};

const handleSubmit = async () => {
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    if (editingId.value) {
      await $fetch(`/api/users/${editingId.value}`, {
        method: "PUT",
        body: payload,
      });
    } else {
      await $fetch("/api/users", {
        method: "POST",
        body: payload,
      });
    }
    resetForm();
    await refresh(); // Ambil data terbaru
  } catch (err) {
    alert("Terjadi kesalahan saat menyimpan data");
  }
};

const editUser = (user: any) => {
  editingId.value = user.id;
  name.value = user.name;
  email.value = user.email;
  password.value = "";
};

const deleteUser = async (id: number) => {
  if (!confirm("Hapus user ini?")) return;
  await $fetch(`/api/users/${id}`, { method: "DELETE" });
  await refresh();
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 font-sans">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">User Management</h1>
      <p class="text-gray-600">Kelola data pengguna aplikasi Anda di sini.</p>
    </header>

    <div class="bg-white shadow-md rounded-lg p-6 mb-10 border border-gray-100">
      <h2 class="text-lg font-semibold mb-4 text-gray-700">
        {{ editingId ? "Edit User" : "Tambah User Baru" }}
      </h2>
      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input v-model="name" placeholder="Nama Lengkap" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" required />
        <input v-model="email" type="email" placeholder="Alamat Email" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" required />
        <input v-model="password" type="password" placeholder="Password" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" :required="!editingId" />

        <div class="md:col-span-3 flex gap-2">
          <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            {{ editingId ? "Update User" : "Simpan User" }}
          </button>
          <button v-if="editingId" type="button" @click="resetForm" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Batal</button>
        </div>
      </form>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
      <div v-if="pending" class="p-8 text-center text-gray-500">Memuat data...</div>

      <div v-else-if="users?.length === 0" class="p-8 text-center text-gray-500">Belum ada data users yang tersedia.</div>

      <table v-else class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-4 font-semibold">ID</th>
            <th class="px-6 py-4 font-semibold">User</th>
            <th class="px-6 py-4 font-semibold text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-gray-500">#{{ user.id }}</td>
            <td class="px-6 py-4">
              <div class="font-medium text-gray-800">{{ user.name }}</div>
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center gap-3">
                <button @click="editUser(user)" class="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-800 font-medium text-sm">Hapus</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
