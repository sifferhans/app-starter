<script lang="ts" setup>
import type { User } from "lucia";

defineProps<{
  users: User[];
}>();

const userColumns = [
  { key: "email", label: "Email", sortable: true },
  { key: "username", label: "Username", sortable: true },
  { key: "role", label: "Role" },
  { key: "actions" },
];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<template>
  <UTable
    :rows="users"
    :columns="userColumns"
    class="bg-white rounded-xl shadow"
  >
    <template #role-data="{ row }">
      {{ capitalize(row.role) }}
    </template>
    <template #actions-data="{ row }">
      <UButton size="xs" color="white" :to="`/admin/users/${row.id}`">
        Edit
      </UButton>
    </template>
  </UTable>
</template>
