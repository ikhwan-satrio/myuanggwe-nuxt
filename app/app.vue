<script setup lang="ts">
import "vue-sonner/style.css";
import AppSidebar from "@/components/AppSidebar.vue";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

useHead({
  titleTemplate: (title) => title ? `${title} - MyUangGwe` : 'MyUangGwe — Kelola Keuangan dengan Tenang',
})

const router = useRouter();

const isRoot = computed(() => {
  return ["/", "/auth"].includes(router.currentRoute.value.path);
});
</script>

<template>
  <NuxtLoadingIndicator />
  <SidebarProvider :defaultOpen="!isRoot">
    <AppSidebar />
    <div class="w-full">
      <AppHeader />
      <main class="w-full p-3">
        <NuxtPage />
      </main>
    </div>
  </SidebarProvider>
  <Toaster />
</template>
