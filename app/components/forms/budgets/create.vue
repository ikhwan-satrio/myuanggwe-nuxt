<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import { useForm } from "@tanstack/vue-form"
import { budgetSchema } from "~/lib/@type-schemas/budget"
import type { CategoryType } from "~~/server/lib/db/schemas"
import { useBudgetsCrudStore } from "~/stores/crud/budgets"

const props = defineProps<{
  expenseCategories: CategoryType[]
}>()

const store = useBudgetsCrudStore()
const emit = defineEmits<{ created: [] }>()

const { mutate: createMutate } = useMutation(CREATE_BUDGET)

const periodOptions = [
  { value: "monthly", label: "Bulanan (Monthly)" },
  { value: "yearly", label: "Tahunan (Yearly)" },
]

const createForm = useForm({
  defaultValues: {
    amount: 0,
    period: "monthly" as string,
    categoryId: "",
  },
  validators: {
    onChange: budgetSchema,
    onSubmit: budgetSchema,
  },
  onSubmit: async ({ value }) => {
    try {
      await createMutate({ input: value })
      toast.success("Anggaran berhasil dibuat")
      store.closeCreate()
      createForm.reset()
      emit("created")
    } catch {
      toast.error("Terjadi kesalahan")
    }
  },
})

const createFormValues = createForm.useStore((s) => s.values)
const selectedCreateCategory = computed(
  () => props.expenseCategories.find((c) => c.id === createFormValues.value.categoryId)?.name ?? "Pilih Kategori",
)
</script>

<template>
  <UiDialog :open="store.createOpen" @update:open="store.closeCreate()">
    <UiDialogTrigger as-child>
      <UiButton class="gap-2" @click="store.openCreate()">
        <Icon name="lucide:plus" class="h-4 w-4" /> Tambah Anggaran
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Tambah Anggaran</UiDialogTitle>
      </UiDialogHeader>
      <form class="space-y-4 p-4" @submit.prevent="createForm.handleSubmit()">
        <createForm.Field name="amount">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="amount">Jumlah Anggaran</UiLabel>
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

        <createForm.Field name="categoryId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Kategori</UiLabel>
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

        <createForm.Field name="period">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Periode</UiLabel>
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
              {{ isSubmitting ? "Menyimpan..." : "Simpan Anggaran" }}
            </UiButton>
          </template>
        </createForm.Subscribe>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
