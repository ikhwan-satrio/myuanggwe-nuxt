<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { toast } from "vue-sonner";
import type { WalletType } from "~~/server/lib/db/schemas";

const { $apolloClient } = useNuxtApp();

useHead({
  title: "Dompet - MyUangGwe | Kelola Rekening & Saldo Keuangan",
  meta: [
    {
      name: "description",
      content:
        "Kelola semua rekening dan dompet keuangan Anda - bank, kartu kredit, dan tunai - dalam satu tempat.",
    },
    {
      name: "keywords",
      content:
        "dompet digital, rekening bank, manajemen saldo, pengelolaan keuangan, aplikasi keuangan",
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
    toast.success("Dompet dihapus");
    await refreshWallets();
  } catch {
    toast.error("Gagal menghapus dompet");
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dompet Saya</h1>
        <p class="text-sm text-muted-foreground">
          Kelola rekening keuangan kamu.
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
