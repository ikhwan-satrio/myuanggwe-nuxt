<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { toast } from "vue-sonner";
import { registerSchema } from "~/lib/@type-schemas/register";
import { useAuthTabsStore } from "~/stores/auth-tabs";

const { $authClient } = useNuxtApp();

const authTabsStore = useAuthTabsStore();

const form = useForm({
  defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  validators: {
    onChange: registerSchema,
    onSubmit: registerSchema,
  },
  onSubmit: async ({ value }) => {
    if (value.password !== value.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const { error } = await $authClient.signUp.email({
      name: value.name,
      email: value.email,
      password: value.password,
    });

    if (error) {
      toast.error(error.message || "Failed to register");
      return;
    }

    await refreshNuxtData();
    navigateTo("/dashboard");
  },
});
</script>

<template>
  <UiCard class="w-full">
    <UiCardHeader class="space-y-1.5 text-center px-4 sm:px-6 pt-4 sm:pt-6">
      <UiCardTitle class="text-xl sm:text-2xl font-bold">Create Account</UiCardTitle>
      <UiCardDescription class="text-xs sm:text-sm">
        Register to start managing your finances
      </UiCardDescription>
    </UiCardHeader>

    <UiCardContent class="px-4 sm:px-6">
      <form @submit.prevent="form.handleSubmit" class="space-y-4">
        <form.Field name="name">
          <template #default="{ field }">
            <UiFormItem>
              <UiLabel :for="field.name" class="text-xs sm:text-sm">Full Name</UiLabel>
              <UiInput
                :id="field.name"
                :name="field.name"
                :value="field.state.value"
                placeholder="John Doe"
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

        <form.Field name="confirmPassword">
          <template #default="{ field }">
            <UiFormItem>
              <UiLabel :for="field.name" class="text-xs sm:text-sm">Confirm Password</UiLabel>
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
              {{ isSubmitting ? "Creating account..." : "Sign Up" }}
            </UiButton>
          </template>
        </form.Subscribe>
      </form>
    </UiCardContent>

    <UiCardFooter class="justify-center px-4 sm:px-6 pb-4 sm:pb-6">
      <p class="text-xs sm:text-sm text-muted-foreground">
        Already have an account?
        <button
          class="text-foreground underline font-medium"
          @click="authTabsStore.setActiveTab('login')"
        >
          Login
        </button>
      </p>
    </UiCardFooter>
  </UiCard>
</template>
