<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { toast } from "vue-sonner";
import { loginSchema } from "~/lib/@type-schemas/login";
import { useAuthTabsStore } from "~/stores/auth-tabs";

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
  <UiCard class="w-full">
    <UiCardHeader class="space-y-1.5 text-center px-4 sm:px-6 pt-4 sm:pt-6">
      <UiCardTitle class="text-xl sm:text-2xl font-bold">Sign In</UiCardTitle>
      <UiCardDescription class="text-xs sm:text-sm">
        Welcome back! Sign in to manage your finances
      </UiCardDescription>
    </UiCardHeader>

    <UiCardContent class="px-4 sm:px-6">
      <form @submit.prevent="form.handleSubmit" class="space-y-4">
        <form.Field name="email">
          <template #default="{ field }">
            <UiFormItem>
              <UiLabel :for="field.name" class="text-xs sm:text-sm">Email</UiLabel>
              <UiInput
                :id="field.name"
                :name="field.name"
                type="email"
                :value="field.state.value"
                placeholder="john@example.com"
                class="h-9 sm:h-10 text-xs sm:text-sm"
                @input="
                  field.handleChange(($event.target as HTMLInputElement).value)
                "
                @blur="field.handleBlur"
              />
              <p
                v-if="!field.state.meta.isValid"
                class="text-xs text-destructive"
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

        <form.Field name="password">
          <template #default="{ field }">
            <UiFormItem>
              <UiLabel :for="field.name" class="text-xs sm:text-sm">Password</UiLabel>
              <UiInput
                :id="field.name"
                :name="field.name"
                type="password"
                :value="field.state.value"
                placeholder="••••••••"
                class="h-9 sm:h-10 text-xs sm:text-sm"
                @input="
                  field.handleChange(($event.target as HTMLInputElement).value)
                "
                @blur="field.handleBlur"
              />
              <p
                v-if="!field.state.meta.isValid"
                class="text-xs text-destructive"
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

        <form.Subscribe>
          <template #default="{ errorMap }">
            <p
              v-if="errorMap.onSubmit"
              class="text-xs sm:text-sm text-destructive text-center"
            >
              {{ errorMap.onSubmit }}
            </p>
          </template>
        </form.Subscribe>

        <form.Subscribe>
          <template #default="{ canSubmit, isSubmitting }">
            <UiButton
              type="submit"
              class="w-full h-9 sm:h-10 text-xs sm:text-sm"
              :disabled="!canSubmit || isSubmitting"
            >
              <Icon
                v-if="isSubmitting"
                name="lucide:loader-2"
                size="16"
                class="animate-spin"
              />
              {{ isSubmitting ? "Signing in..." : "Sign In" }}
            </UiButton>
          </template>
        </form.Subscribe>
      </form>
    </UiCardContent>

    <UiCardFooter class="justify-center px-4 sm:px-6 pb-4 sm:pb-6">
      <p class="text-xs sm:text-sm text-muted-foreground">
        Don't have an account?
        <button
          class="text-foreground underline font-medium"
          @click="authTabsStore.setActiveTab('register')"
        >
          Register
        </button>
      </p>
    </UiCardFooter>
  </UiCard>
</template>
