<script setup lang="ts">
const authClient = useNuxtApp().$authClient;

const activeOrg = authClient.useActiveOrganization();
const data = reactive({ activeOrg: activeOrg.value.data });

const searchQuery = ref("");

const {
  data: invitationsData,
  error,
  pending,
} = useAsyncData(
  "my-invitations" + data.activeOrg?.id,
  async () => {
    const { data: res, error } = await authClient.organization.listInvitations({
      query: {
        organizationId: data.activeOrg?.id,
      },
    });
    if (error) {
      throw error;
    }
    return res;
  },
  { server: false, lazy: true, immediate: !!data.activeOrg?.id },
);

// Filter invitations by search query
const filteredInvitations = computed(() => {
  if (!invitationsData.value) return [];
  return invitationsData.value.filter((inv) => {
    if (!searchQuery.value) return true;
    return inv.organizationId
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
  });
});

useHead({
  title: "Undangan | Gabung Organisasi",
  meta: [
    {
      name: "description",
      content: "Lihat dan kelola undangan bergabung ke organisasi atau tim kolaborasi keuangan.",
    },
    {
      name: "keywords",
      content: "myuanggwe app, undangan bergabung organisasi keuangan, invitation to join financial team, accept reject invitation kolaborasi, pending invitation management, team finance invite system, daftar undangan masuk organisasi, invitation ID based join mechanism, collaborative finance invitation tracker, undangan bergabung tim UKM, invitation management dashboard",
    },
  ],
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-8">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div class="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
        <Icon name="lucide:mail" class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
      </div>
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">My Invitations</h1>
        <p class="text-xs sm:text-sm text-muted-foreground">
          {{ filteredInvitations.length }} pending invitation(s)
        </p>
      </div>
    </div>

    <!-- Search Bar -->
    <UiCard>
      <UiCardContent class="p-3 sm:p-6">
        <div class="relative">
          <Icon name="lucide:search" class="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <UiInput
            type="text"
            placeholder="Search by Organization ID..."
            v-model="searchQuery"
            class="pl-10 font-mono text-xs sm:text-sm"
          />
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Invitations Table -->
    <UiCard>
      <UiCardContent class="p-0">
        <div v-if="pending">
          <div class="flex items-center justify-center py-12">
            <Icon name="lucide:loader-2" class="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </div>
        <div v-else-if="error">
          <div class="flex flex-col items-center justify-center py-12 px-4">
            <Icon name="lucide:alert-circle" class="mb-4 h-8 w-8 text-destructive" />
            <p class="text-base sm:text-lg font-semibold">Failed to load invitations</p>
            <p class="text-xs sm:text-sm text-muted-foreground text-center">
              {{ error?.message || "Please try again" }}
            </p>
          </div>
        </div>
        <div v-else-if="filteredInvitations.length === 0">
          <div class="flex flex-col items-center justify-center py-12 px-4">
            <div class="mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-muted">
              <Icon name="lucide:inbox" class="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
            </div>
            <h3 class="mb-2 text-sm sm:text-lg font-semibold">No invitations found</h3>
            <p class="text-xs sm:text-sm text-muted-foreground text-center">
              {{ searchQuery ? "Try a different search term" : "You have no pending invitations" }}
            </p>
          </div>
        </div>
        <div v-else class="overflow-x-auto">
          <UiTable>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead class="text-xs sm:text-sm whitespace-nowrap">Invitation ID</UiTableHead>
                <UiTableHead class="text-xs sm:text-sm whitespace-nowrap">Email</UiTableHead>
                <UiTableHead class="text-xs sm:text-sm whitespace-nowrap">Role</UiTableHead>
                <UiTableHead class="text-xs sm:text-sm whitespace-nowrap">Date</UiTableHead>
                <UiTableHead class="text-xs sm:text-sm whitespace-nowrap">Expires</UiTableHead>
                <UiTableHead class="text-xs sm:text-sm whitespace-nowrap">Status</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-for="invitation in filteredInvitations" :key="invitation.id">
                <UiTableCell>
                  <div class="flex items-center gap-2">
                    <div class="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md bg-primary/10 shrink-0">
                      <Icon name="lucide:building-2" class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <span class="max-w-[120px] sm:max-w-[200px] truncate font-mono text-xs sm:text-sm">
                      {{ invitation.id }}
                    </span>
                  </div>
                </UiTableCell>

                <UiTableCell>
                  <span class="max-w-[150px] truncate block font-mono text-xs sm:text-sm">
                    {{ invitation.email }}
                  </span>
                </UiTableCell>

                <UiTableCell>
                  <UiBadge variant="outline" class="capitalize text-xs whitespace-nowrap">
                    <Icon v-if="invitation.role === 'admin'" name="lucide:shield" class="mr-1 h-3 w-3" />
                    <Icon v-else name="lucide:user" class="mr-1 h-3 w-3" />
                    {{ invitation.role }}
                  </UiBadge>
                </UiTableCell>

                <UiTableCell class="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
                  {{ new Date(invitation.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }}
                </UiTableCell>

                <UiTableCell class="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
                  {{ new Date(invitation.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) }}
                </UiTableCell>

                <UiTableCell>
                  <UiBadge variant="secondary" class="capitalize text-xs whitespace-nowrap">
                    <Icon name="lucide:clock" class="mr-1 h-3 w-3" />
                    {{ invitation.status }}
                  </UiBadge>
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>
