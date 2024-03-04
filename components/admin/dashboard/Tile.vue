<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <article>
    <h2 class="mb-2">{{ title }}</h2>
    <slot></slot>
  </article>
</template>
