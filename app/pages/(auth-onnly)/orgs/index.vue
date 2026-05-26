<script setup lang="ts">
const { $authClient } = useNuxtApp();
import { useOrgsTabsStore } from "~/stores/orgs-tabs";

const orgsTabStore = useOrgsTabsStore();
const orgs = $authClient.useListOrganizations();

useHead({
  title: "Organisasi - MyUangGwe | Kelola Keuangan Tim",
  meta: [
    {
      name: "description",
      content:
        "Buat atau kelola organisasi untuk kolaborasi keuangan tim, bisnis kecil, atau kelompok.",
    },
    {
      name: "keywords",
      content:
        "buat organisasi, kolaborasi keuangan, keuangan tim, bisnis kecil, kelompok keuangan",
    },
  ],
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <UiTabs v-model:modelValue="orgsTabStore.activeTab" default-value="create">
      <UiTabsList>
        <UiTabsTrigger value="create">Buat</UiTabsTrigger>
        <UiTabsTrigger value="enter">Gabung</UiTabsTrigger>
        <UiTabsTrigger value="invite" :disabled="!orgs?.data"
          >Undang</UiTabsTrigger
        >
      </UiTabsList>
      <UiTabsContent value="create"><FormsOrgsCreate /></UiTabsContent>
      <UiTabsContent value="enter"><FormsOrgsEnter /></UiTabsContent>
      <UiTabsContent value="invite"><FormsOrgsInvite /></UiTabsContent>
    </UiTabs>
  </div>
</template>
