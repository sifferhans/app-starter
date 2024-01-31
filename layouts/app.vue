<script lang="ts" setup>
const { logout } = useAuth();
</script>

<template>
  <div>
    <nav
      class="p-4 border-b border-b-gray-200 dark:border-b-gray-800 flex gap-4 justify-between items-center"
    >
      <NuxtLink to="/" class="font-bold">App</NuxtLink>
      <UButton @click="logout" variant="solid" color="gray" size="xs">
        Log out
      </UButton>
    </nav>
    <slot />
  </div>
</template>
