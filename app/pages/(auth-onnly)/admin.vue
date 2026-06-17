<script setup lang="ts">
import { gql } from "@apollo/client/core";

const { $authClient } = useNuxtApp();
const { $apolloClient } = useNuxtApp();
const session = $authClient.useSession();

useHead({ title: "Admin Panel" });

definePageMeta({ middleware: ["auth", "developer"] });

const ADMIN_OVERVIEW = gql`
  query AdminOverview {
    adminOverview {
      totalUsers
      totalOrganizations
      totalWallets
      totalTransactions
      totalBudgets
      totalRecurring
      totalGoals
      usersByRole {
        role
        count
      }
      recentUsers {
        id
        name
        email
        role
        createdAt
      }
      recentOrganizations {
        id
        name
        slug
        createdAt
      }
    }
  }
`;

const { data, pending } = useAsyncData(
  "admin-overview",
  async () => {
    const result = await $apolloClient.query({
      query: ADMIN_OVERVIEW,
      fetchPolicy: "network-only",
    });
    return result.data.adminOverview as {
      totalUsers: number;
      totalOrganizations: number;
      totalWallets: number;
      totalTransactions: number;
      totalBudgets: number;
      totalRecurring: number;
      totalGoals: number;
      usersByRole: { role: string; count: number }[];
      recentUsers: {
        id: string;
        name: string;
        email: string;
        role: string;
        createdAt: string;
      }[];
      recentOrganizations: {
        id: string;
        name: string;
        slug: string;
        createdAt: string;
      }[];
    };
  },
  { server: false, lazy: true },
);

const overview = computed(() => data.value);
const isLoading = computed(() => pending.value);

const statsCards = computed(() => [
  {
    label: "Total Users",
    value: overview.value?.totalUsers ?? 0,
    icon: "lucide:users",
  },
  {
    label: "Organizations",
    value: overview.value?.totalOrganizations ?? 0,
    icon: "lucide:building-2",
  },
  {
    label: "Wallets",
    value: overview.value?.totalWallets ?? 0,
    icon: "lucide:wallet",
  },
  {
    label: "Transactions",
    value: overview.value?.totalTransactions ?? 0,
    icon: "lucide:arrow-left-right",
  },
  {
    label: "Budgets",
    value: overview.value?.totalBudgets ?? 0,
    icon: "lucide:piggy-bank",
  },
  {
    label: "Recurring",
    value: overview.value?.totalRecurring ?? 0,
    icon: "lucide:repeat",
  },
  {
    label: "Goals",
    value: overview.value?.totalGoals ?? 0,
    icon: "lucide:target",
  },
]);

const sessionUser = computed(() => session?.value?.data?.user);
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Admin Panel</h1>
      <p class="text-xs text-muted-foreground sm:text-sm">
        Developer-only analytics dashboard
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in statsCards"
        :key="stat.label"
        class="rounded-lg border p-4"
      >
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon :name="stat.icon" class="h-4 w-4" />
          <span>{{ stat.label }}</span>
        </div>
        <UiSkeleton v-if="isLoading" class="mt-1 h-7 w-16" />
        <p v-else class="mt-1 text-2xl font-bold">
          {{ stat.value.toLocaleString() }}
        </p>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-lg border p-4">
        <h2 class="text-lg font-semibold mb-3">Users by Role</h2>
        <UiSkeleton v-if="isLoading" class="h-20" />
        <div v-else-if="overview?.usersByRole.length" class="space-y-2">
          <div
            v-for="r in overview.usersByRole"
            :key="r.role"
            class="flex items-center justify-between rounded-md bg-muted px-3 py-2"
          >
            <span class="font-medium capitalize">{{ r.role }}</span>
            <span class="text-sm text-muted-foreground"
              >{{ r.count }} user{{ r.count !== 1 ? "s" : "" }}</span
            >
          </div>
        </div>
        <p v-else class="text-sm text-muted-foreground">No data</p>
      </div>

      <div class="rounded-lg border p-4">
        <h2 class="text-lg font-semibold mb-3">Developer Info</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Name</span>
            <span class="font-medium">{{ sessionUser?.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Email</span>
            <span class="font-medium">{{ sessionUser?.email }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Role</span>
            <span class="font-medium uppercase">{{ sessionUser?.role }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">User ID</span>
            <span class="font-mono text-xs">{{ sessionUser?.id }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded-lg border p-4">
        <h2 class="text-lg font-semibold mb-3">Recent Users</h2>
        <UiSkeleton v-if="isLoading" class="h-32" />
        <div v-else-if="overview?.recentUsers.length" class="space-y-2">
          <div
            v-for="u in overview.recentUsers"
            :key="u.id"
            class="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm"
          >
            <div class="flex flex-col">
              <span class="font-medium">{{ u.name }}</span>
              <span class="text-xs text-muted-foreground">{{ u.email }}</span>
            </div>
            <span class="text-xs uppercase text-muted-foreground">{{
              u.role
            }}</span>
          </div>
        </div>
        <p v-else class="text-sm text-muted-foreground">No users</p>
      </div>

      <div class="rounded-lg border p-4">
        <h2 class="text-lg font-semibold mb-3">Recent Organizations</h2>
        <UiSkeleton v-if="isLoading" class="h-32" />
        <div v-else-if="overview?.recentOrganizations.length" class="space-y-2">
          <div
            v-for="org in overview.recentOrganizations"
            :key="org.id"
            class="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm"
          >
            <span class="font-medium">{{ org.name }}</span>
            <span class="text-xs text-muted-foreground">{{ org.slug }}</span>
          </div>
        </div>
        <p v-else class="text-sm text-muted-foreground">No organizations</p>
      </div>
    </div>
  </div>
</template>
