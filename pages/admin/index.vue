<script lang="ts" setup>
definePageMeta({
  middleware: ["admin"],
});

const { data: users } = await useFetch("/api/users");
</script>

<template>
  <div class="grid gap-6 grid-cols-4">
    <h1 class="text-2xl text-gray-500 col-span-full">Admin</h1>

    <AdminDashboardTile
      v-if="users?.length"
      title="Newest users"
      class="col-span-2"
    >
      <AdminDashboardUsers :users="users" />
    </AdminDashboardTile>
  </div>
</template>
