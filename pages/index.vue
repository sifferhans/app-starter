<script lang="ts" setup>
const { data: user } = await useFetch("/api/user");
</script>

<template>
  <h1>Home</h1>
  <form action="/api/auth/logout" method="post">
    <button>Log out</button>
  </form>
  <pre>{{ user }}</pre>
</template>
