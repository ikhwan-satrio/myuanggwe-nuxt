<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { toast } from "vue-sonner";
import type { WalletType } from "~~/server/lib/db/schemas";

const { $apolloClient } = useNuxtApp();

useHead({
  title: "Wallets | Manage Accounts & Balance",
  meta: [
    {
      name: "description",
      content:
        "Manage all your financial accounts and wallets - bank, credit cards, and cash - in one place.",
    },
    {
      name: "keywords",
      content: "myuanggwe app, multi-wallet management Indonesia, kelola dompet bank e-wallet tunai, aplikasi catat saldo rekening, credit card spending tracker gratis, cashless expense manager, dompet digital terintegrasi GoPay OVO DANA, bank account aggregation tool, kelompokkan dompet untuk anggaran terpisah, digital wallet balance overview real-time, manajemen saldo multi mata uang IDR USD",
    },
  ],
});

definePageMeta({ middleware: ["auth"] });

const {
  data: walletsData,
  pending,
  refresh: refreshWallets,
} = useAsyncData<WalletType[]>(
  "wallets",
  async () => {
    const result = await $apolloClient.query({
      query: GET_WALLETS,
      fetchPolicy: "network-only",
    });
    return result.data.wallets;
  },
  { server: false, lazy: true },
);

const wallets = computed(() => walletsData.value ?? []);

const { mutate: deleteMutate } = useMutation(DELETE_WALLET);

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id });
    toast.success("Wallet deleted");
    await refreshWallets();
  } catch {
    toast.error("Failed to delete wallet");
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">My Wallets</h1>
        <p class="text-xs text-muted-foreground sm:text-sm">
          Manage your financial accounts.
        </p>
      </div>
      <FormsWalletsCreate @created="refreshWallets()" />
    </div>
    <FormsWalletsEdit @updated="refreshWallets()" />
    <TablesWalletsList
      :wallets="wallets"
      :pending="pending"
      @delete="handleDelete"
    />
  </div>
</template>
