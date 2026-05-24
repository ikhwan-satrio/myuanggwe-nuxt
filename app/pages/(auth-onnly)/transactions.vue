<script setup lang="ts">
useHead({
  title: "Transaksi - MyUangGwe | Catat Pemasukan & Pengeluaran",
  meta: [
    {
      name: "description",
      content:
        "Catat dan kelola semua transaksi keuangan Anda - pemasukan, pengeluaran, dan transfer antar dompet di satu tempat.",
    },
    {
      name: "keywords",
      content:
        "transaksi keuangan, pencatatan keuangan, pemasukan pengeluaran, manajemen keuangan, aplikasi keuangan",
    },
  ],
});

definePageMeta({
  middleware: ["auth"],
});

const open = ref(false);
</script>

<template>
  <div class="space-y-6 p-6">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Transaksi</h1>
        <p class="text-sm text-muted-foreground">Kelola transaksi.</p>
      </div>

      <UiDialog v-model:open="open">
        <UiDialogTrigger as-child>
          <UiButton @click="open = true">
            <Icon name="lucide:plus" class="mr-2 h-4 w-4" /> Catat Transaksi
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="sm:max-w-md">
          <UiDialogHeader>
            <UiDialogTitle>Tambah Transaksi</UiDialogTitle>
            <UiDialogDescription>
              Catat pemasukan, pengeluaran, atau transfer antar dompet.
            </UiDialogDescription>
          </UiDialogHeader>
          <FormsTransactionsCreate v-model:open="open" />
        </UiDialogContent>
      </UiDialog>
    </div>

    <TablesTransactionsList />
  </div>
</template>
