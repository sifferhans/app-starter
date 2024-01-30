<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import type { Input } from "valibot";
import { LoginSchema } from "~/types/auth";

const state = reactive<Input<typeof LoginSchema>>({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  try {
    await $fetch("/api/auth/login", {
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
    :schema="LoginSchema"
    @submit="onSubmit"
    class="space-y-4 max-w-[45ch]"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">Log in</UButton>
  </UForm>
</template>
