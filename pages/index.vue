<script lang="ts" setup>
const { user, logout } = useAuth();
</script>

<template>
  <h1>Home</h1>
  <form @submit.prevent="logout">
    <button>Log out</button>
  </form>
  <pre>{{ user }}</pre>
</template>
