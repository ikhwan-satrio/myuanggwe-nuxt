<script setup lang="ts">
import { useAuthTabsStore } from "~/stores/auth-tabs";

const authTabsStore = useAuthTabsStore();

useHead({
  title: "Sign In / Register",
  meta: [
    {
      name: "description",
      content:
        "Sign up or sign in to your MyUangGwe account to start tracking income, managing expenses, and achieving your financial goals.",
    },
    {
      name: "keywords",
      content:
        "myuanggwe app, daftar akun myuanggwe gratis, login aplikasi catat uang, sign up financial tracker no ads Indonesia, registrasi pengelola keuangan pribadi, buat akun nabung online, register personal expense manager, masuk akun dompet digital terintegrasi, alternative to spending tracker berbayar",
    },
  ],
});
</script>

<template>
  <div
    class="mx-auto flex min-h-dvh items-center justify-center px-3 sm:px-4 py-6"
  >
    <UiTabs
      defaultValue="register"
      v-model:modelValue="authTabsStore.activeTab"
      class="w-full max-w-sm"
    >
      <UiTabsList class="w-full">
        <UiTabsTrigger value="register" class="flex-1 text-xs sm:text-sm"
          >Register</UiTabsTrigger
        >
        <UiTabsTrigger value="login" class="flex-1 text-xs sm:text-sm"
          >Login</UiTabsTrigger
        >
      </UiTabsList>

      <UiTabsContent value="register">
        <AuthFormsRegister />
      </UiTabsContent>
      <UiTabsContent value="login">
        <AuthFormsLogin />
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
