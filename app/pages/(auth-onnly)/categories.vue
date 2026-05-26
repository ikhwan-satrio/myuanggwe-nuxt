<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { CategoryType } from "~~/server/lib/db/schemas"

const { $apolloClient } = useNuxtApp()

useHead({
  title: "Kategori - MyUangGwe | Atur Jenis Transaksi Keuangan",
  meta: [
    {
      name: "description",
      content: "Atur kategori transaksi keuangan Anda - pemasukan dan pengeluaran - untuk pengelompokan yang lebih rapi dan pelacakan anggaran yang lebih baik.",
    },
    {
      name: "keywords",
      content: "kategori transaksi kustom ikon emoji, pengelompokan pemasukan pengeluaran otomatis, expense categorization Indonesia, tagar kategori belanja makan transportasi, jenis transaksi income expense transfer, category-based budget tracking, atur kategori sesuai gaya hidup, personal spending categories tidak ada di app lain, emoji category labels unik, financial category management system",
    },
  ],
})

definePageMeta({ middleware: ["auth"] })

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
    })
    return result.data.categories
  },
  { server: false, lazy: true },
)

const categories = computed(() => categoriesData.value ?? [])

const { mutate: deleteMutate } = useMutation(DELETE_CATEGORY)

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id })
    toast.success("Kategori dihapus")
    await refreshCategories()
  } catch {
    toast.error("Gagal menghapus kategori")
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Kategori</h1>
        <p class="text-sm text-muted-foreground">Pisahkan transaksi berdasarkan jenisnya.</p>
      </div>
      <FormsCategoriesCreate @created="refreshCategories()" />
    </div>
    <FormsCategoriesEdit @updated="refreshCategories()" />
    <TablesCategoriesList :categories="categories" :pending="pending" @delete="handleDelete" />
  </div>
</template>
