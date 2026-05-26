<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query"
import { toast } from "vue-sonner"
import { useOrgsManageStore } from "~/stores/crud/orgs-manage"

const authClient = useNuxtApp().$authClient
const store = useOrgsManageStore()

const orgs = authClient.useActiveOrganization()
const user = authClient.useSession()

const manageQuery = useAsyncData(
  "manage-orgs",
  async () => {
    const { data, error } = await authClient.organization.getFullOrganization({
      query: {
        organizationId: orgs.value.data?.id,
      },
    })
    if (error) throw error
    return data
  },
  { server: false, lazy: true, immediate: !!orgs.value.data?.id },
)

const isOwner = computed(() => {
  return orgs.value.data?.members.find((o) => o.user.id == user.value.data?.user.id)?.role === "owner"
})

const removeMemberMutation = useMutation({
  mutationFn: async (id: string) => {
    const { data, error } = await authClient.organization.removeMember({
      memberIdOrEmail: id,
      organizationId: orgs.value.data?.id,
    })
    if (error) throw error
    return data
  },
  onSuccess: async () => {
    await refreshNuxtData()
    toast.success("Member removed")
    store.closeRemoveMember()
  },
  onError: (err: any) => {
    toast.error(err.message || "Failed to remove member")
  },
})

const updateRoleMutation = useMutation({
  mutationFn: async ({ id, role }: { id: string; role: string }) => {
    const { data, error } = await authClient.organization.updateMemberRole({
      role,
      memberId: id,
      organizationId: orgs.value.data?.id,
    })
    if (error) throw error
    return data
  },
  onSuccess: async () => {
    await refreshNuxtData()
    toast.success("Role updated")
  },
  onError: (err: any) => {
    toast.error(err.message || "Failed to update role")
  },
})

const deleteOrgMutation = useMutation({
  mutationFn: async () => {
    const { data, error } = await authClient.organization.delete({
      organizationId: orgs.value.data?.id!,
    })
    if (error) throw new Error(error.message || "Cannot delete orgs!")
    return data
  },
  onSuccess: async () => {
    await refreshNuxtData()
    toast.success("Organization deleted successfully")
    navigateTo("/dashboard")
  },
  onError: (err: any) => {
    toast.error(err.message || "Failed to delete organization")
  },
})

const handleUpdateRole = (id: string, currentRole: string) => {
  const newRole = currentRole === "admin" ? "member" : "admin"
  updateRoleMutation.mutate({ id, role: newRole })
}

const handleRemoveMember = () => {
  if (store.memberToRemove) {
    removeMemberMutation.mutate(store.memberToRemove.id)
  }
}

const handleDeleteOrg = () => {
  deleteOrgMutation.mutate()
}

useHead({
  title: "Kelola Organisasi - MyUangGwe | Manajemen Tim",
  meta: [
    {
      name: "description",
      content: "Kelola anggota tim, atur peran, dan monitoring keuangan organisasi atau bisnis kecil Anda bersama-sama.",
    },
    {
      name: "keywords",
      content: "kelola anggota organisasi owner admin member, role-based team management keuangan, promote demote member role, hapus anggota organisasi tim, delete organization permanent data, manajemen tim bisnis kecil Indonesia, organization members table overview, collaborative finance admin panel, manage organization permissions Indonesia, team financial management dashboard untuk owner, UKM member management tool, keamanan data organisasi multi-level access",
    },
  ],
})

definePageMeta({
  middleware: ["auth"],
})
</script>

