<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { toast } from "vue-sonner";
import { useForm } from "@tanstack/vue-form";
import { budgetSchema } from "~/lib/@type-schemas/budget";
import type { BudgetType, CategoryType } from "~~/server/lib/db/schemas";

const { $apolloClient } = useNuxtApp();
const { formatCurrency } = useCurrency();

useHead({
  title: "Anggaran - MyUangGwe | Atur Batas Pengeluaran",
  meta: [
    {
      name: "description",
      content:
        "Kelola anggaran bulanan dan tahunan Anda untuk setiap kategori pengeluaran agar keuangan tetap terkendali.",
    },
  ],
});

definePageMeta({
  middleware: ["auth"],
});

type BudgetWithCategory = BudgetType & {
  category: { id: string; name: string; icon: string | null; type: string };
};

const periodOptions = [
  { value: "monthly", label: "Bulanan (Monthly)" },
  { value: "yearly", label: "Tahunan (Yearly)" },
];

// ============= FETCH =============
const {
  data: budgetsData,
  pending,
  refresh: refreshBudgets,
} = useAsyncData<BudgetWithCategory[]>(
  "budgets",
  async () => {
    const result = await $apolloClient.query({
      query: GET_BUDGETS,
      fetchPolicy: "network-only",
    });
    return result.data.budgets;
  },
  { server: false, lazy: true },
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
  { server: false, lazy: true },
);

const budgets = computed(() => budgetsData.value ?? []);
const expenseCategories = computed(() =>
  (categoriesData.value ?? []).filter((c) => c.type === "expense"),
);

// ============= CREATE =============
const createDialogOpen = ref(false);
const { mutate: createMutate } = useMutation(CREATE_BUDGET);

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
      await createMutate({ input: value });
      toast.success("Anggaran berhasil dibuat");
      createDialogOpen.value = false;
      createForm.reset();
      await refreshBudgets();
    } catch {
      toast.error("Terjadi kesalahan");
    }
  },
});

const createFormValues = createForm.useStore((s) => s.values);
const selectedCreateCategory = computed(
  () =>
    expenseCategories.value.find(
      (c) => c.id === createFormValues.value.categoryId,
    )?.name ?? "Pilih Kategori",
);

// ============= EDIT =============
const editSheetOpen = ref(false);
const editingBudget = ref<BudgetWithCategory | null>(null);
const { mutate: updateMutate } = useMutation(UPDATE_BUDGET);

watch(editSheetOpen, (val) => {
  if (!val) editingBudget.value = null;
});

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
    if (!editingBudget.value) return;
    try {
      await updateMutate({ id: editingBudget.value.id, input: value });
      toast.success("Anggaran berhasil diubah");
      editSheetOpen.value = false;
      await refreshBudgets();
    } catch {
      toast.error("Terjadi kesalahan");
    }
  },
});

const editFormValues = editForm.useStore((s) => s.values);
const selectedEditCategory = computed(
  () =>
    expenseCategories.value.find(
      (c) => c.id === editFormValues.value.categoryId,
    )?.name ?? "Pilih Kategori",
);

function handleEditClick(budget: BudgetWithCategory) {
  editingBudget.value = budget;
  editForm.setFieldValue("amount", budget.amount);
  editForm.setFieldValue("period", budget.period);
  editForm.setFieldValue("categoryId", budget.categoryId);
  editSheetOpen.value = true;
}

// ============= DELETE =============
const { mutate: deleteMutate } = useMutation(DELETE_BUDGET);

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id });
    toast.success("Anggaran dihapus");
    await refreshBudgets();
  } catch {
    toast.error("Gagal menghapus anggaran");
  }
}

// ============= UTILS =============
function getProgress(spending: number, amount: number) {
  return Math.min((spending / amount) * 100, 100);
}

