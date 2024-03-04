<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"],
});

const { data: users } = await useFetch("/api/users");

const userColumns = [
  { key: "id", label: "ID" },
  { key: "username", label: "Username", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role" },
];
</script>

<template>
  <div>
    <h1 class="text-2xl text-gray-500 my-8">Admin</h1>

    <section id="users">
      <h2 class="text-xl mb-2">Users</h2>
      <UTable
        :rows="users"
        :columns="userColumns"
        class="bg-white rounded-xl shadow"
      >
        <template #role-data="{ row }">
          <UBadge color="white">{{ row.role }}</UBadge>
        </template>
      </UTable>
    </section>
  </div>
</template>
