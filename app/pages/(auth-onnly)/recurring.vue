<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { toast } from "vue-sonner";
import { useForm } from "@tanstack/vue-form";
import { recurringTransactionSchema } from "~/lib/@type-schemas/recurring";
import type {
  WalletType,
  CategoryType,
  RecurringTransactionType,
} from "~~/server/lib/db/schemas";

const { $apolloClient } = useNuxtApp();
const { formatCurrency } = useCurrency();

useHead({
  title: "Transaksi Rutin - MyUangGwe | Otomatisasi Pencatatan Keuangan",
  meta: [
    {
      name: "description",
      content:
        "Kelola transaksi berulang Anda seperti tagihan, langganan, atau gaji agar pencatatan keuangan menjadi otomatis dan tidak terlewat.",
    },
  ],
});

definePageMeta({
  middleware: ["auth"],
});

type RecurringItem = RecurringTransactionType & {
  wallet: { name: string };
  toWallet: { name: string } | null;
  category: { name: string; icon: string | null } | null;
};

const frequencyOptions = [
  { value: "daily", label: "Harian" },
  { value: "weekly", label: "Mingguan" },
  { value: "monthly", label: "Bulanan" },
  { value: "yearly", label: "Tahunan" },
];

const typeOptions = [
  { value: "income", label: "Pemasukan" },
  { value: "expense", label: "Pengeluaran" },
  { value: "transfer", label: "Transfer" },
];

// ============= FETCH =============
const {
  data: recurringData,
  pending,
  refresh: refreshRecurring,
} = useAsyncData<RecurringItem[]>(
  "recurring-transactions",
  async () => {
    const result = await $apolloClient.query({
      query: GET_RECURRING_TRANSACTIONS,
      fetchPolicy: "network-only",
    });
    return result.data.recurringTransactions;
  },
  { server: false, lazy: true },
);

