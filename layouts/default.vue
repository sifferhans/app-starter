<script lang="ts" setup>
const { logout, user } = useAuth();
</script>

<template>
  <div>
    <header
      class="p-4 bg-white border-b border-b-gray-200 dark:border-b-gray-800"
    >
      <UContainer>
        <nav class="flex gap-4 justify-between items-center">
          <NuxtLink to="/" class="font-bold">App</NuxtLink>
          <div class="flex gap-4 items-center">
            <small>{{ user.email }}</small>
            <UButton @click="logout" variant="solid" color="white" size="xs">
              Log out
            </UButton>
          </div>
        </nav>
      </UContainer>
    </header>

    <main class="p-4">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>
