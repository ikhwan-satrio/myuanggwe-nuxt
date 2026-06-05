<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import { useForm } from "@tanstack/vue-form"
import { walletSchema } from "~/lib/@type-schemas/wallets"
import { useWalletsCrudStore } from "~/stores/crud/wallets"

const store = useWalletsCrudStore()

const emit = defineEmits<{ updated: [] }>()

const { mutate: updateMutate } = useMutation(UPDATE_WALLET)

const typeOptions = [
  { value: "cash", label: "Cash" },
  { value: "bank", label: "Bank / E-Wallet" },
  { value: "credit_card", label: "Credit Card" },
]

const currencyOptions = [
  { value: "IDR", label: "IDR" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "JPY", label: "JPY" },
]

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
    if (!store.editingItem) return
    try {
      await updateMutate({ id: store.editingItem.id, input: value })
      toast.success("Wallet updated successfully")
      store.closeEdit()
      emit("updated")
    } catch (e) {
      console.log(e)
      toast.error("Failed to update wallet")
    }
  },
})

watch(() => store.editingItem, (item) => {
  if (!item) return
  editForm.setFieldValue("name", item.name)
  editForm.setFieldValue("type", item.type)
  editForm.setFieldValue("balance", item.balance)
  editForm.setFieldValue("currency", item.currency)
}, { immediate: true })


</script>

<template>
  <UiSheet :open="store.editOpen" @update:open="store.closeEdit()">
    <UiSheetContent side="right" class="overflow-y-auto">
      <UiSheetHeader>
        <UiSheetTitle>Edit {{ store.editingItem?.name }}</UiSheetTitle>
        <UiSheetDescription>Update wallet info for {{ store.editingItem?.name }}</UiSheetDescription>
      </UiSheetHeader>
      <form class="space-y-4 p-4" @submit.prevent="editForm.handleSubmit()">
        <editForm.Field name="name">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel :for="field.name">Wallet Name</UiLabel>
              <UiInput
                :id="field.name" type="text" :value="field.state.value"
                placeholder="BCA, GoPay, etc."
                @blur="field.handleBlur()"
                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
              />
              <p v-if="!field.state.meta.isValid" class="text-sm text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </editForm.Field>

        <editForm.Field name="balance">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel :for="field.name">Balance</UiLabel>
              <UiInput
                :id="field.name" type="number" :value="field.state.value"
                placeholder="0" min="0"
                @blur="field.handleBlur()"
                @input="(e: Event) => field.handleChange(Number((e.target as HTMLInputElement).value))"
              />
              <p v-if="!field.state.meta.isValid" class="text-sm text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">* {{ err?.message }}</span>
              </p>
            </div>
          </template>
        </editForm.Field>

        <div class="grid grid-cols-2 gap-4">
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
              </div>
            </template>
          </editForm.Field>

          <editForm.Field name="currency">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel>Currency</UiLabel>
                <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                  <UiSelectTrigger class="w-full">
                    <UiSelectValue>{{ currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Select Currency" }}</UiSelectValue>
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem v-for="opt in currencyOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>
            </template>
          </editForm.Field>
        </div>

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
