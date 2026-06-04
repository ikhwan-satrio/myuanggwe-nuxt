<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { toast } from "vue-sonner";
import { useMutation } from "@vue/apollo-composable";
import type { TransactionType } from "~/lib/dto/transactions";
import type { CategoryType, WalletType } from "~~/server/lib/db/schemas";
import { useTransactionsCrudStore } from "~/stores/crud/transactions";
import { transactionSchema } from "~/lib/@type-schemas/transactions";

const store = useTransactionsCrudStore();
const emit = defineEmits<{ updated: [] }>();

const { formatCurrency } = useCurrency();
const { $apolloClient } = useNuxtApp();

const { data: walletsData } = useAsyncData<WalletType[]>(
  "wallets",
  async () => {
    const result = await $apolloClient.query({
      query: GET_WALLETS,
      fetchPolicy: "network-only",
    });
    return result.data.wallets;
  },
  { lazy: true },
);

const { data: categoriesData } = useAsyncData<CategoryType[]>(
  "categories",
  async () => {
    const result = await $apolloClient.query({
      query: GET_CATEGORIES,
      fetchPolicy: "network-only",
    });
    return result.data.categories;
  },
  { lazy: true },
);

const wallets = computed(() => walletsData.value ?? []);
const categories = computed(() => categoriesData.value ?? []);

const { mutate } = useMutation(UPDATE_TRANSACTION);

const transactionForm = useForm({
  validators: {
    onChange: transactionSchema,
    onSubmit: transactionSchema,
  },
  defaultValues: {
    type: "expense" as TransactionType,
    amount: 0,
    walletId: "",
    toWalletId: "",
    categoryId: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  },
  onSubmit: async ({ value }) => {
    if (!store.editingTransaction) return;
    try {
      const input: any = {
        type: value.type,
        amount: value.amount,
        walletId: value.walletId,
        description: value.description || null,
        date: new Date(value.date!).toISOString(),
      };

      if (value.type === "transfer") {
        input.toWalletId = value.toWalletId;
      } else {
        input.categoryId = value.categoryId;
      }

      await mutate({ id: store.editingTransaction.id, input });

      toast.success("Transaksi berhasil diubah");
      store.closeEdit();
      emit("updated");
    } catch (e) {
      toast.error("Terjadi kesalahan");
    }
  },
});

watch(
  () => store.editingTransaction,
  (tx) => {
    if (!tx) return;
    transactionForm.setFieldValue("type", tx.type as TransactionType);
    transactionForm.setFieldValue("amount", tx.amount);
    transactionForm.setFieldValue("walletId", tx.wallet.id);
    transactionForm.setFieldValue("toWalletId", tx.toWallet?.id ?? "");
    transactionForm.setFieldValue("categoryId", tx.category?.id ?? "");
    transactionForm.setFieldValue("description", tx.description ?? "");
    transactionForm.setFieldValue(
      "date",
      new Date(tx.date).toISOString().split("T")[0],
    );
  },
  { immediate: true },
);

const formValues = transactionForm.useStore((s) => s.values);

const selectedWallet = computed(
  () =>
    wallets.value.find((w) => w.id === formValues.value.walletId)?.name ??
    "Pilih Dompet",
);
const selectedToWallet = computed(
  () =>
    wallets.value.find((w) => w.id === formValues.value.toWalletId)?.name ??
    "Pilih Dompet Tujuan",
);
const selectedCategory = computed(
  () =>
    categories.value.find((c) => c.id === formValues.value.categoryId)?.name ??
    "Pilih Kategori",
);
const filteredCategories = computed(() =>
  categories.value.filter((c) => c.type === formValues.value.type),
);

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID");
}
</script>

