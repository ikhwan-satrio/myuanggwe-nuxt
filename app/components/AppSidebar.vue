<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: "lucide:chart-pie" },
  { title: "Transaksi", url: "/transactions", icon: "lucide:arrow-left-right" },
  { title: "Dompet", url: "/wallets", icon: "lucide:wallet" },
  { title: "Kategori", url: "/categories", icon: "lucide:layers" },
  { title: "Anggaran", url: "/budgets", icon: "lucide:piggy-bank" },
  { title: "Berulang", url: "/recurring", icon: "lucide:repeat" },
  { title: "Target Menabung", url: "/goals", icon: "lucide:target" },
];

const orgItems = [
  { title: "Buat Grup Baru", url: "/orgs", icon: "lucide:plus" },
  {
    title: "Invitations",
    url: "/orgs/invitations",
    icon: "lucide:mail",
  },
  {
    title: "Management",
    url: "/orgs/manage",
    icon: "lucide:shield-check",
  },
];

const route = useRoute();
const { $authClient } = useNuxtApp();
const isOrgOpen = ref(true);

const headers = useRequestHeaders(["cookie"]);

const activeOrgs = $authClient.useActiveOrganization();
const session = $authClient.useSession();

const orgs = useAsyncData("orgs", async () => {
  return (await $authClient.organization.list({ fetchOptions: { headers } }))
    .data;
});

const switchOrgMutation = useMutation({
  mutationKey: ["switch-org"],
  mutationFn: async (orgId: string | null) => {
    await $authClient.organization.setActive({
      organizationId: orgId,
    });

    await refreshNuxtData();
  },
});

const signOutMutation = useMutation({
  mutationKey: ["sign-out"],
  mutationFn: async () => {
    await $authClient.signOut();
  },
  onSuccess: async () => {
    await refreshNuxtData();
    navigateTo("/auth");
  },
});
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <DropdownMenu>
        <DropdownMenuTrigger :disabled="orgs?.pending.value">
          <div
            class="flex border-2 border-gray-500 p-3 rounded-md items-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:border-0"
          >
            <div
              class="border-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground"
            >
              <Icon name="lucide:user" size="14" />
            </div>
            <div class="flex flex-1 flex-col overflow-hidden">
              <UiSkeleton v-if="activeOrgs.isPending" class="h-3 w-20 mb-1" />
              <span
                v-else-if="activeOrgs.data?.name"
                class="truncate text-xs font-semibold"
                >{{ activeOrgs.data.name }}</span
              >

              <span v-else class="truncate text-xs font-semibold"
                >Personal</span
              >
            </div>
            <Icon name="lucide:chevron-down" size="16" class="opacity-50" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button
              @click="switchOrgMutation.mutate(null)"
              :disabled="switchOrgMutation.isPending.value"
              class="flex items-center w-55 justify-between py-3 px-2"
            >
              <div
                class="border-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-foreground text-primary-foreground"
              >
                <Icon name="lucide:user" size="14" />
              </div>

              <p>Personal</p>
            </button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            v-for="org in orgs.data.value"
            v-if="orgs.data"
            :key="org.id"
          >
            <button
              @click="switchOrgMutation.mutate(org.id)"
              :disabled="switchOrgMutation.isPending.value"
              class="flex items-center w-55 justify-between py-3 px-2"
            >
              <div
                class="border-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-blue-600 text-primary-foreground"
              >
                <Icon name="lucide:user" size="14" />
              </div>

              <p>{{ org.name }}</p>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem v-else>
            <div class="flex items-center w-55 justify-between py-3 px-2">
              <div
                class="border-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground"
              >
                <Icon name="lucide:user" size="14" />
              </div>

              <p>empty</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>

    <SidebarContent>
      <!-- Main Navigation -->
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in menuItems" :key="item.url">
              <SidebarMenuButton
                as-child
                :is-active="route.path === item.url"
                :tooltip="item.title"
              >
                <NuxtLink :to="item.url">
                  <Icon :name="item.icon" size="20" />
                  <span class="group-data-[collapsible=icon]:hidden">
                    {{ item.title }}
                  </span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- ✅ Wrap Collapsible dengan ClientOnly untuk fix hydration mismatch -->
      <ClientOnly>
        <Collapsible v-model:open="isOrgOpen" as-child>
          <SidebarGroup>
            <SidebarGroupLabel as-child>
              <CollapsibleTrigger
                class="flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-accent"
              >
                <Icon name="lucide:building-2" size="16" class="shrink-0" />
                <span class="group-data-[collapsible=icon]:hidden"
                  >Organisasi</span
                >
                <Icon
                  name="lucide:chevron-right"
                  size="14"
                  class="ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden"
                  :class="isOrgOpen && 'rotate-90'"
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <CollapsibleContent class="group-data-[collapsible=icon]:hidden">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in orgItems" :key="item.url">
                    <SidebarMenuButton
                      as-child
                      :is-active="route.path === item.url"
                      :tooltip="item.title"
                    >
                      <NuxtLink :to="item.url">
                        <Icon :name="item.icon" size="16" />
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </ClientOnly>
    </SidebarContent>

    <!-- Footer -->
    <SidebarFooter>
      <SidebarSeparator />
      <SidebarMenu>
        <SidebarMenuItem v-if="!session.data">
          <SidebarMenuButton
            tooltip="Login"
            class="text-green-500 hover:bg-green-500 hover:text-green-50"
            @click="navigateTo('/auth')"
          >
            <Icon name="lucide:log-in" size="16" />
            <span class="group-data-[collapsible=icon]:hidden"
              >Get started</span
            >
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem v-else>
          <SidebarMenuButton
            tooltip="Logout"
            class="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            :disable="signOutMutation.isPending"
            @click="signOutMutation.mutate()"
          >
            <Icon name="lucide:log-out" size="16" />
            <span class="group-data-[collapsible=icon]:hidden">Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Settings"
            size="lg"
            class="hover:bg-accent"
          >
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted"
            >
              <Icon name="lucide:user" size="16" />
            </div>
            <div class="flex flex-1 flex-col text-xs overflow-hidden">
              <span class="truncate font-bold">
                {{ session.data?.user.name }}
              </span>
              <span class="truncate text-muted-foreground">
                {{ session.data?.user.email }}
              </span>
            </div>
            <Icon name="lucide:settings" size="16" class="opacity-50" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
