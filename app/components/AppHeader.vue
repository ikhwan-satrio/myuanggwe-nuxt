<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() =>
  (locales.value as any[]).map((l) => ({
    code: l.code,
    label: l.currency,
  })),
);
</script>

<template>
  <header
    class="flex h-20 w-full sticky top-0 shrink-0 items-center justify-between gap-4 border-b-2 bg-background p-3"
  >
    <ClientOnly>
      <template #fallback>
        <UiSkeleton class="w-8 h-8" />
      </template>
      <UtilsToggleSidebar />
    </ClientOnly>

    <div class="flex items-center gap-2">
      <!-- Currency / Locale Selector -->
      <UiSelect
        :model-value="locale"
        @update:model-value="(v: any) => setLocale(v)"
      >
        <UiSelectTrigger class="w-28 h-9">
          <UiSelectValue />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem
            v-for="l in availableLocales"
            :key="l.code"
            :value="l.code"
          >
            {{ l.label }}
          </UiSelectItem>
        </UiSelectContent>
      </UiSelect>

      <!-- Dark Mode Toggle -->
      <ClientOnly>
        <template #fallback>
          <UiSkeleton class="w-8 h-8" />
        </template>
        <UtilsToggleMode />
      </ClientOnly>
    </div>
  </header>
</template>
