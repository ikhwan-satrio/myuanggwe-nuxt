<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import { useForm } from "@tanstack/vue-form"
import { budgetSchema } from "~/lib/@type-schemas/budget"
import type { CategoryType, WalletType } from "~~/server/lib/db/schemas"
import { useBudgetsCrudStore } from "~/stores/crud/budgets"

const props = defineProps<{
  expenseCategories: CategoryType[]
  wallets: WalletType[]
}>()

const store = useBudgetsCrudStore()
const emit = defineEmits<{ created: [] }>()

const { mutate: createMutate } = useMutation(CREATE_BUDGET)
const { formatCurrency } = useCurrency()

const periodOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
]

const createForm = useForm({
  defaultValues: {
    amount: 0,
    period: "monthly" as string,
    walletId: "",
    categoryId: "",
  },
  validators: {
    onChange: budgetSchema,
    onSubmit: budgetSchema,
  },
  onSubmit: async ({ value }) => {
    try {
      await createMutate({ input: value })
      toast.success("Budget created successfully")
      store.closeCreate()
      createForm.reset()
      emit("created")
    } catch {
      toast.error("An error occurred")
    }
  },
})

const createFormValues = createForm.useStore((s) => s.values)
const selectedCreateCategory = computed(
  () => props.expenseCategories.find((c) => c.id === createFormValues.value.categoryId)?.name ?? "Select Category",
)
const selectedCreateWallet = computed(
  () => props.wallets.find((w) => w.id === createFormValues.value.walletId)?.name ?? "Select Wallet",
)
</script>

<template>
  <UiDialog :open="store.createOpen" @update:open="store.closeCreate()">
    <UiDialogTrigger as-child>
      <UiButton class="gap-2" @click="store.openCreate()">
        <Icon name="lucide:plus" class="h-4 w-4" /> Add Budget
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Add Budget</UiDialogTitle>
      </UiDialogHeader>
      <form class="space-y-4 p-4" @submit.prevent="createForm.handleSubmit()">
        <createForm.Field name="walletId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Wallet</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ selectedCreateWallet }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="wallet in wallets" :key="wallet.id" :value="wallet.id">
                    {{ wallet.name }} ({{ formatCurrency(wallet.balance, wallet.currency) }})
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <p v-if="!field.state.meta.isValid" class="text-xs text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field name="categoryId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Category</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ selectedCreateCategory }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="cat in expenseCategories" :key="cat.id" :value="cat.id">
                    {{ cat.icon ?? "" }} {{ cat.name }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <p v-if="!field.state.meta.isValid" class="text-xs text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field name="amount">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="amount">Budget Amount</UiLabel>
              <UiInput
                id="amount" type="number" :value="field.state.value"
                placeholder="0" min="0"
                @blur="field.handleBlur()"
                @input="(e: Event) => field.handleChange(Number((e.target as HTMLInputElement).value))"
              />
              <p v-if="!field.state.meta.isValid" class="text-xs text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field name="period">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Period</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ periodOptions.find((p) => p.value === field.state.value)?.label }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="opt in periodOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <p v-if="!field.state.meta.isValid" class="text-xs text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </createForm.Field>

        <createForm.Subscribe>
          <template #default="{ isSubmitting }">
            <UiButton type="submit" class="w-full" :disabled="isSubmitting">
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
              {{ isSubmitting ? "Saving..." : "Save Budget" }}
            </UiButton>
          </template>
        </createForm.Subscribe>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
