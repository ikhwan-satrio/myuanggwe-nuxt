<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import { useForm } from "@tanstack/vue-form"
import { categorySchema } from "~/lib/@type-schemas/category"
import { useCategoriesCrudStore } from "~/stores/crud/categories"

const store = useCategoriesCrudStore()
const emit = defineEmits<{ updated: [] }>()

const { mutate: updateMutate } = useMutation(UPDATE_CATEGORY)

const typeOptions = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
]

const iconOptions = [
  { value: "🍔", label: "🍔 Food" },
  { value: "🚗", label: "🚗 Transport" },
  { value: "🏠", label: "🏠 Housing" },
  { value: "💼", label: "💼 Work" },
  { value: "🎮", label: "🎮 Entertainment" },
  { value: "🏥", label: "🏥 Health" },
  { value: "📚", label: "📚 Education" },
  { value: "👕", label: "👕 Clothing" },
  { value: "✈️", label: "✈️ Travel" },
  { value: "🛒", label: "🛒 Shopping" },
  { value: "💰", label: "💰 Salary" },
  { value: "🎁", label: "🎁 Gift" },
  { value: "💳", label: "💳 Bills" },
  { value: "🔧", label: "🔧 Repairs" },
  { value: "📱", label: "📱 Technology" },
]

const editForm = useForm({
  defaultValues: {
    name: "",
    type: "expense" as string,
    icon: "🍔",
  },
  validators: {
    onChange: categorySchema,
    onSubmit: categorySchema,
  },
  onSubmit: async ({ value }) => {
    if (!store.editingItem) return
    try {
      await updateMutate({ id: store.editingItem.id, input: value })
      toast.success("Category updated successfully")
      store.closeEdit()
      emit("updated")
    } catch {
      toast.error("Failed to update category")
    }
  },
})

watch(() => store.editingItem, (item) => {
  if (!item) return
  editForm.setFieldValue("name", item.name)
  editForm.setFieldValue("type", item.type)
  editForm.setFieldValue("icon", item.icon ?? "🍔")
}, { immediate: true })
</script>

<template>
  <UiSheet :open="store.editOpen" @update:open="store.closeEdit()">
    <UiSheetContent side="right" class="overflow-y-auto">
      <UiSheetHeader>
        <UiSheetTitle>Edit {{ store.editingItem?.name }}</UiSheetTitle>
        <UiSheetDescription>Update category info for {{ store.editingItem?.name }}</UiSheetDescription>
      </UiSheetHeader>
      <form class="space-y-4 p-4" @submit.prevent="editForm.handleSubmit()">
        <editForm.Field name="name">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel :for="field.name">Category Name</UiLabel>
              <UiInput
                :id="field.name" type="text" :value="field.state.value"
                placeholder="Makanan, Transportasi, dll"
                @blur="field.handleBlur()"
                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
              />
              <p v-if="!field.state.meta.isValid" class="text-xs text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </editForm.Field>

        <editForm.Field name="type">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Type</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ typeOptions.find((t) => t.value === field.state.value)?.label }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="opt in typeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <p v-if="!field.state.meta.isValid" class="text-xs text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </editForm.Field>

        <editForm.Field name="icon">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Icon</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ iconOptions.find((i) => i.value === field.state.value)?.label ?? "Select Icon" }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent class="max-h-60 overflow-y-auto">
                  <UiSelectItem v-for="opt in iconOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</UiSelectItem>
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
              {{ isSubmitting ? "Saving..." : "Save Changes" }}
            </UiButton>
          </template>
        </editForm.Subscribe>
      </form>
    </UiSheetContent>
  </UiSheet>
</template>
