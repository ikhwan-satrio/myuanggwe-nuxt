<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { toast } from "vue-sonner";
import { useForm } from "@tanstack/vue-form";
import type { CategoryType } from "~~/server/lib/db/schemas";
import { categorySchema } from "~/lib/@type-schemas/category";

const { $apolloClient } = useNuxtApp();

useHead({
  title: "Kategori - MyUangGwe | Atur Jenis Transaksi Keuangan",
  meta: [
    {
      name: "description",
      content:
        "Atur kategori transaksi keuangan Anda - pemasukan dan pengeluaran - untuk pengelompokan yang lebih rapi dan pelacakan anggaran yang lebih baik.",
    },
    {
      name: "keywords",
      content:
        "kategori keuangan, jenis transaksi, pengelompokan keuangan, manajemen anggaran, aplikasi keuangan",
    },
  ],
});

definePageMeta({
  middleware: ["auth"],
});

const typeOptions = [
  { value: "income", label: "Pemasukan" },
  { value: "expense", label: "Pengeluaran" },
];

const iconOptions = [
  { value: "🍔", label: "🍔 Makanan" },
  { value: "🚗", label: "🚗 Transportasi" },
  { value: "🏠", label: "🏠 Rumah" },
  { value: "💼", label: "💼 Kerja" },
  { value: "🎮", label: "🎮 Hiburan" },
  { value: "🏥", label: "🏥 Kesehatan" },
  { value: "📚", label: "📚 Pendidikan" },
  { value: "👕", label: "👕 Pakaian" },
  { value: "✈️", label: "✈️ Perjalanan" },
  { value: "🛒", label: "🛒 Belanja" },
  { value: "💰", label: "💰 Gaji" },
  { value: "🎁", label: "🎁 Hadiah" },
  { value: "💳", label: "💳 Tagihan" },
  { value: "🔧", label: "🔧 Perbaikan" },
  { value: "📱", label: "📱 Teknologi" },
];

// ============= FETCH =============
const {
  data: categoriesData,
  pending,
  refresh: refreshCategories,
} = useAsyncData<CategoryType[]>(
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

const categories = computed(() => categoriesData.value ?? []);

// ============= CREATE =============
const createDialogOpen = ref(false);
const { mutate: createMutate } = useMutation(CREATE_CATEGORY);

const createForm = useForm({
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
    try {
      await createMutate({ input: value });
      toast.success("Kategori berhasil dibuat");
      createDialogOpen.value = false;
      createForm.reset();
      await refreshCategories();
    } catch {
      toast.error("Gagal membuat kategori");
    }
  },
});

// ============= EDIT =============
const editSheetOpen = ref(false);
const editingCategory = ref<CategoryType | null>(null);
const { mutate: updateMutate } = useMutation(UPDATE_CATEGORY);

watch(editSheetOpen, (val) => {
  if (!val) editingCategory.value = null;
});

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
    if (!editingCategory.value) return;
    try {
      await updateMutate({ id: editingCategory.value.id, input: value });
      toast.success("Kategori berhasil diubah");
      editSheetOpen.value = false;
      await refreshCategories();
    } catch {
      toast.error("Gagal mengubah kategori");
    }
  },
});

function handleEditClick(cat: CategoryType) {
  editingCategory.value = cat;
  editForm.setFieldValue("name", cat.name);
  editForm.setFieldValue("type", cat.type);
  editForm.setFieldValue("icon", cat.icon ?? "🍔");
  editSheetOpen.value = true;
}

