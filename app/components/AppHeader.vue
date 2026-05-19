<script setup lang="ts">
import { useSidebar } from "@/components/ui/sidebar";
const { state, toggleSidebar } = useSidebar();
</script>

<template>
  <header class="flex h-20 w-full sticky top-0 shrink-0 items-center gap-4 border-b-2 bg-background p-3">
    <UiButton variant="ghost" size="icon" @click="toggleSidebar">
      <Icon
        :name="state === 'expanded' ? 'lucide:panel-left-close' : 'lucide:panel-left-open'"
        size="20"
      />
    </UiButton>
  </header>
</template>
