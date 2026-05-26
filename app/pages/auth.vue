<script setup lang="ts">
import { useAuthTabsStore } from "~/stores/auth-tabs";

const authTabsStore = useAuthTabsStore();

useHead({
  title: "Masuk / Daftar - MyUangGwe | Kelola Keuangan dengan Tenang",
  meta: [
    {
      name: "description",
      content: "Daftar atau masuk ke akun MyUangGwe untuk mulai mencatat pemasukan, mengelola pengeluaran, dan mewujudkan target finansial.",
    },
    {
      name: "keywords",
      content: "daftar akun, login keuangan, registrasi aplikasi keuangan, manajemen keuangan pribadi",
    },
  ],
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <UiTabs
      defaultValue="register"
      v-model:modelValue="authTabsStore.activeTab"
    >
      <UiTabsList>
        <UiTabsTrigger value="register">Register</UiTabsTrigger>
        <UiTabsTrigger value="login">Login</UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="register">
        <FormsRegister />
      </UiTabsContent>

      <UiTabsContent value="login">
        <FormsLogin />
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
