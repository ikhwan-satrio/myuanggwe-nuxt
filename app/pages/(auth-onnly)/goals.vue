<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { toast } from "vue-sonner";
import { useForm } from "@tanstack/vue-form";
import { financialGoalSchema } from "~/lib/@type-schemas/goals";
import type { WalletType, FinancialGoalType } from "~~/server/lib/db/schemas";

const { $apolloClient } = useNuxtApp();
const { formatCurrency } = useCurrency();

useHead({
  title: "Target Menabung - MyUangGwe",
  meta: [
    { name: "description", content: "Atur dan pantau target keuangan Anda." },
  ],
});

definePageMeta({
  middleware: ["auth"],
});

type GoalItem = FinancialGoalType & {
  wallet: { id: string; name: string };
};

// ============= FETCH =============
const {
  data: goalsData,
  pending,
  refresh: refreshGoals,
} = useAsyncData<GoalItem[]>(
  "goals",
  async () => {
    const result = await $apolloClient.query({
      query: GET_FINANCIAL_GOALS,
      fetchPolicy: "network-only",
    });
    return result.data.financialGoals;
  },
  { server: false, lazy: true },
);

const { data: walletsData } = useAsyncData<WalletType[]>(
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

const goals = computed(() => goalsData.value ?? []);
const wallets = computed(() => walletsData.value ?? []);

// ============= CREATE =============
const createSheetOpen = ref(false);
const { mutate: createMutate } = useMutation(CREATE_FINANCIAL_GOAL);

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
      createSheetOpen.value = false;
      createForm.reset();
      await refreshGoals();
    } catch {
      toast.error("Terjadi kesalahan");
    }
  },
});

const createFormValues = createForm.useStore((s) => s.values);
const selectedWallet = computed(
  () =>
    wallets.value.find((w) => w.id === createFormValues.value.walletId)?.name ??
    "Pilih Dompet Sumber",
);

// ============= ALLOCATE =============
const { mutate: updateMutate } = useMutation(UPDATE_FINANCIAL_GOAL);

async function handleAllocate(goal: GoalItem) {
  const input = prompt("Masukkan jumlah dana yang ingin dialokasikan:");
  if (!input || isNaN(Number(input))) return;
  try {
    await updateMutate({
      id: goal.id,
      input: { currentAmount: goal.currentAmount + Number(input) },
    });
    toast.success("Alokasi dana berhasil");
    await refreshGoals();
  } catch {
    toast.error("Gagal mengalokasikan dana");
  }
}

// ============= DELETE =============
const { mutate: deleteMutate } = useMutation(DELETE_FINANCIAL_GOAL);

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id });
    toast.success("Target berhasil dihapus");
    await refreshGoals();
  } catch {
    toast.error("Gagal menghapus target");
  }
}

// ============= UTILS =============
function calculateProgress(current: number, target: number) {
  return Math.min(Math.round((current / target) * 100), 100);
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap gap-2 items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Target Menabung</h1>
        <p class="text-muted-foreground">
          Atur dan pantau target keuangan Anda.
        </p>
      </div>
      <UiButton @click="createSheetOpen = true">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" /> Tambah Target
      </UiButton>
    </div>

    <!-- Create Sheet -->
    <UiSheet v-model:open="createSheetOpen">
      <UiSheetContent side="right" class="overflow-y-auto">
        <UiSheetHeader>
          <UiSheetTitle>Tambah Target Menabung</UiSheetTitle>
          <UiSheetDescription
            >Tentukan target tabungan Anda dan pilih dompet
            sumbernya.</UiSheetDescription
          >
        </UiSheetHeader>
        <form class="space-y-4 p-4" @submit.prevent="createForm.handleSubmit()">
          <!-- Name -->
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
                  >
                    * {{ err?.message }}
                  </span>
                </p>
              </div>
            </template>
          </createForm.Field>

          <!-- Target Amount -->
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
                  >
                    * {{ err?.message }}
                  </span>
                </p>
              </div>
            </template>
          </createForm.Field>

          <!-- Wallet -->
          <createForm.Field name="walletId">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel>Dompet Sumber</UiLabel>
                <UiSelect :model-value="field.state.value">
                  <UiSelectTrigger class="w-full">
                    <UiSelectValue>{{ selectedWallet }}</UiSelectValue>
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem
                      v-for="wallet in wallets"
                      :key="wallet.id"
                      :value="wallet.id"
                    >
                      {{ wallet.name }}
                    </UiSelectItem>
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
                  >
                    * {{ err?.message }}
                  </span>
                </p>
              </div>
            </template>
          </createForm.Field>

          <!-- Deadline -->
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

    <!-- Goals List -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <template v-if="pending">
        <UiCard v-for="i in 3" :key="i" class="animate-pulse">
          <UiCardHeader class="h-24 bg-muted/50" />
          <UiCardContent class="space-y-2 p-4">
            <UiSkeleton class="h-4 w-3/4" />
            <UiSkeleton class="h-8 w-full" />
          </UiCardContent>
        </UiCard>
      </template>

      <template v-else-if="goals.length > 0">
        <UiCard v-for="goal in goals" :key="goal.id">
          <UiCardHeader class="pb-2">
            <div class="flex items-center justify-between">
              <UiCardTitle class="text-lg font-bold">{{
                goal.name
              }}</UiCardTitle>
              <div class="rounded-full bg-primary/10 p-2 text-primary">
                <Icon name="lucide:trending-up" class="h-4 w-4" />
              </div>
            </div>
            <UiCardDescription>
              Target: {{ formatCurrency(goal.targetAmount) }}
            </UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div class="mt-2 space-y-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">Terkumpul</span>
                <span class="font-medium">{{
                  formatCurrency(goal.currentAmount)
                }}</span>
              </div>
              <UiProgress
                :model-value="
                  calculateProgress(goal.currentAmount, goal.targetAmount)
                "
                class="h-2"
              />
              <div
                class="flex items-center justify-between text-xs text-muted-foreground"
              >
                <span
                  >{{
                    calculateProgress(goal.currentAmount, goal.targetAmount)
                  }}% Selesai</span
                >
                <span v-if="goal.deadline">
                  Sisa waktu:
                  {{
                    new Date(String(goal.deadline)).toLocaleDateString("id-ID")
                  }}
                </span>
              </div>
              <div
                class="mt-4 flex items-center gap-1 text-xs text-muted-foreground"
              >
                <Icon name="lucide:wallet" class="h-3 w-3" />
                <span>{{ goal.wallet?.name ?? "Wallet tidak ditemukan" }}</span>
              </div>
            </div>
          </UiCardContent>
          <UiCardFooter class="flex justify-between border-t bg-muted/50 p-3">
            <UiButton variant="outline" size="sm" @click="handleAllocate(goal)">
              Alokasi Dana
            </UiButton>
            <UiButton
              variant="ghost"
              size="icon"
              class="text-destructive hover:text-destructive"
              @click="handleDelete(goal.id)"
            >
              <Icon name="lucide:trash-2" class="h-4 w-4" />
            </UiButton>
          </UiCardFooter>
        </UiCard>
      </template>

      <div
        v-else
        class="col-span-3 flex h-50 flex-col items-center justify-center rounded-lg border border-dashed text-center"
      >
        <p class="text-muted-foreground">Belum ada target menabung</p>
      </div>
    </div>
  </div>
</template>
