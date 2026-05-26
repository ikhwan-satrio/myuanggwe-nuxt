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
  title: "Undangan - MyUangGwe | Gabung Organisasi",
  meta: [
    {
      name: "description",
      content: "Lihat dan kelola undangan bergabung ke organisasi atau tim kolaborasi keuangan.",
    },
    {
      name: "keywords",
      content: "undangan bergabung organisasi keuangan, invitation to join financial team, accept reject invitation kolaborasi, pending invitation management, team finance invite system, daftar undangan masuk organisasi, invitation ID based join mechanism, collaborative finance invitation tracker, undangan bergabung tim UKM, invitation management dashboard",
    },
  ],
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="container mx-auto max-w-6xl py-8">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
        >
          <!-- Ganti <Icon :icon="..."> menjadi <Icon name=""> -->
          <Icon name="lucide:mail" class="text-primary" />
        </div>
        <div>
          <h1 class="text-3xl font-bold">My Invitations</h1>
          <p class="text-muted-foreground">
            {{ filteredInvitations.length }} pending invitation(s)
          </p>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <UiCard class="mb-6">
      <UiCardContent class="pt-6">
        <div class="relative">
          <!-- Ganti <Icon :icon="..."> menjadi <Icon name=""> -->
          <Icon
            name="lucide:search"
            class="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <UiInput
            type="text"
            placeholder="Search by Organization ID..."
            v-model="searchQuery"
            class="pl-10 font-mono"
          />
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Invitations Table -->
    <UiCard>
      <UiCardContent class="p-0">
        <div v-if="pending">
          <div class="flex items-center justify-center py-12">
            <!-- Ganti <Icon :icon="..."> menjadi <Icon name=""> -->
            <Icon
              name="lucide:loader-2"
              class="animate-spin text-muted-foreground"
            />
          </div>
        </div>
        <div v-else-if="error">
          <div class="flex flex-col items-center justify-center py-12">
            <!-- Ganti <Icon :icon="..."> menjadi <Icon name=""> -->
            <Icon name="lucide:alert-circle" class="mb-4 text-destructive" />
            <p class="text-lg font-semibold">Failed to load invitations</p>
            <p class="text-sm text-muted-foreground">
              {{ error?.message || "Please try again" }}
            </p>
          </div>
        </div>
        <div v-else-if="filteredInvitations.length === 0">
          <div class="flex flex-col items-center justify-center py-12">
            <div
              class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted"
            >
              <!-- Ganti <Icon :icon="..."> menjadi <Icon name=""> -->
              <Icon name="lucide:inbox" class="text-muted-foreground" />
            </div>
            <h3 class="mb-2 text-lg font-semibold">No invitations found</h3>
            <p class="text-sm text-muted-foreground">
              {{
                searchQuery
                  ? "Try a different search term"
                  : "You have no pending invitations"
              }}
            </p>
          </div>
        </div>
        <div v-else class="rounded-md border">
          <UiTable>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead>Invitation ID</UiTableHead>
                <UiTableHead>Email</UiTableHead>
                <UiTableHead>Role</UiTableHead>
                <UiTableHead>Date</UiTableHead>
                <UiTableHead>Expires</UiTableHead>
                <UiTableHead>Status</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow
                v-for="invitation in filteredInvitations"
                :key="invitation.id"
              >
                <UiTableCell class="font-mono text-sm">
                  <div class="flex items-center gap-2">
                    <div
                      class="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10"
                    >
                      <!-- Ganti <Icon :icon="..."> menjadi <Icon name=""> -->
                      <Icon name="lucide:building-2" class="text-primary" />
                    </div>
                    <span class="max-w-[200px]">
                      {{ invitation.id }}
                    </span>
                  </div>
                </UiTableCell>

                <UiTableCell class="font-mono text-sm">
                  <div class="flex items-center gap-2">
                    <span class="max-w-[200px] truncate">
                      {{ invitation.email }}
                    </span>
                  </div>
                </UiTableCell>

                <UiTableCell>
                  <UiBadge variant="outline" class="capitalize">
                    <!-- Ganti <Icon v-if... :icon="..."> dan <Icon v-else :icon="..."> menjadi <Icon name=""> -->
                    <Icon
                      v-if="invitation.role === 'admin'"
                      name="lucide:shield"
                      class="mr-1"
                    />
                    <Icon v-else name="lucide:user" class="mr-1" />
                    {{ invitation.role }}
                  </UiBadge>
                </UiTableCell>

                <UiTableCell class="text-muted-foreground">
                  {{
                    new Date(invitation.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                </UiTableCell>

                <UiTableCell class="text-muted-foreground">
                  {{
                    new Date(invitation.expiresAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                </UiTableCell>

                <UiTableCell>
                  <UiBadge variant="secondary" class="capitalize">
                    <!-- Ganti <Icon :icon="..."> menjadi <Icon name=""> -->
                    <Icon name="lucide:clock" class="mr-1" />
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
