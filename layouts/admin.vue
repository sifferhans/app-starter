<script lang="ts" setup>
const { user } = useAuth();
</script>

<template>
  <main>
    <slot />
    <pre>{{ user }}</pre>
  </main>
</template>
