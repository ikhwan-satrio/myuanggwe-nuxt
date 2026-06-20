<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { toast } from "vue-sonner";
import { useMutation } from "@vue/apollo-composable";
import type { TransactionType } from "~/lib/dto/transactions";
import type { CategoryType, WalletType } from "~~/server/lib/db/schemas";
import { useTransactionsCrudStore } from "~/stores/crud/transactions";
import { transactionSchema } from "~/lib/@type-schemas/transactions";

const store = useTransactionsCrudStore();
const emit = defineEmits<{ created: [] }>();

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

const { mutate } = useMutation(CREATE_TRANSACTION);

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
    fromAmount: 0,
    afterTransaction: "",
    date: new Date().toISOString().split("T")[0],
  },
  onSubmit: async ({ value }) => {
    try {
      const wallet = wallets.value.find((w) => w.id === value.walletId)
      const input: any = {
        type: value.type,
        amount: value.amount,
        walletId: value.walletId,
        currency: wallet?.currency ?? 'IDR',
        description: value.description || null,
        fromAmount: value.fromAmount > 0 ? value.fromAmount : null,
        afterTransaction: value.afterTransaction || null,
        date: new Date(value.date!).toISOString(),
      };

      if (value.type === "transfer") {
        input.toWalletId = value.toWalletId;
      } else {
        input.categoryId = value.categoryId;
      }

      await mutate({ input });

      toast.success("Transaction recorded successfully");
      store.closeCreate();
      transactionForm.reset();
      emit("created");
    } catch {
      toast.error("An error occurred");
    }
  },
});

const formValues = transactionForm.useStore((s) => s.values);

const selectedWallet = computed(
  () =>
    wallets.value.find((w) => w.id === formValues.value.walletId)?.name ??
    "Select Wallet",
);
const selectedToWallet = computed(
  () =>
    wallets.value.find((w) => w.id === formValues.value.toWalletId)?.name ??
    "Select Destination Wallet",
);
const selectedCategory = computed(
  () =>
    categories.value.find((c) => c.id === formValues.value.categoryId)?.name ??
    "Select Category",
);
const filteredCategories = computed(() =>
  categories.value.filter((c) => c.type === formValues.value.type),
);
</script>

<template>
  <UiDialog :open="store.createOpen" @update:open="store.closeCreate()">
    <UiDialogTrigger as-child>
      <UiButton size="sm" class="gap-2" @click="store.openCreate()">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" /> Record Transaction
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-md w-[95vw] max-w-[95vw] sm:max-w-md">
      <UiDialogHeader>
        <UiDialogTitle>Add Transaction</UiDialogTitle>
        <UiDialogDescription>Record income, expenses, or transfers between wallets.</UiDialogDescription>
      </UiDialogHeader>
      <form class="space-y-4" @submit.prevent="transactionForm.handleSubmit()">
        <transactionForm.Field name="type">
          <template #default="{ field }">
            <UiTabs
              :model-value="field.state.value"
              @update:model-value="(v) => field.handleChange(v as TransactionType)"
            >
              <UiTabsList class="grid w-full grid-cols-3">
                <UiTabsTrigger value="expense">Expense</UiTabsTrigger>
                <UiTabsTrigger value="income">Income</UiTabsTrigger>
                <UiTabsTrigger value="transfer">Transfer</UiTabsTrigger>
              </UiTabsList>
            </UiTabs>
          </template>
        </transactionForm.Field>

        <transactionForm.Field name="amount">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="amount">Amount</UiLabel>
              <UiInput
                id="amount"
                type="number"
                :value="field.state.value"
                placeholder="0"
                min="0"
                @blur="field.handleBlur()"
                @input="
                  (e: Event) =>
                    field.handleChange(Number((e.target as HTMLInputElement).value))
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
                formValues.type === "transfer" ? "From Wallet" : "Wallet"
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
                    {{ wallet.name }} ({{ formatCurrency(wallet.balance, wallet.currency) }})
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
              <UiLabel>To Wallet</UiLabel>
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
                    {{ wallet.name }} ({{ formatCurrency(wallet.balance, wallet.currency) }})
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
              <UiLabel>Category</UiLabel>
              <UiSelect
                :model-value="field.state.value"
                @update:model-value="(v)=> field.handleChange(v as string)"
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
              <UiLabel for="description">Note (Optional)</UiLabel>
              <UiInput
                id="description"
                :value="field.state.value"
                placeholder="Lunch, etc."
                @blur="field.handleBlur()"
                @input="
                  (e: Event) =>
                    field.handleChange((e.target as HTMLInputElement).value)
                "
              />
            </div>
          </template>
        </transactionForm.Field>

        <transactionForm.Field name="fromAmount">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="fromAmount">Original Amount (Optional)</UiLabel>
              <UiInput
                id="fromAmount"
                type="number"
                :value="field.state.value || ''"
                placeholder="0"
                min="0"
                @blur="field.handleBlur()"
                @input="
                  (e: Event) =>
                    field.handleChange(Number((e.target as HTMLInputElement).value))
                "
              />
              <p class="text-xs text-muted-foreground">Original amount before currency conversion</p>
            </div>
          </template>
        </transactionForm.Field>

        <transactionForm.Field name="afterTransaction">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="afterTransaction">After Transaction Note (Optional)</UiLabel>
              <UiInput
                id="afterTransaction"
                :value="field.state.value"
                placeholder="Paid off, remaining balance..."
                @blur="field.handleBlur()"
                @input="
                  (e: Event) =>
                    field.handleChange((e.target as HTMLInputElement).value)
                "
              />
              <p class="text-xs text-muted-foreground">Record result or remaining balance after this transaction</p>
            </div>
          </template>
        </transactionForm.Field>

        <transactionForm.Field name="date">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="date">Date</UiLabel>
              <UiInput
                id="date"
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
              {{ isSubmitting ? "Saving..." : "Save Transaction" }}
            </UiButton>
          </template>
        </transactionForm.Subscribe>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
