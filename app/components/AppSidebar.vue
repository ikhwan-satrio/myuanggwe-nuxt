<script setup lang="ts">
const { t } = useI18n();

const menuItems = [
  {
    key: "sidebar.menu.dashboard",
    url: "/dashboard",
    icon: "lucide:chart-pie",
  },
  {
    key: "sidebar.menu.transactions",
    url: "/transactions",
    icon: "lucide:arrow-left-right",
  },
  { key: "sidebar.menu.wallets", url: "/wallets", icon: "lucide:wallet" },
  { key: "sidebar.menu.categories", url: "/categories", icon: "lucide:layers" },
  { key: "sidebar.menu.budgets", url: "/budgets", icon: "lucide:piggy-bank" },
  { key: "sidebar.menu.recurring", url: "/recurring", icon: "lucide:repeat" },
  { key: "sidebar.menu.goals", url: "/goals", icon: "lucide:target" },
];

const publicItems = [
  { key: "sidebar.public.news", url: "/news", icon: "lucide:newspaper" },
];

const adminItems = [
  { key: "sidebar.admin.panel", url: "/admin", icon: "lucide:shield" },
];

const orgItems = [
  { key: "sidebar.organization.create", url: "/orgs", icon: "lucide:plus" },
  {
    key: "sidebar.organization.invitations",
    url: "/orgs/invitations",
    icon: "lucide:mail",
  },
  {
    key: "sidebar.organization.management",
    url: "/orgs/manage",
    icon: "lucide:shield-check",
  },
];

