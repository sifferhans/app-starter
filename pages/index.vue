<script lang="ts" setup>
const { user } = useAuth();

definePageMeta({
  layout: "app",
});
</script>

<template>
  <h1>Home</h1>
  <pre>{{ user }}</pre>
</template>
