<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import { useForm } from "@tanstack/vue-form"
import { recurringTransactionSchema } from "~/lib/@type-schemas/recurring"
import type { WalletType, CategoryType } from "~~/server/lib/db/schemas"
import { useRecurringCrudStore } from "~/stores/crud/recurring"

const props = defineProps<{
  wallets: WalletType[]
  categories: CategoryType[]
}>()

const store = useRecurringCrudStore()
const emit = defineEmits<{ created: [] }>()

const { mutate: createMutate } = useMutation(CREATE_RECURRING_TRANSACTION)

const frequencyOptions = [
  { value: "daily", label: "Harian" },
  { value: "weekly", label: "Mingguan" },
  { value: "monthly", label: "Bulanan" },
  { value: "yearly", label: "Tahunan" },
]

const typeOptions = [
  { value: "income", label: "Pemasukan" },
  { value: "expense", label: "Pengeluaran" },
  { value: "transfer", label: "Transfer" },
]

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
      })
      toast.success("Transaksi rutin berhasil dibuat")
      store.closeCreate()
      createForm.reset()
      emit("created")
    } catch {
      toast.error("Terjadi kesalahan")
    }
  },
})

const createFormValues = createForm.useStore((s) => s.values)

const selectedWallet = computed(
  () => props.wallets.find((w) => w.id === createFormValues.value.walletId)?.name ?? "Pilih Dompet",
)
const selectedToWallet = computed(
  () => props.wallets.find((w) => w.id === createFormValues.value.toWalletId)?.name ?? "Pilih Dompet Tujuan",
)
const selectedCategory = computed(
  () => props.categories.find((c) => c.id === createFormValues.value.categoryId)?.name ?? "Pilih Kategori",
)
const filteredCategories = computed(() =>
  props.categories.filter((c) => c.type === createFormValues.value.type),
)
</script>

<template>
  <UiDialog :open="store.createOpen" @update:open="store.closeCreate()">
    <UiDialogTrigger as-child>
      <UiButton class="gap-2" @click="store.openCreate()">
        <Icon name="lucide:plus" class="h-4 w-4" /> Tambah Transaksi Rutin
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="max-h-[90vh] overflow-y-auto">
      <UiDialogHeader>
        <UiDialogTitle>Tambah Transaksi Rutin</UiDialogTitle>
      </UiDialogHeader>
      <form class="space-y-4 p-4" @submit.prevent="createForm.handleSubmit()">
        <createForm.Field name="amount">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="amount">Jumlah</UiLabel>
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

        <createForm.Field name="type">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Tipe</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ typeOptions.find((t) => t.value === field.state.value)?.label }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="opt in typeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field name="frequency">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Frekuensi</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ frequencyOptions.find((f) => f.value === field.state.value)?.label }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="opt in frequencyOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field name="startDate">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="startDate">Tanggal Mulai</UiLabel>
              <UiInput
                id="startDate" type="date" :value="field.state.value"
                @blur="field.handleBlur()"
                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
              />
              <p v-if="!field.state.meta.isValid" class="text-xs text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field name="walletId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>{{ createFormValues.type === "transfer" ? "Dari Dompet" : "Dompet" }}</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ selectedWallet }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="wallet in wallets" :key="wallet.id" :value="wallet.id">{{ wallet.name }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field v-if="createFormValues.type === 'transfer'" name="toWalletId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Ke Dompet</UiLabel>
              <UiSelect :model-value="field.state.value ?? ''" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full border-dashed border-primary">
                  <UiSelectValue>{{ selectedToWallet }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="wallet in wallets.filter((w) => w.id !== createFormValues.walletId)"
                    :key="wallet.id" :value="wallet.id"
                  >{{ wallet.name }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field v-else name="categoryId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Kategori</UiLabel>
              <UiSelect :model-value="field.state.value ?? ''" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ selectedCategory }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="cat in filteredCategories" :key="cat.id" :value="cat.id">
                    {{ cat.icon ?? "" }} {{ cat.name }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field name="description">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="description">Keterangan (Opsional)</UiLabel>
              <UiInput
                id="description" :value="field.state.value ?? ''"
                placeholder="Misal: Bayar Listrik, Langganan Netflix"
                @blur="field.handleBlur()"
                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value || null)"
              />
            </div>
          </template>
        </createForm.Field>

        <createForm.Subscribe>
          <template #default="{ isSubmitting }">
            <UiButton type="submit" class="w-full" :disabled="isSubmitting">
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
              {{ isSubmitting ? "Menyimpan..." : "Simpan Transaksi Rutin" }}
            </UiButton>
          </template>
        </createForm.Subscribe>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