// ============= DELETE =============
const { mutate: deleteMutate } = useMutation(DELETE_CATEGORY);

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id });
    toast.success("Kategori dihapus");
    await refreshCategories();
  } catch {
    toast.error("Gagal menghapus kategori");
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Kategori</h1>
        <p class="text-sm text-muted-foreground">
          Pisahkan transaksi berdasarkan jenisnya.
        </p>
      </div>
      <UiDialog v-model:open="createDialogOpen">
        <UiDialogTrigger as-child>
          <UiButton class="gap-2">
            <Icon name="lucide:plus" class="h-4 w-4" /> Tambah Kategori
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle>Tambah Kategori</UiDialogTitle>
          </UiDialogHeader>
          <form
            class="space-y-4 pt-2"
            @submit.prevent="createForm.handleSubmit()"
          >
            <createForm.Field name="name">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel :for="field.name">Nama Kategori</UiLabel>
                  <UiInput
                    :id="field.name"
                    type="text"
                    :value="field.state.value"
                    placeholder="Misal: Makan, Gaji"
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

            <createForm.Field name="type">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Jenis</UiLabel>
                  <UiSelect :model-value="field.state.value">
                    <UiSelectTrigger class="w-full">
                      <UiSelectValue>
                        {{
                          typeOptions.find((t) => t.value === field.state.value)
                            ?.label
                        }}
                      </UiSelectValue>
                    </UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem
                        v-for="opt in typeOptions"
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

            <createForm.Field name="icon">
              <template #default="{ field }">
                <div class="space-y-2">
                  <UiLabel>Icon</UiLabel>
                  <UiSelect :model-value="field.state.value">
                    <UiSelectTrigger class="w-full">
                      <UiSelectValue>
                        {{
                          iconOptions.find((i) => i.value === field.state.value)
                            ?.label ?? "Pilih Icon"
                        }}
                      </UiSelectValue>
                    </UiSelectTrigger>
                    <UiSelectContent class="max-h-60 overflow-y-auto">
                      <UiSelectItem
                        v-for="opt in iconOptions"
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
                  {{ isSubmitting ? "Menyimpan..." : "Simpan Kategori" }}
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
          <UiSheetTitle>Edit {{ editingCategory?.name }}</UiSheetTitle>
          <UiSheetDescription
            >Ubah informasi kategori
            {{ editingCategory?.name }}</UiSheetDescription
          >
        </UiSheetHeader>
        <form class="space-y-4 p-4" @submit.prevent="editForm.handleSubmit()">
          <editForm.Field name="name">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel :for="field.name">Nama Kategori</UiLabel>
                <UiInput
                  :id="field.name"
                  type="text"
                  :value="field.state.value"
                  placeholder="Makanan, Transportasi, dll"
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
          </editForm.Field>

          <editForm.Field name="type">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel>Jenis</UiLabel>
                <UiSelect :model-value="field.state.value">
                  <UiSelectTrigger class="w-full">
                    <UiSelectValue>
                      {{
                        typeOptions.find((t) => t.value === field.state.value)
                          ?.label
                      }}
                    </UiSelectValue>
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem
                      v-for="opt in typeOptions"
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

          <editForm.Field name="icon">
            <template #default="{ field }">
              <div class="space-y-2">
                <UiLabel>Icon</UiLabel>
                <UiSelect :model-value="field.state.value">
                  <UiSelectTrigger class="w-full">
                    <UiSelectValue>
                      {{
                        iconOptions.find((i) => i.value === field.state.value)
                          ?.label ?? "Pilih Icon"
                      }}
                    </UiSelectValue>
                  </UiSelectTrigger>
                  <UiSelectContent class="max-h-60 overflow-y-auto">
                    <UiSelectItem
                      v-for="opt in iconOptions"
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

    <!-- Category List -->
    <div class="grid gap-4 md:grid-cols-4">
      <template v-if="pending">
        <UiCard v-for="i in 5" :key="i">
          <UiCardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <UiSkeleton class="h-5 w-20" />
            <div class="flex items-center gap-2">
              <UiSkeleton class="h-5 w-5 rounded-full" />
              <UiSkeleton class="h-9 w-10" />
            </div>
          </UiCardHeader>
        </UiCard>
      </template>

      <template v-else>
        <UiCard v-for="cat in categories" :key="cat.id">
          <UiCardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <UiCardTitle class="text-sm font-medium">
              {{ cat.icon }} {{ cat.name }}
            </UiCardTitle>
            <div class="flex items-center gap-2">
              <Icon
                v-if="cat.type === 'income'"
                name="lucide:arrow-up-circle"
                class="h-4 w-4 text-green-500"
              />
              <Icon
                v-else
                name="lucide:arrow-down-circle"
                class="h-4 w-4 text-red-500"
              />
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="outline" size="icon">
                    <Icon name="lucide:more-vertical" class="h-4 w-4" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuItem @click="handleEditClick(cat)">
                    <Icon name="lucide:pencil" class="mr-2 h-4 w-4" /> Edit
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem
                    class="text-destructive focus:text-destructive"
                    @click="handleDelete(cat.id)"
                  >
                    <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" /> Hapus
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </div>
          </UiCardHeader>
        </UiCard>

        <div
          v-if="categories.length === 0"
          class="col-span-4 py-10 text-center text-muted-foreground"
        >
          Belum ada kategori. Tambah kategori pertama kamu!
        </div>
      </template>
    </div>
  </div>
</template>