const route = useRoute();
const { $authClient } = useNuxtApp();
const isOrgOpen = ref(false);

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
  <UiSidebar>
    <UiSidebarHeader>
      <NuxtLink
        to="/"
        class="flex items-center gap-2 px-2 pb-3 p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
      >
        <NuxtImg src="/favicon.png" width="30" class="rounded-full" />
        <span class="text-md font-bold tracking-tight group-data-[collapsible=icon]:hidden">myuanggwe</span>
      </NuxtLink>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger :disabled="orgs?.pending.value">
          <div class="flex border-2 border-gray-500 p-3 rounded-md items-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:border-0">
            <div class="border-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Icon name="lucide:user" size="14" />
            </div>
            <div class="flex flex-1 flex-col overflow-hidden">
              <UiSkeleton v-if="activeOrgs.isPending" class="h-3 w-20 mb-1" />
              <span v-else-if="activeOrgs.data?.name" class="truncate text-xs font-semibold">{{ activeOrgs.data.name }}</span>
              <span v-else class="truncate text-xs font-semibold">Personal</span>
            </div>
            <Icon name="lucide:chevron-down" size="16" class="opacity-50" />
          </div>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent>
          <UiDropdownMenuItem>
            <button @click="switchOrgMutation.mutate(null)" :disabled="switchOrgMutation.isPending.value" class="flex items-center w-55 justify-between py-3 px-2">
              <div class="border-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-foreground text-primary-foreground">
                <Icon name="lucide:user" size="14" />
              </div>
              <p>{{ t("sidebar.personal") }}</p>
            </button>
          </UiDropdownMenuItem>

          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem v-for="org in orgs.data.value" v-if="orgs.data" :key="org.id">
            <button @click="switchOrgMutation.mutate(org.id)" :disabled="switchOrgMutation.isPending.value" class="flex items-center w-55 justify-between py-3 px-2">
              <div class="border-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-blue-600 text-primary-foreground">
                <Icon name="lucide:user" size="14" />
              </div>
              <p>{{ org.name }}</p>
            </button>
          </UiDropdownMenuItem>
          <UiDropdownMenuItem v-else>
            <div class="flex items-center w-55 justify-between py-3 px-2">
              <div class="border-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <Icon name="lucide:user" size="14" />
              </div>
              <p>{{ t("sidebar.empty") }}</p>
            </div>
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </UiSidebarHeader>

    <UiSidebarContent>
      <UiSidebarGroup>
        <UiSidebarGroupLabel>{{ t("sidebar.groups.public") }}</UiSidebarGroupLabel>
        <UiSidebarGroupContent>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="item in publicItems" :key="item.url">
              <UiSidebarMenuButton as-child :is-active="route.path === item.url" :tooltip="t(item.key)">
                <NuxtLink :to="item.url">
                  <Icon :name="item.icon" size="20" />
                  <span class="group-data-[collapsible=icon]:hidden">{{ t(item.key) }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroupContent>
      </UiSidebarGroup>

      <UiSidebarGroup>
        <UiSidebarGroupLabel>{{ t("sidebar.groups.menu") }}</UiSidebarGroupLabel>
        <UiSidebarGroupContent>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="item in menuItems" :key="item.url">
              <UiSidebarMenuButton as-child v-if="session.data?.user" :is-active="route.path === item.url" :tooltip="t(item.key)">
                <NuxtLink :to="item.url">
                  <Icon :name="item.icon" size="20" />
                  <span class="group-data-[collapsible=icon]:hidden">{{ t(item.key) }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>

              <UiSidebarMenuButton as-child v-else :is-active="route.path === item.url" :tooltip="t(item.key)">
                <span>
                  <Icon :name="item.icon" size="20" />
                  <span class="group-data-[collapsible=icon]:hidden">{{ t(item.key) }}</span>
                </span>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroupContent>
      </UiSidebarGroup>

      <UiSidebarGroup v-if="session.data?.user?.role === 'developer'">
        <UiSidebarGroupLabel>{{ t("sidebar.groups.admin") }}</UiSidebarGroupLabel>
        <UiSidebarGroupContent>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="item in adminItems" :key="item.url">
              <UiSidebarMenuButton as-child :is-active="route.path === item.url" :tooltip="t(item.key)">
                <NuxtLink :to="item.url">
                  <Icon :name="item.icon" size="20" />
                  <span class="group-data-[collapsible=icon]:hidden">{{ t(item.key) }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroupContent>
      </UiSidebarGroup>

      <ClientOnly>
        <UiCollapsible v-model:open="isOrgOpen" :disabled="!session.data?.user" as-child>
          <UiSidebarGroup>
            <UiSidebarGroupLabel as-child>
              <UiCollapsibleTrigger class="flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-accent">
                <Icon name="lucide:building-2" size="16" class="shrink-0" />
                <span class="group-data-[collapsible=icon]:hidden">{{ t("sidebar.groups.organization") }}</span>
                <Icon name="lucide:chevron-right" size="14" class="ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden" :class="isOrgOpen && 'rotate-90'" />
              </UiCollapsibleTrigger>
            </UiSidebarGroupLabel>

            <UiCollapsibleContent class="group-data-[collapsible=icon]:hidden">
              <UiSidebarGroupContent>
                <UiSidebarMenu>
                  <UiSidebarMenuItem v-for="item in orgItems" :key="item.url">
                    <UiSidebarMenuButton as-child :is-active="route.path === item.url" :tooltip="t(item.key)">
                      <NuxtLink :to="item.url">
                        <Icon :name="item.icon" size="16" />
                        <span>{{ t(item.key) }}</span>
                      </NuxtLink>
                    </UiSidebarMenuButton>
                  </UiSidebarMenuItem>
                </UiSidebarMenu>
              </UiSidebarGroupContent>
            </UiCollapsibleContent>
          </UiSidebarGroup>
        </UiCollapsible>
      </ClientOnly>
    </UiSidebarContent>

    <UiSidebarFooter>
      <UiSidebarSeparator />
      <UiSidebarMenu>
        <template v-if="session.data">
          <UiSidebarMenuItem>
            <UiSidebarMenuButton
              :tooltip="t('sidebar.footer.logout')"
              class="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              :disable="signOutMutation.isPending"
              @click="signOutMutation.mutate()"
            >
              <Icon name="lucide:log-out" size="16" />
              <span class="group-data-[collapsible=icon]:hidden">{{ t("sidebar.footer.logout") }}</span>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>
        </template>
        <UiSidebarMenuItem v-else>
          <UiSidebarMenuButton
            :tooltip="t('sidebar.footer.login')"
            class="text-green-500 hover:bg-green-500 hover:text-green-50"
            @click="navigateTo('/auth')"
          >
            <Icon name="lucide:log-in" size="16" />
            <span class="group-data-[collapsible=icon]:hidden">{{ t("sidebar.footer.getStarted") }}</span>
          </UiSidebarMenuButton>
        </UiSidebarMenuItem>

        <UiSidebarMenuItem>
          <UiSidebarMenuButton :tooltip="t('sidebar.footer.settings')" size="lg" class="hover:bg-accent">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <Icon name="lucide:user" size="16" />
            </div>
            <div class="flex flex-1 flex-col text-xs overflow-hidden">
              <span class="truncate font-bold">{{ session.data?.user.name }}</span>
              <span class="truncate text-muted-foreground">{{ session.data?.user.email }}</span>
            </div>
            <Icon name="lucide:settings" size="16" class="opacity-50" />
          </UiSidebarMenuButton>
        </UiSidebarMenuItem>
      </UiSidebarMenu>
    </UiSidebarFooter>
  </UiSidebar>
</template>