function getProgressClass(spending: number, amount: number) {
  const pct = (spending / amount) * 100;
  if (pct > 100) return "bg-destructive";
  if (pct > 80) return "bg-yellow-500";
  return "bg-primary";
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Anggaran</h1>
        <p class="text-sm text-muted-foreground">
          Atur batas pengeluaran untuk setiap kategori.
        </p>
      </div>
      <UiDialog v-model:open="createDialogOpen">
        <UiDialogTrigger as-child>
          <UiButton class="gap-2">
            <Icon name="lucide:plus" class="h-4 w-4" /> Tambah Anggaran
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle>Tambah Anggaran</UiDialogTitle>
          </UiDialogHeader>
          <form
            class="space-y-4 p-4"
            @submit.prevent="createForm.handleSubmit()"
          >
            <createForm.Field name="amount">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel for="amount">Jumlah Anggaran</UiLabel>
                  <UiInput
                    id="amount"
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

            <createForm.Field name="categoryId">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Kategori</UiLabel>
                  <UiSelect :model-value="field.state.value">
                    <UiSelectTrigger class="w-full">
                      <UiSelectValue>{{
                        selectedCreateCategory
                      }}</UiSelectValue>
                    </UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem
                        v-for="cat in expenseCategories"
                        :key="cat.id"
                        :value="cat.id"
                      >
                        {{ cat.icon ?? "" }} {{ cat.name }}
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

            <createForm.Field name="period">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Periode</UiLabel>
                  <UiSelect :model-value="field.state.value">
                    <UiSelectTrigger class="w-full">
                      <UiSelectValue>
                        {{
                          periodOptions.find(
                            (p) => p.value === field.state.value,
                          )?.label
                        }}
                      </UiSelectValue>
                    </UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem
                        v-for="opt in periodOptions"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        {{ opt.label }}
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

            <createForm.Subscribe>
              <template #default="{ isSubmitting }">
                <UiButton type="submit" class="w-full" :disabled="isSubmitting">
                  <Icon
                    v-if="isSubmitting"
                    name="lucide:loader-2"
                    class="mr-2 h-4 w-4 animate-spin"
                  />
                  {{ isSubmitting ? "Menyimpan..." : "Simpan Anggaran" }}
                </UiButton>
              </template>
            </createForm.Subscribe>
          </form>
        </UiDialogContent>
      </UiDialog>
    </div>

    <!-- Edit Sheet -->
    <UiSheet v-model:open="editSheetOpen">
      <UiSheetContent side="right" class="overflow-y-auto">
        <UiSheetHeader>
          <UiSheetTitle>Edit Anggaran</UiSheetTitle>
          <UiSheetDescription>
            Ubah anggaran untuk kategori {{ editingBudget?.category?.name }}
          </UiSheetDescription>
        </UiSheetHeader>
        <form class="space-y-4 p-4" @submit.prevent="editForm.handleSubmit()">
          <editForm.Field name="amount">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel for="edit-amount">Jumlah Anggaran</UiLabel>
                <UiInput
                  id="edit-amount"
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
          </editForm.Field>

          <editForm.Field name="categoryId">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel>Kategori</UiLabel>
                <UiSelect :model-value="field.state.value">
                  <UiSelectTrigger class="w-full">
                    <UiSelectValue>{{ selectedEditCategory }}</UiSelectValue>
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem
                      v-for="cat in expenseCategories"
                      :key="cat.id"
                      :value="cat.id"
                    >
                      {{ cat.icon ?? "" }} {{ cat.name }}
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
          </editForm.Field>

          <editForm.Field name="period">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel>Periode</UiLabel>
                <UiSelect :model-value="field.state.value">
                  <UiSelectTrigger class="w-full">
                    <UiSelectValue>
                      {{
                        periodOptions.find((p) => p.value === field.state.value)
                          ?.label
                      }}
                    </UiSelectValue>
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem
                      v-for="opt in periodOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
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
          </editForm.Field>

          <editForm.Subscribe>
            <template #default="{ isSubmitting }">
              <UiButton type="submit" class="w-full" :disabled="isSubmitting">
                <Icon
                  v-if="isSubmitting"
                  name="lucide:loader-2"
                  class="mr-2 h-4 w-4 animate-spin"
                />
                {{ isSubmitting ? "Menyimpan..." : "Simpan Perubahan" }}
              </UiButton>
            </template>
          </editForm.Subscribe>
        </form>
      </UiSheetContent>
    </UiSheet>

    <!-- Budget List -->
    <div class="space-y-4">
      <template v-if="pending">
        <div v-for="i in 3" :key="i" class="rounded-md border p-4">
          <div class="mb-2 flex items-center justify-between">
            <UiSkeleton class="h-5 w-32" />
            <UiSkeleton class="h-5 w-24" />
          </div>
          <UiSkeleton class="h-2 w-full rounded-full" />
          <div class="mt-2 flex justify-between">
            <UiSkeleton class="h-4 w-20" />
            <UiSkeleton class="h-4 w-16" />
          </div>
        </div>
      </template>

      <template v-else-if="budgets.length > 0">
        <div
          v-for="budget in budgets"
          :key="budget.id"
          class="rounded-md border bg-card p-4"
        >
          <div class="mb-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span v-if="budget.category?.icon">{{
                budget.category.icon
              }}</span>
              <span class="font-semibold">{{ budget.category?.name }}</span>
              <UiBadge variant="outline" class="text-[10px] capitalize">{{
                budget.period
              }}</UiBadge>
            </div>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="ghost" size="icon" class="h-8 w-8">
                  <Icon name="lucide:more-vertical" class="h-4 w-4" />
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem @click="handleEditClick(budget)">
                  <Icon name="lucide:pencil" class="mr-2 h-4 w-4" /> Edit
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                  class="text-destructive focus:text-destructive"
                  @click="handleDelete(budget.id)"
                >
                  <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" /> Hapus
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>
          <div class="space-y-2">
            <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                class="h-full transition-all duration-500"
                :class="getProgressClass(0, budget.amount)"
                :style="{ width: `${getProgress(0, budget.amount)}%` }"
              />
            </div>
            <div class="flex justify-between text-xs">
              <span
                >{{ formatCurrency(0) }} /
                {{ formatCurrency(budget.amount) }}</span
              >
              <span class="text-muted-foreground">
                {{ Math.round((0 / budget.amount) * 100) }}%
              </span>
            </div>
          </div>
        </div>
      </template>

      <div
        v-else
        class="rounded-md border border-dashed p-8 text-center text-muted-foreground"
      >
        Belum ada anggaran.
      </div>
    </div>
  </div>
</template>
