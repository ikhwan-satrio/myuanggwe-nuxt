<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { toast } from "vue-sonner";
import { loginSchema } from "~/lib/@type-schemas/login";

const { $authClient } = useNuxtApp();

const authTabsStore = useAuthTabsStore();

const form = useForm({
  defaultValues: {
    email: "",
    password: "",
  },
  validators: {
    onChange: loginSchema,
    onSubmit: loginSchema,
  },
  onSubmit: async ({ value }) => {
    const { error } = await $authClient.signIn.email({
      email: value.email,
      password: value.password,
      fetchOptions: {
        onError: ({ error }) => {
          toast.error(error.message || "failed to login");
        },
      },
    });

    if (error) {
      toast.error(error.message || "failed to login");
      return;
    }
    
    await refreshNuxtData()
    navigateTo("/dashboard");
  },
});
</script>

<template>
  <UiCard class="w-87.5">
    <UiCardHeader class="space-y-1 text-center">
      <UiCardTitle class="text-2xl font-bold">Login</UiCardTitle>
      <UiCardDescription>
        Selamat datang kembali! Masuk untuk mengelola keuangan kamu
      </UiCardDescription>
    </UiCardHeader>

    <UiCardContent>
      <form @submit.prevent="form.handleSubmit" class="space-y-4">
        <!-- Email -->
        <form.Field name="email">
          <template #default="{ field }">
            <UiFormItem>
              <UiLabel :for="field.name">Email</UiLabel>
              <UiInput
                :id="field.name"
                :name="field.name"
                type="email"
                :value="field.state.value"
                placeholder="john@example.com"
                @input="
                  field.handleChange(($event.target as HTMLInputElement).value)
                "
                @blur="field.handleBlur"
              />

              <p
                v-if="!field.state.meta.isValid"
                class="text-sm text-destructive"
              >
                <span
                  v-for="(err, i) in field.state.meta.errors"
                  :key="i"
                  class="block"
                >
                  * {{ err?.message }}
                </span>
              </p>
            </UiFormItem>
          </template>
        </form.Field>

        <!-- Password -->
        <form.Field name="password">
          <template #default="{ field }">
            <UiFormItem>
              <UiLabel :for="field.name">Password</UiLabel>
              <UiInput
                :id="field.name"
                :name="field.name"
                type="password"
                :value="field.state.value"
                placeholder="••••••••"
                @input="
                  field.handleChange(($event.target as HTMLInputElement).value)
                "
                @blur="field.handleBlur"
              />
              <p
                v-if="!field.state.meta.isValid"
                class="text-sm text-destructive"
              >
                <span
                  v-for="(err, i) in field.state.meta.errors"
                  :key="i"
                  class="block"
                >
                  * {{ err?.message }}
                </span>
              </p>
            </UiFormItem>
          </template>
        </form.Field>

        <!-- Submit Error -->
        <form.Subscribe>
          <template #default="{ errorMap }">
            <p
              v-if="errorMap.onSubmit"
              class="text-sm text-destructive text-center"
            >
              {{ errorMap.onSubmit }}
            </p>
          </template>
        </form.Subscribe>

        <!-- Submit Button -->
        <form.Subscribe>
          <template #default="{ canSubmit, isSubmitting }">
            <UiButton
              type="submit"
              class="w-full"
              :disabled="!canSubmit || isSubmitting"
            >
              <Icon
                v-if="isSubmitting"
                name="lucide:loader-2"
                size="16"
                class="animate-spin"
              />
              {{ isSubmitting ? "Login..." : "Login" }}
            </UiButton>
          </template>
        </form.Subscribe>
      </form>
    </UiCardContent>

    <UiCardFooter class="justify-center">
      <p class="text-sm text-muted-foreground">
        Sudah punya akun?
        <button
          class="text-foreground underline"
          @click="authTabsStore.setActiveTab('register')"
        >
          Register
        </button>
      </p>
    </UiCardFooter>
  </UiCard>
</template>
