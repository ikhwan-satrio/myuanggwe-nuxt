<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import { useForm } from "@tanstack/vue-form"
import { useWalletsCrudStore } from "~/stores/crud/wallets"
import { walletSchema } from "~/lib/@type-schemas/wallets"

const store = useWalletsCrudStore()

const emit = defineEmits<{ created: [] }>()

const { mutate: createMutate } = useMutation(CREATE_WALLET)

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

const createForm = useForm({
  validators: {
    onChange: walletSchema,
    onSubmit: walletSchema,
  },
  defaultValues: {
    name: "",
    type: "cash" as string,
    balance: 0,
    currency: "IDR",
  },
  onSubmit: async ({ value }) => {
    try {
      await createMutate({ input: value })
      toast.success("Wallet created successfully")
      store.closeCreate()
      createForm.reset()
      emit("created")
    } catch {
      toast.error("Failed to create wallet")
    }
  },
})


</script>

<template>
  <UiDialog :open="store.createOpen" @update:open="store.closeCreate()">
    <UiDialogTrigger as-child>
      <UiButton class="gap-2" @click="store.openCreate()">
        <Icon name="lucide:plus" class="h-4 w-4" /> Add Wallet
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Create New Wallet</UiDialogTitle>
      </UiDialogHeader>
      <form class="space-y-4 pt-4" @submit.prevent="createForm.handleSubmit()">
        <createForm.Field name="name">
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
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">
                  * {{ (err as any).message }}
                </span>
              </p>
            </div>
          </template>
        </createForm.Field>

        <createForm.Field name="balance">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel :for="field.name">Initial Balance</UiLabel>
              <UiInput
                :id="field.name" type="number" :value="field.state.value"
                placeholder="0" min="0"
                @blur="field.handleBlur()"
                @input="(e: Event) => field.handleChange(Number((e.target as HTMLInputElement).value))"
              />
              <p v-if="!field.state.meta.isValid" class="text-sm text-destructive">
                <span v-for="(err, i) in field.state.meta.errors" :key="i" class="block">
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
                <UiLabel>Type</UiLabel>
                <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                  <UiSelectTrigger class="w-full">
                    <UiSelectValue>{{ typeOptions.find((t) => t.value === field.state.value)?.label }}</UiSelectValue>
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem v-for="opt in typeOptions" :key="opt.value" :value="opt.value">
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
                <UiLabel>Currency</UiLabel>
                <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                  <UiSelectTrigger class="w-full">
                    <UiSelectValue>{{ currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Select Currency" }}</UiSelectValue>
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem v-for="opt in currencyOptions" :key="opt.value" :value="opt.value">
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
            <UiButton type="submit" class="w-full" :disabled="isSubmitting || !canSubmit">
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
              {{ isSubmitting ? "Saving..." : "Save Wallet" }}
            </UiButton>
          </template>
        </createForm.Subscribe>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
