<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { toast } from "vue-sonner";
import { useForm } from "@tanstack/vue-form";
import type { WalletType } from "~~/server/lib/db/schemas";
import { walletSchema } from "~/lib/@type-schemas/wallets";

const { $apolloClient } = useNuxtApp();
const { formatCurrency } = useCurrency();

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

definePageMeta({
  middleware: ["auth"],
});

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

const icons: Record<string, string> = {
  bank: "lucide:landmark",
  credit_card: "lucide:credit-card",
  cash: "lucide:banknote",
};

const typeOptions = [
  { value: "cash", label: "Tunai (Cash)" },
  { value: "bank", label: "Bank / E-Wallet" },
  { value: "credit_card", label: "Kartu Kredit" },
];

const currencyOptions = [
  { value: "IDR", label: "IDR - Rupiah" },
  { value: "USD", label: "USD - Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - Pound" },
  { value: "JPY", label: "JPY - Yen" },
];

// ============= CREATE =============
const createDialogOpen = ref(false);
const { mutate: createMutate } = useMutation(CREATE_WALLET);

const createForm = useForm({
  defaultValues: {
    name: "",
    type: "cash" as string,
    balance: 0,
    currency: "IDR",
  },
  onSubmit: async ({ value }) => {
    try {
      await createMutate({ input: value });
      toast.success("Dompet berhasil dibuat");
      createDialogOpen.value = false;
      createForm.reset();
      await refreshWallets();
    } catch {
      toast.error("Gagal membuat dompet");
    }
  },
});

// ============= EDIT =============
const editSheetOpen = ref(false);
const editingWallet = ref<WalletType | null>(null);
const { mutate: updateMutate } = useMutation(UPDATE_WALLET);

watch(editSheetOpen, (val) => {
  if (!val) editingWallet.value = null;
});

const editForm = useForm({
  defaultValues: {
    name: "",
    type: "cash" as string,
    balance: 0,
    currency: "IDR",
  },
  validators: {
    onSubmit: walletSchema,
    onChange: walletSchema,
  },
  onSubmit: async ({ value }) => {
    if (!editingWallet.value) return;
    try {
      await updateMutate({ id: editingWallet.value.id, input: value });
      toast.success("Dompet berhasil diubah");
      editSheetOpen.value = false;
      await refreshWallets();
    } catch {
      toast.error("Gagal mengubah dompet");
    }
  },
});

function handleEditClick(wallet: WalletType) {
  editingWallet.value = wallet;
  editForm.setFieldValue("name", wallet.name);
  editForm.setFieldValue("type", wallet.type);
  editForm.setFieldValue("balance", wallet.balance);
  editForm.setFieldValue("currency", wallet.currency);
  editSheetOpen.value = true;
}