<template>
  <div class="container mx-auto max-w-4xl space-y-6 p-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Organization Management</h1>
      <template v-if="manageQuery.data?.value?.name">
        <UiBadge variant="outline" class="px-3 py-1 text-sm">
          Active: {{ manageQuery.data.value.name }}
        </UiBadge>
      </template>
    </div>

    <div v-if="manageQuery.pending.value" class="flex h-64 items-center justify-center">
      <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <UiCard v-else-if="!manageQuery.data?.value" class="border-dashed bg-muted/50">
      <UiCardContent class="flex flex-col items-center justify-center space-y-4 py-12 text-center">
        <Icon name="lucide:building-2" class="h-12 w-12 text-muted-foreground/50" />
        <div class="space-y-2">
          <h2 class="text-xl font-semibold">No Organization Active</h2>
          <p class="max-w-sm text-muted-foreground">
            Please switch to an organization context to manage its members and settings.
          </p>
        </div>
        <UiButton variant="outline" @click="navigateTo('/organizations')">Go to Organizations</UiButton>
      </UiCardContent>
    </UiCard>

    <UiCard v-else-if="!isOwner" class="border-destructive/20 bg-destructive/5">
      <UiCardContent class="flex flex-col items-center justify-center space-y-4 py-12 text-center text-destructive">
        <Icon name="lucide:shield-alert" class="h-12 w-12" />
        <div class="space-y-2">
          <h2 class="text-xl font-semibold">Access Restricted</h2>
          <p class="max-w-sm text-destructive/80">
            You must be an <strong>Owner</strong> of this organization to manage members and settings.
          </p>
        </div>
        <UiButton variant="outline" class="border-destructive/20 hover:bg-destructive/10" @click="navigateTo('/dashboard')">
          Back to Dashboard
        </UiButton>
      </UiCardContent>
    </UiCard>

    <template v-else>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Members</UiCardTitle>
          <UiCardDescription>Manage who has access to this organization.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <UiTable>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead>Name</UiTableHead>
                <UiTableHead>Email</UiTableHead>
                <UiTableHead>Role</UiTableHead>
                <UiTableHead class="text-right">Actions</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-for="member in manageQuery.data?.value?.members" :key="member.id">
                <UiTableCell class="font-medium">{{ member.user.name }}</UiTableCell>
                <UiTableCell>{{ member.user.email }}</UiTableCell>
                <UiTableCell>
                  <UiBadge :variant="member.role === 'owner' ? 'default' : 'secondary'">
                    {{ member.role }}
                  </UiBadge>
                </UiTableCell>
                <UiTableCell class="text-right">
                  <template v-if="member.role !== 'owner'">
                    <div class="flex justify-end gap-2">
                      <UiButton
                        variant="ghost" size="sm"
                        @click="handleUpdateRole(member.id, member.role)"
                        :disabled="updateRoleMutation.isPending.value"
                      >
                        <Icon :name="member.role === 'admin' ? 'lucide:arrow-down' : 'lucide:arrow-up'" class="mr-2 h-4 w-4" />
                        {{ member.role === "admin" ? "Demote" : "Promote" }}
                      </UiButton>
                      <UiButton
                        variant="ghost" size="sm"
                        class="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        @click="store.openRemoveMember({ id: member.id, name: member.user.name })"
                        :disabled="removeMemberMutation.isPending.value"
                      >
                        <Icon name="lucide:user-minus" class="h-4 w-4" />
                      </UiButton>
                    </div>
                  </template>
                  <template v-else>
                    <span class="text-xs text-muted-foreground italic">Owner</span>
                  </template>
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </UiCardContent>
      </UiCard>

      <UiCard class="border-destructive/50 bg-destructive/5">
        <UiCardHeader>
          <UiCardTitle class="text-destructive">Danger Zone</UiCardTitle>
          <UiCardDescription>Irreversible actions for your organization.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <h4 class="font-medium">Delete Organization</h4>
              <p class="text-sm text-muted-foreground">
                This will permanently delete the organization and all its data.
              </p>
            </div>
            <UiButton
              variant="destructive"
              @click="store.openDeleteOrg()"
              :disabled="deleteOrgMutation.isPending.value"
            >
              <Icon v-if="deleteOrgMutation.isPending.value" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
              {{ deleteOrgMutation.isPending.value ? "Deleting..." : "Delete Organization" }}
            </UiButton>
          </div>
        </UiCardContent>
      </UiCard>

      <UiDialog :open="store.isRemoveDialogOpen" @update:open="store.closeRemoveMember()">
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle>Remove Member</UiDialogTitle>
            <UiDialogDescription>
              Are you sure you want to remove <strong>{{ store.memberToRemove?.name }}</strong> from this organization?
            </UiDialogDescription>
          </UiDialogHeader>
          <UiDialogFooter>
            <UiButton variant="outline" @click="store.closeRemoveMember()">Cancel</UiButton>
            <UiButton variant="destructive" @click="handleRemoveMember" :disabled="removeMemberMutation.isPending.value">
              <Icon v-if="removeMemberMutation.isPending.value" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
              Remove Member
            </UiButton>
          </UiDialogFooter>
        </UiDialogContent>
      </UiDialog>

      <UiDialog :open="store.isDeleteDialogOpen" @update:open="store.closeDeleteOrg()">
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle class="text-destructive">Delete Organization</UiDialogTitle>
            <UiDialogDescription>
              <div class="space-y-3">
                <p>CRITICAL ACTION: Are you absolutely sure you want to delete this organization?</p>
                <div class="rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
                  Warning: All wallets, transactions, and categories associated with this organization will be PERMANENTLY lost.
                </div>
              </div>
            </UiDialogDescription>
          </UiDialogHeader>
          <UiDialogFooter>
            <UiButton variant="outline" @click="store.closeDeleteOrg()">Cancel</UiButton>
            <UiButton variant="destructive" @click="handleDeleteOrg" :disabled="deleteOrgMutation.isPending.value">
              <Icon v-if="deleteOrgMutation.isPending.value" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
              Permanently Delete
            </UiButton>
          </UiDialogFooter>
        </UiDialogContent>
      </UiDialog>
    </template>
  </div>
</template>
