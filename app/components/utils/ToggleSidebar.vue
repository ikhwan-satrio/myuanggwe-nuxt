<script setup lang="ts">
import { useSidebar } from "@/components/ui/sidebar";

const { state, toggleSidebar } = useSidebar();
</script>

<template>
  <UiButton
    variant="ghost"
    size="icon"
    @click="toggleSidebar"
  >
    <Icon
      :name="
        state === 'expanded'
          ? 'lucide:panel-left-close'
          : 'lucide:panel-left-open'
      "
      size="20"
    />
  </UiButton>
</template>
