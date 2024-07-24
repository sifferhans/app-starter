<script lang="ts" setup>
const { logout, user } = useAuth();

const links = computed(() =>
  [
    {
      label: "Admin",
      to: "/admin",
      icon: "i-heroicons-lock-closed",
      enabled: user.value?.role === "admin",
    },
    {
      label: "Dashboard",
      to: "/",
    },
  ].filter((link) => ("enabled" in link ? link.enabled : true))
);
</script>

<template>
  <div>
    <header
      class="bg-white border-b border-b-gray-200 dark:border-b-gray-800 relative"
    >
      <UContainer class="flex items-center justify-between gap-6">
        <NuxtLink to="/" class="font-bold">App</NuxtLink>

        <UHorizontalNavigation :links="links" />

        <div v-if="user" class="flex gap-4 items-center">
          <small>{{ user.email }}</small>
          <UButton variant="solid" color="white" size="xs" @click="logout">
            Log out
          </UButton>
        </div>
      </UContainer>
    </header>

    <main class="p-4">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>
