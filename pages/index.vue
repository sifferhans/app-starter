<script lang="ts" setup>
const { user } = useAuth();
</script>

<template>
  <h1 class="text-2xl text-gray-500 mt-8">
    Welcome back, {{ user.username }}.
  </h1>
</template>
