<script setup lang="ts">
const { $authClient } = useNuxtApp();
import { useOrgsTabsStore } from "~/stores/orgs-tabs";

const orgsTabStore = useOrgsTabsStore();
const orgs = $authClient.useListOrganizations();

useHead({
  title: "Organizations | Manage Team Finances",
  meta: [
    {
      name: "description",
      content:
        "Create or manage organizations for team, small business, or group financial collaboration.",
    },
    {
      name: "keywords",
      content: "myuanggwe app, manajemen keuangan organisasi tim UKM, collaborative finance app Indonesia, shared budget team expense tracking, bisnis kecil kelola uang bersama, organisasi karang taruna keuangan, UKM catat pemasukan pengeluaran tim, multi-user financial management gratis, kolaborasi catatan keuangan kelompok, owner admin member role-based access, keuangan transparan untuk organisasi, aplikasi kas organisasi digital, joint account digital untuk tim proyek, alternatif buku kas organisasi tradisional, shared financial dashboard untuk bisnis kecil",
    },
  ],
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="mx-auto flex min-h-[60vh] items-center justify-center p-4">
    <UiTabs v-model:modelValue="orgsTabStore.activeTab" default-value="create" class="w-full max-w-md">
      <UiTabsList class="w-full">
        <UiTabsTrigger value="create" class="flex-1 text-xs sm:text-sm">Create</UiTabsTrigger>
        <UiTabsTrigger value="enter" class="flex-1 text-xs sm:text-sm">Join</UiTabsTrigger>
        <UiTabsTrigger value="invite" class="flex-1 text-xs sm:text-sm" :disabled="!orgs?.data">Invite</UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent value="create"><OrgsFormsCreate /></UiTabsContent>
      <UiTabsContent value="enter"><OrgsFormsEnter /></UiTabsContent>
      <UiTabsContent value="invite"><OrgsFormsInvite /></UiTabsContent>
    </UiTabs>
  </div>
</template>
