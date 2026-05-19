<script setup lang="ts">
import "vue-sonner/style.css";
import AppSidebar from "@/components/AppSidebar.vue";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <NuxtLoadingIndicator/>
  <SidebarProvider>
    <AppSidebar />
    <div class=" w-full">
      <AppHeader />
      <main class="w-full p-3">
        <NuxtPage />
      </main>
    </div>
  </SidebarProvider>
  <Toaster />
</template>
