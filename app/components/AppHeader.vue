<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const localeLabels: Record<string, string> = {
  id: 'Indonesia',
  en: 'English',
  jp: '日本語',
  my: 'Bahasa Melayu',
  sg: 'English (SG)',
}

const availableLocales = computed(() =>
  (locales.value as any[]).map((l) => ({
    code: l.code,
    label: localeLabels[l.code] ?? l.code,
  })),
);
</script>

<template>
  <header
    class="flex z-20 h-20 w-full sticky top-0 shrink-0 items-center justify-between gap-4 border-b-2 backdrop-blur-3xl p-3"
  >
    <ClientOnly>
      <template #fallback>
        <UiSkeleton class="w-8 h-8" />
      </template>
      <UtilsToggleSidebar />
    </ClientOnly>

    <div class="flex items-center gap-2">
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
