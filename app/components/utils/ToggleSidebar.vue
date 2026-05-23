<script setup lang="ts">
import { useSidebar } from "@/components/ui/sidebar";

const { $authClient } = useNuxtApp();

const { state, toggleSidebar } = useSidebar();
const user = $authClient.useSession();
</script>

<template>
  <UiButton
    :disabled="!user.data?.user"
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
