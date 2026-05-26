<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { toast } from "vue-sonner";
import { useForm } from "@tanstack/vue-form";
import { financialGoalSchema } from "~/lib/@type-schemas/goals";
import type { WalletType } from "~~/server/lib/db/schemas";
import { useGoalsCrudStore } from "~/stores/crud/goals";

defineProps<{
  wallets: WalletType[];
}>();

const store = useGoalsCrudStore();
const emit = defineEmits<{ created: [] }>();
const { $apolloClient } = useNuxtApp();

const { mutate: createMutate } = useMutation(CREATE_FINANCIAL_GOAL);

const { data: wallets } = useAsyncData<WalletType[]>(
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

const createForm = useForm({
  defaultValues: {
    name: "",
    targetAmount: 0,
    walletId: "",
    deadline: null as string | null,
  },
  validators: {
    onChange: financialGoalSchema,
    onSubmit: financialGoalSchema,
  },
  onSubmit: async ({ value }) => {
    try {
      await createMutate({
        input: {
          ...value,
          deadline: value.deadline
            ? new Date(value.deadline).toISOString()
            : null,
        },
      });
      toast.success("Target berhasil dibuat");
      store.closeCreate();
      createForm.reset();
      emit("created");
    } catch {
      toast.error("Terjadi kesalahan");
    }
  },
});

const createFormValues = createForm.useStore((s) => s.values);
const selectedWallet = computed(
  () =>
    wallets.value?.find((w) => w.id === createFormValues.value.walletId)
      ?.name ?? "Pilih Dompet Sumber",
);
</script>

<template>
  <UiSheet :open="store.createOpen" @update:open="store.closeCreate()">
    <UiSheetContent side="right" class="overflow-y-auto">
      <UiSheetHeader>
        <UiSheetTitle>Tambah Target Menabung</UiSheetTitle>
        <UiSheetDescription
          >Tentukan target tabungan Anda dan pilih dompet
          sumbernya.</UiSheetDescription
        >
      </UiSheetHeader>
      <form class="space-y-4 p-4" @submit.prevent="createForm.handleSubmit()">
        <createForm.Field name="name">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="name">Nama Target</UiLabel>
              <UiInput
                id="name"
                :value="field.state.value"
                placeholder="Tabungan Rumah, Liburan, dsb"
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

        <createForm.Field name="targetAmount">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="targetAmount">Target Jumlah</UiLabel>
              <UiInput
                id="targetAmount"
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

        <createForm.Field name="walletId">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel>Dompet Sumber</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue>{{ selectedWallet }}</UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="wallet in wallets"
                    :key="wallet.id"
                    :value="wallet.id"
                    >{{ wallet.name }}</UiSelectItem
                  >
                </UiSelectContent>
              </UiSelect>
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

        <createForm.Field name="deadline">
          <template #default="{ field }">
            <div class="space-y-2">
              <UiLabel for="deadline">Tenggat Waktu (Opsional)</UiLabel>
              <UiInput
                id="deadline"
                type="date"
                :value="field.state.value ?? ''"
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
              {{ isSubmitting ? "Menyimpan..." : "Simpan Target" }}
            </UiButton>
          </template>
        </createForm.Subscribe>
      </form>
    </UiSheetContent>
  </UiSheet>
</template>