<template>
  <UiSheet :open="store.editOpen" @update:open="store.closeEdit()">
    <UiSheetContent side="right" class="overflow-y-auto">
      <UiSheetHeader>
        <UiSheetTitle
          >Edit Transaksi
          {{
            store.editingTransaction
              ? formatDate(String(store.editingTransaction.date))
              : ""
          }}</UiSheetTitle
        >
        <UiSheetDescription
          >Ubah informasi transaksi tanggal
          {{
            store.editingTransaction
              ? formatDate(String(store.editingTransaction.date))
              : ""
          }}</UiSheetDescription
        >
      </UiSheetHeader>

      <form
        class="space-y-4 p-4"
        @submit.prevent="transactionForm.handleSubmit()"
      >
        <transactionForm.Field name="type">
          <template #default="{ field }">
            <UiTabs
              :model-value="field.state.value"
              @update:model-value="
                (v) => field.handleChange(v as TransactionType)
              "
            >
              <UiTabsList class="grid w-full grid-cols-3">
                <UiTabsTrigger value="expense">Keluar</UiTabsTrigger>
                <UiTabsTrigger value="income">Masuk</UiTabsTrigger>
                <UiTabsTrigger value="transfer">Transfer</UiTabsTrigger>
              </UiTabsList>
            </UiTabs>
          </template>
        </transactionForm.Field>

        <transactionForm.Field name="amount">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="edit-amount">Jumlah (Rp)</UiLabel>
              <UiInput
                id="edit-amount"
                type="number"
                :value="field.state.value"
                placeholder="0"
                min="0"
                @blur="field.handleBlur()"
                @input="
                  (e: Event) =>
                    field.handleChange(
                      Number((e.target as HTMLInputElement).value),
                    )
                "
              />
              <p
                v-if="field.state.meta.errors.length > 0"
                class="text-xs text-destructive"
              >
                {{ field.state.meta.errors[0]?.message }}
              </p>
            </div>
          </template>
        </transactionForm.Field>

        <transactionForm.Field name="walletId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>{{
                formValues.type === "transfer" ? "Dari Dompet" : "Dompet"
              }}</UiLabel>
              <UiSelect
                :model-value="field.state.value"
                @update:model-value="(v) => field.handleChange(v as string)"
              >
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ selectedWallet }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="wallet in wallets"
                    :key="wallet.id"
                    :value="wallet.id"
                  >
                    {{ wallet.name }} ({{ formatCurrency(wallet.balance) }})
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <p
                v-if="field.state.meta.errors.length > 0"
                class="text-xs text-destructive"
              >
                {{ field.state.meta.errors[0]?.message }}
              </p>
            </div>
          </template>
        </transactionForm.Field>

        <transactionForm.Field
          v-if="formValues.type === 'transfer'"
          name="toWalletId"
        >
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Ke Dompet</UiLabel>
              <UiSelect
                :model-value="field.state.value"
                @update:model-value="(v) => field.handleChange(v as string)"
              >
                <UiSelectTrigger class="w-full border-dashed border-primary">
                  <UiSelectValue>{{ selectedToWallet }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="wallet in wallets.filter(
                      (w) => w.id !== formValues.walletId,
                    )"
                    :key="wallet.id"
                    :value="wallet.id"
                  >
                    {{ wallet.name }} ({{ formatCurrency(wallet.balance) }})
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <p
                v-if="field.state.meta.errors.length > 0"
                class="text-xs text-destructive"
              >
                {{ field.state.meta.errors[0]?.message }}
              </p>
            </div>
          </template>
        </transactionForm.Field>

        <transactionForm.Field v-else name="categoryId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Kategori</UiLabel>
              <UiSelect
                :model-value="field.state.value"
                @update:model-value="(v) => field.handleChange(v as string)"
              >
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ selectedCategory }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="cat in filteredCategories"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.icon ?? "" }} {{ cat.name }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <p
                v-if="field.state.meta.errors.length > 0"
                class="text-xs text-destructive"
              >
                {{ field.state.meta.errors[0]?.message }}
              </p>
            </div>
          </template>
        </transactionForm.Field>

        <transactionForm.Field name="description">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="edit-description">Keterangan (Opsional)</UiLabel>
              <UiInput
                id="edit-description"
                :value="field.state.value"
                placeholder="Makan siang, dsb"
                @blur="field.handleBlur()"
                @input="
                  (e: Event) =>
                    field.handleChange((e.target as HTMLInputElement).value)
                "
              />
            </div>
          </template>
        </transactionForm.Field>

        <transactionForm.Field name="date">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="edit-date">Tanggal</UiLabel>
              <UiInput
                id="edit-date"
                type="date"
                :value="field.state.value"
                @blur="field.handleBlur()"
                @input="
                  (e: Event) =>
                    field.handleChange((e.target as HTMLInputElement).value)
                "
              />
            </div>
          </template>
        </transactionForm.Field>

        <transactionForm.Subscribe>
          <template #default="{ isSubmitting }">
            <UiButton type="submit" class="w-full" :disabled="isSubmitting">
              <Icon
                v-if="isSubmitting"
                name="lucide:loader-2"
                class="mr-2 h-4 w-4 animate-spin"
              />
              {{ isSubmitting ? "Menyimpan..." : "Simpan Perubahan" }}
            </UiButton>
          </template>
        </transactionForm.Subscribe>
      </form>
    </UiSheetContent>
  </UiSheet>
</template>
