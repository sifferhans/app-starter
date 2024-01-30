<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import type { Input } from "valibot";
import { LoginSchema } from "~/types/auth";

const state = reactive<Input<typeof LoginSchema>>({
  email: "",
  password: "",
});

const { login } = useAuth();

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  await login(event.data.email, event.data.password);
}

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <UForm
      :state="state"
      :schema="LoginSchema"
      @submit="onSubmit"
      class="space-y-4 max-w-[40ch] w-full p-6 border dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900"
    >
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit" block>Log in</UButton>
    </UForm>
    <p class="dark:text-gray-400">
      Don't have an account?
      <NuxtLink to="/signup" class="underline dark:text-white">
        Sign up
      </NuxtLink>
    </p>
  </div>
</template>
