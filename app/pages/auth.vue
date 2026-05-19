<script setup lang="ts">
const authTabsStore = useAuthTabsStore();
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
