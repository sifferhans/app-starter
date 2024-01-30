<script lang="ts" setup>
const { logout } = useAuth();
</script>

<template>
  <div>
    <nav>
      <button @click="logout">Log out</button>
    </nav>
    <slot />
  </div>
</template>
