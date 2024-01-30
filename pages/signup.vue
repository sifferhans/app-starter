<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import type { Input } from "valibot";
import { SignupSchema } from "~/types/auth";

const state = reactive<Input<typeof SignupSchema>>({
  email: "",
  password: "",
  username: "",
});

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  try {
    await $fetch("/api/auth/signup", {
      method: "post",
      body: state,
    });

    await navigateTo("/");
  } catch (err) {}
}
</script>

<template>
  <UForm
    :state="state"
    :schema="SignupSchema"
    @submit="onSubmit"
    class="space-y-4 max-w-[45ch]"
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

    <UButton type="submit">Sign up</UButton>
  </UForm>
</template>
