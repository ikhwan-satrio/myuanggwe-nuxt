<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { CategoryType } from "~~/server/lib/db/schemas"

const { $apolloClient } = useNuxtApp()

useHead({
  title: "Categories | Manage Transaction Types",
  meta: [
    {
      name: "description",
      content: "Manage your financial transaction categories - income and expense - for better grouping and budget tracking.",
    },
    {
      name: "keywords",
      content: "myuanggwe app, kategori transaksi kustom ikon emoji, pengelompokan pemasukan pengeluaran otomatis, expense categorization Indonesia, tagar kategori belanja makan transportasi, jenis transaksi income expense transfer, category-based budget tracking, atur kategori sesuai gaya hidup, personal spending categories tidak ada di app lain, emoji category labels unik, financial category management system",
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
    toast.success("Category deleted")
    await refreshCategories()
  } catch {
    toast.error("Failed to delete category")
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Categories</h1>
        <p class="text-xs text-muted-foreground sm:text-sm">Organize transactions by type.</p>
      </div>
      <CategoriesFormsCreate @created="refreshCategories()" />
    </div>
    <CategoriesFormsEdit @updated="refreshCategories()" />
    <CategoriesTableList :categories="categories" :pending="pending" @delete="handleDelete" />
  </div>
</template>
