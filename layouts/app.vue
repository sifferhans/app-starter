<script lang="ts" setup>
const { logout } = useAuth();
</script>

<template>
  <div>
    <nav
      class="p-4 bg-white border-b border-b-gray-200 dark:border-b-gray-800 flex gap-4 justify-between items-center"
    >
      <NuxtLink to="/" class="font-bold">App</NuxtLink>
      <UButton @click="logout" variant="solid" color="white" size="xs">
        Log out
      </UButton>
    </nav>
    <slot />
  </div>
</template>