const { data: walletsData } = useAsyncData<WalletType[]>(
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

const { data: categoriesData } = useAsyncData<CategoryType[]>(
  "categories",
  async () => {
    const result = await $apolloClient.query({
      query: GET_CATEGORIES,
      fetchPolicy: "network-only",
    });
    return result.data.categories;
  },
  { server: false, lazy: true },
);

const recurringItems = computed(() => recurringData.value ?? []);
const wallets = computed(() => walletsData.value ?? []);
const categories = computed(() => categoriesData.value ?? []);

// ============= CREATE =============
const createDialogOpen = ref(false);
const { mutate: createMutate } = useMutation(CREATE_RECURRING_TRANSACTION);

const createForm = useForm({
  defaultValues: {
    amount: 0,
    type: "expense" as string,
    frequency: "monthly" as string,
    startDate: "",
    walletId: "",
    toWalletId: null as string | null,
    categoryId: null as string | null,
    description: null as string | null,
  },
  validators: {
    onChange: recurringTransactionSchema,
    onSubmit: recurringTransactionSchema,
  },
  onSubmit: async ({ value }) => {
    try {
      await createMutate({
        input: { ...value, startDate: new Date(value.startDate).toISOString() },
      });
      toast.success("Transaksi rutin berhasil dibuat");
      createDialogOpen.value = false;
      createForm.reset();
      await refreshRecurring();
    } catch {
      toast.error("Terjadi kesalahan");
    }
  },
});

const createFormValues = createForm.useStore((s) => s.values);

const selectedWallet = computed(
  () =>
    wallets.value.find((w) => w.id === createFormValues.value.walletId)?.name ??
    "Pilih Dompet",
);
const selectedToWallet = computed(
  () =>
    wallets.value.find((w) => w.id === createFormValues.value.toWalletId)
      ?.name ?? "Pilih Dompet Tujuan",
);
const selectedCategory = computed(
  () =>
    categories.value.find((c) => c.id === createFormValues.value.categoryId)
      ?.name ?? "Pilih Kategori",
);
const filteredCategories = computed(() =>
  categories.value.filter((c) => c.type === createFormValues.value.type),
);

// ============= DELETE =============
const { mutate: deleteMutate } = useMutation(DELETE_RECURRING_TRANSACTION);

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id });
    toast.success("Transaksi rutin dihapus");
    await refreshRecurring();
  } catch {
    toast.error("Gagal menghapus transaksi rutin");
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Transaksi Rutin</h1>
        <p class="text-sm text-muted-foreground">
          Otomatisasi transaksi yang terjadi berulang kali.
        </p>
      </div>
      <UiDialog v-model:open="createDialogOpen">
        <UiDialogTrigger as-child>
          <UiButton class="gap-2">
            <Icon name="lucide:plus" class="h-4 w-4" /> Tambah Transaksi Rutin
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="max-h-[90vh] overflow-y-auto">
          <UiDialogHeader>
            <UiDialogTitle>Tambah Transaksi Rutin</UiDialogTitle>
          </UiDialogHeader>
          <form
            class="space-y-4 p-4"
            @submit.prevent="createForm.handleSubmit()"
          >
            <!-- Amount -->
            <createForm.Field name="amount">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel for="amount">Jumlah</UiLabel>
                  <UiInput
                    id="amount"
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
                    v-if="!field.state.meta.isValid"
                    class="text-xs text-destructive"
                  >
                    <span
                      v-for="(err, i) in field.state.meta.errors"
                      :key="i"
                      class="block"
                      >* {{ err?.message }}</span
                    >
                  </p>
                </div>
              </template>
            </createForm.Field>

            <!-- Type -->
            <createForm.Field name="type">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Tipe</UiLabel>
                  <UiSelect :model-value="field.state.value">
                    <UiSelectTrigger class="w-full">
                      <UiSelectValue>{{
                        typeOptions.find((t) => t.value === field.state.value)
                          ?.label
                      }}</UiSelectValue>
                    </UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem
                        v-for="opt in typeOptions"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        {{ opt.label }}
                      </UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
              </template>
            </createForm.Field>

            <!-- Frequency -->
            <createForm.Field name="frequency">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Frekuensi</UiLabel>
                  <UiSelect :model-value="field.state.value">
                    <UiSelectTrigger class="w-full">
                      <UiSelectValue>{{
                        frequencyOptions.find(
                          (f) => f.value === field.state.value,
                        )?.label
                      }}</UiSelectValue>
                    </UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem
                        v-for="opt in frequencyOptions"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        {{ opt.label }}
                      </UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
              </template>
            </createForm.Field>

            <!-- Start Date -->
            <createForm.Field name="startDate">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel for="startDate">Tanggal Mulai</UiLabel>
                  <UiInput
                    id="startDate"
                    type="date"
                    :value="field.state.value"
                    @blur="field.handleBlur()"
                    @input="
                      (e: Event) =>
                        field.handleChange((e.target as HTMLInputElement).value)
                    "
                  />
                  <p
                    v-if="!field.state.meta.isValid"
                    class="text-xs text-destructive"
                  >
                    <span
                      v-for="(err, i) in field.state.meta.errors"
                      :key="i"
                      class="block"
                      >* {{ err?.message }}</span
                    >
                  </p>
                </div>
              </template>
            </createForm.Field>

            <!-- Wallet -->
            <createForm.Field name="walletId">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>{{
                    createFormValues.type === "transfer"
                      ? "Dari Dompet"
                      : "Dompet"
                  }}</UiLabel>
                  <UiSelect :model-value="field.state.value">
                    <UiSelectTrigger class="w-full">
                      <UiSelectValue>{{ selectedWallet }}</UiSelectValue>
                    </UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem
                        v-for="wallet in wallets"
                        :key="wallet.id"
                        :value="wallet.id"
                      >
                        {{ wallet.name }}
                      </UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
              </template>
            </createForm.Field>

            <!-- To Wallet (transfer) -->
            <createForm.Field
              v-if="createFormValues.type === 'transfer'"
              name="toWalletId"
            >
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Ke Dompet</UiLabel>
                  <UiSelect :model-value="field.state.value ?? ''">
                    <UiSelectTrigger
                      class="w-full border-dashed border-primary"
                    >
                      <UiSelectValue>{{ selectedToWallet }}</UiSelectValue>
                    </UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem
                        v-for="wallet in wallets.filter(
                          (w) => w.id !== createFormValues.walletId,
                        )"
                        :key="wallet.id"
                        :value="wallet.id"
                      >
                        {{ wallet.name }}
                      </UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
              </template>
            </createForm.Field>

            <!-- Category (income/expense) -->
            <createForm.Field v-else name="categoryId">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Kategori</UiLabel>
                  <UiSelect :model-value="field.state.value ?? ''">
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
                </div>
              </template>
            </createForm.Field>

            <!-- Description -->
            <createForm.Field name="description">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel for="description">Keterangan (Opsional)</UiLabel>
                  <UiInput
                    id="description"
                    :value="field.state.value ?? ''"
                    placeholder="Misal: Bayar Listrik, Langganan Netflix"
                    @blur="field.handleBlur()"
                    @input="
                      (e: Event) =>
                        field.handleChange(
                          (e.target as HTMLInputElement).value || null,
                        )
                    "
                  />
                </div>
              </template>
            </createForm.Field>

            <createForm.Subscribe>
              <template #default="{ isSubmitting }">
                <UiButton type="submit" class="w-full" :disabled="isSubmitting">
                  <Icon
                    v-if="isSubmitting"
                    name="lucide:loader-2"
                    class="mr-2 h-4 w-4 animate-spin"
                  />
                  {{ isSubmitting ? "Menyimpan..." : "Simpan Transaksi Rutin" }}
                </UiButton>
              </template>
            </createForm.Subscribe>
          </form>
        </UiDialogContent>
      </UiDialog>
    </div>

    <!-- List -->
    <div class="rounded-md border bg-card">
      <template v-if="pending">
        <div
          v-for="i in 3"
          :key="i"
          class="flex items-center justify-between border-b p-4 last:border-0"
        >
          <div class="flex items-center gap-3">
            <UiSkeleton class="h-10 w-10 rounded-full" />
            <div class="space-y-2">
              <UiSkeleton class="h-4 w-32" />
              <UiSkeleton class="h-3 w-24" />
            </div>
          </div>
          <UiSkeleton class="h-9 w-24" />
        </div>
      </template>

      <template v-else-if="recurringItems.length > 0">
        <div
          v-for="item in recurringItems"
          :key="item.id"
          class="flex items-center justify-between border-b p-4 transition-colors last:border-0 hover:bg-muted/50"
        >
          <div class="flex items-center gap-3">
            <div
              class="rounded-full p-2"
              :class="{
                'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400':
                  item.type === 'income',
                'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400':
                  item.type === 'expense',
                'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400':
                  item.type === 'transfer',
              }"
            >
              <Icon name="lucide:repeat" class="h-4 w-4" />
            </div>
            <div>
              <p class="font-medium">
                {{ item.description || item.category?.name || "Transfer" }}
                <UiBadge
                  variant="secondary"
                  class="ml-2 text-[10px] capitalize"
                >
                  {{ item.frequency }}
                </UiBadge>
              </p>
              <p class="text-xs text-muted-foreground">
                {{ item.wallet.name }}
                <template v-if="item.toWallet"
                  >→ {{ item.toWallet.name }}</template
                >
                • Berikutnya: {{ formatDate(String(item.nextRunDate)) }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 text-right">
            <div>
              <p class="font-bold">{{ formatCurrency(item.amount) }}</p>
              <p
                class="text-[10px]"
                :class="
                  item.isActive ? 'text-green-500' : 'text-muted-foreground'
                "
              >
                {{ item.isActive ? "Aktif" : "Nonaktif" }}
              </p>
            </div>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="outline" size="icon">
                  <Icon name="lucide:more-vertical" class="h-4 w-4" />
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem
                  class="text-destructive focus:text-destructive"
                  @click="handleDelete(item.id)"
                >
                  <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" /> Hapus
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>
        </div>
      </template>

      <div v-else class="p-8 text-center text-muted-foreground">
        Belum ada transaksi rutin.
      </div>
    </div>
  </div>
</template>
