<script lang="ts" setup>
const route = useRoute("admin-users-id");

const { data: user } = await useFetch(`/api/users/${route.params.id}`);
</script>

<template>
  <div v-if="user">
    <h1 class="text-2xl text-gray-500">{{ user.username }}</h1>
    <p>{{ user.email }}</p>
  </div>
</template>