// ============= DELETE =============
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
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dompet Saya</h1>
        <p class="text-sm text-muted-foreground">
          Kelola rekening keuangan kamu.
        </p>
      </div>
      <UiDialog v-model:open="createDialogOpen">
        <UiDialogTrigger as-child>
          <UiButton class="gap-2">
            <Icon name="lucide:plus" class="h-4 w-4" /> Tambah Dompet
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle>Buat Dompet Baru</UiDialogTitle>
          </UiDialogHeader>
          <form
            class="space-y-4 pt-4"
            @submit.prevent="createForm.handleSubmit()"
          >
            <createForm.Field name="name">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel :for="field.name">Nama Dompet</UiLabel>
                  <UiInput
                    :id="field.name"
                    type="text"
                    :value="field.state.value"
                    placeholder="BCA, Dana, dll"
                    @blur="field.handleBlur()"
                    @input="
                      (e: Event) =>
                        field.handleChange((e.target as HTMLInputElement).value)
                    "
                  />
                  <p
                    v-if="!field.state.meta.isValid"
                    class="text-sm text-destructive"
                  >
                    <span
                      v-for="(err, i) in field.state.meta.errors"
                      :key="i"
                      class="block"
                    >
                      * {{ (err as any).message }}
                    </span>
                  </p>
                </div>
              </template>
            </createForm.Field>

            <createForm.Field name="balance">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel :for="field.name">Saldo Awal</UiLabel>
                  <UiInput
                    :id="field.name"
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
                    class="text-sm text-destructive"
                  >
                    <span
                      v-for="(err, i) in field.state.meta.errors"
                      :key="i"
                      class="block"
                    >
                      * {{ (err as any).message }}
                    </span>
                  </p>
                </div>
              </template>
            </createForm.Field>

            <div class="grid grid-cols-2 gap-4">
              <createForm.Field name="type">
                <template #default="{ field }">
                  <div class="space-y-2">
                    <UiLabel>Tipe</UiLabel>
                    <UiSelect :model-value="field.state.value">
                      <UiSelectTrigger class="w-full">
                        <UiSelectValue>
                          {{
                            typeOptions.find(
                              (t) => t.value === field.state.value,
                            )?.label
                          }}
                        </UiSelectValue>
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

              <createForm.Field name="currency">
                <template #default="{ field }">
                  <div class="space-y-2">
                    <UiLabel>Mata Uang</UiLabel>
                    <UiSelect :model-value="field.state.value">
                      <UiSelectTrigger class="w-full">
                        <UiSelectValue>
                          {{
                            currencyOptions.find(
                              (c) => c.value === field.state.value,
                            )?.label ?? "Pilih Mata Uang"
                          }}
                        </UiSelectValue>
                      </UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectItem
                          v-for="opt in currencyOptions"
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
            </div>

            <createForm.Subscribe>
              <template #default="{ isSubmitting, canSubmit }">
                <UiButton
                  type="submit"
                  class="w-full"
                  :disabled="isSubmitting || !canSubmit"
                >
                  <Icon
                    v-if="isSubmitting"
                    name="lucide:loader-2"
                    class="mr-2 h-4 w-4 animate-spin"
                  />
                  {{ isSubmitting ? "Menyimpan..." : "Simpan Dompet" }}
                </UiButton>
              </template>
            </createForm.Subscribe>
          </form>
        </UiDialogContent>
      </UiDialog>
    </div>

    <!-- Edit Sheet -->
    <UiSheet v-model:open="editSheetOpen">
      <UiSheetContent side="right" class="overflow-y-auto">
        <UiSheetHeader>
          <UiSheetTitle>Edit {{ editingWallet?.name }}</UiSheetTitle>
          <UiSheetDescription
            >Ubah informasi dompet {{ editingWallet?.name }}</UiSheetDescription
          >
        </UiSheetHeader>
        <form class="space-y-4 p-4" @submit.prevent="editForm.handleSubmit()">
          <editForm.Field name="name">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel :for="field.name">Nama Dompet</UiLabel>
                <UiInput
                  :id="field.name"
                  type="text"
                  :value="field.state.value"
                  placeholder="BCA, Dana, dll"
                  @blur="field.handleBlur()"
                  @input="
                    (e: Event) =>
                      field.handleChange((e.target as HTMLInputElement).value)
                  "
                />
                <p
                  v-if="!field.state.meta.isValid"
                  class="text-sm text-destructive"
                >
                  <span
                    v-for="(err, i) in field.state.meta.errors"
                    :key="i"
                    class="block"
                  >
                    * {{ err?.message }}
                  </span>
                </p>
              </div>
            </template>
          </editForm.Field>

          <editForm.Field name="balance">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel :for="field.name">Saldo</UiLabel>
                <UiInput
                  :id="field.name"
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
                  class="text-sm text-destructive"
                >
                  <span
                    v-for="(err, i) in field.state.meta.errors"
                    :key="i"
                    class="block"
                  >
                    * {{ err?.message }}
                  </span>
                </p>
              </div>
            </template>
          </editForm.Field>

          <div class="grid grid-cols-2 gap-4">
            <editForm.Field name="type">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Tipe</UiLabel>
                  <UiSelect :model-value="field.state.value">
                    <UiSelectTrigger class="w-full">
                      <UiSelectValue>
                        {{
                          typeOptions.find((t) => t.value === field.state.value)
                            ?.label
                        }}
                      </UiSelectValue>
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
            </editForm.Field>

            <editForm.Field name="currency">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Mata Uang</UiLabel>
                  <UiSelect :model-value="field.state.value">
                    <UiSelectTrigger class="w-full">
                      <UiSelectValue>
                        {{
                          currencyOptions.find(
                            (c) => c.value === field.state.value,
                          )?.label ?? "Pilih Mata Uang"
                        }}
                      </UiSelectValue>
                    </UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem
                        v-for="opt in currencyOptions"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        {{ opt.label }}
                      </UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
              </template>
            </editForm.Field>
          </div>

          <editForm.Subscribe>
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
          </editForm.Subscribe>
        </form>
      </UiSheetContent>
    </UiSheet>

    <!-- Wallet List -->
    <div class="grid gap-4 md:grid-cols-3">
      <template v-if="pending">
        <UiCard v-for="i in 6" :key="i">
          <UiCardHeader class="flex flex-row items-center justify-between pb-2">
            <UiSkeleton class="h-4 w-24" />
            <div class="flex items-center gap-2">
              <UiSkeleton class="h-9 w-9 rounded-md" />
              <UiSkeleton class="h-9 w-9 rounded-md" />
            </div>
          </UiCardHeader>
          <UiCardContent>
            <UiSkeleton class="mb-2 h-8 w-32" />
            <UiSkeleton class="h-4 w-16" />
          </UiCardContent>
        </UiCard>
      </template>

      <template v-else>
        <UiCard v-for="wallet in wallets" :key="wallet.id">
          <UiCardHeader class="flex flex-row items-center justify-between pb-2">
            <UiCardTitle class="text-sm font-medium">{{
              wallet.name
            }}</UiCardTitle>
            <div class="flex items-center gap-2">
              <div class="rounded-md border-2 p-2">
                <Icon
                  :name="icons[wallet.type] ?? 'lucide:banknote'"
                  class="h-4 w-4"
                />
              </div>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="outline" size="icon">
                    <Icon name="lucide:more-vertical" class="h-4 w-4" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuItem @click="handleEditClick(wallet)">
                    <Icon name="lucide:pencil" class="mr-2 h-4 w-4" /> Edit
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem
                    class="text-destructive focus:text-destructive"
                    @click="handleDelete(wallet.id)"
                  >
                    <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" /> Hapus
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </div>
          </UiCardHeader>
          <UiCardContent>
            <div class="text-2xl font-bold">
              {{ formatCurrency(wallet.balance, wallet.currency) }}
            </div>
            <p class="text-xs capitalize text-muted-foreground">
              {{ wallet.type.replace("_", " ") }}
            </p>
          </UiCardContent>
        </UiCard>

        <div
          v-if="wallets.length === 0"
          class="col-span-3 py-10 text-center text-muted-foreground"
        >
          Belum ada dompet. Tambah dompet pertama kamu!
        </div>
      </template>
    </div>
  </div>
</template>
