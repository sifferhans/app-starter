<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import type { Input } from "valibot";
import { SignupSchema } from "~/types/auth";

const state = reactive<Input<typeof SignupSchema>>({
  email: "",
  password: "",
  username: "",
});

const { signup } = useAuth();

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  await signup(event.data.email, event.data.password, event.data.username);
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center h-screen">
    <UForm
      :state="state"
      :schema="SignupSchema"
      @submit="onSubmit"
      class="space-y-4 max-w-[40ch] w-full p-6 border dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900"
    >
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Username" name="username">
        <UInput v-model="state.username" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit" block>Sign up</UButton>
    </UForm>
    <p class="dark:text-gray-400">
      Already have an account?
      <NuxtLink to="/login" class="underline dark:text-white">Log in</NuxtLink>
    </p>
  </div>
</template>
