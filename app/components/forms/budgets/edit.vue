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
const emit = defineEmits<{ updated: [] }>()

const { mutate: updateMutate } = useMutation(UPDATE_BUDGET)

const periodOptions = [
  { value: "monthly", label: "Bulanan (Monthly)" },
  { value: "yearly", label: "Tahunan (Yearly)" },
]

const editForm = useForm({
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
    if (!store.editingItem) return
    try {
      await updateMutate({ id: store.editingItem.id, input: value })
      toast.success("Anggaran berhasil diubah")
      store.closeEdit()
      emit("updated")
    } catch {
      toast.error("Terjadi kesalahan")
    }
  },
})

const editFormValues = editForm.useStore((s) => s.values)
const selectedEditCategory = computed(
  () => props.expenseCategories.find((c) => c.id === editFormValues.value.categoryId)?.name ?? "Pilih Kategori",
)

watch(() => store.editingItem, (item) => {
  if (!item) return
  editForm.setFieldValue("amount", item.amount)
  editForm.setFieldValue("period", item.period)
  editForm.setFieldValue("categoryId", item.categoryId)
}, { immediate: true })
</script>

<template>
  <UiSheet :open="store.editOpen" @update:open="store.closeEdit()">
    <UiSheetContent side="right" class="overflow-y-auto">
      <UiSheetHeader>
        <UiSheetTitle>Edit Anggaran</UiSheetTitle>
        <UiSheetDescription>Ubah anggaran untuk kategori {{ store.editingItem?.category?.name }}</UiSheetDescription>
      </UiSheetHeader>
      <form class="space-y-4 p-4" @submit.prevent="editForm.handleSubmit()">
        <editForm.Field name="amount">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="edit-amount">Jumlah Anggaran</UiLabel>
              <UiInput
                id="edit-amount" type="number" :value="field.state.value"
                placeholder="0" min="0"
                @blur="field.handleBlur()"
                @input="(e: Event) => field.handleChange(Number((e.target as HTMLInputElement).value))"
              />
              <p v-if="!field.state.meta.isValid" class="text-xs text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </editForm.Field>

        <editForm.Field name="categoryId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Kategori</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ selectedEditCategory }}</UiSelectValue>
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
        </editForm.Field>

        <editForm.Field name="period">
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
        </editForm.Field>

        <editForm.Subscribe>
          <template #default="{ isSubmitting }">
            <UiButton type="submit" class="w-full" :disabled="isSubmitting">
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
              {{ isSubmitting ? "Menyimpan..." : "Simpan Perubahan" }}
            </UiButton>
          </template>
        </editForm.Subscribe>
      </form>
    </UiSheetContent>
  </UiSheet>
</template>
