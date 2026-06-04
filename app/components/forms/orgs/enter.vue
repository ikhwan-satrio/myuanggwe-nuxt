<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { toast } from "vue-sonner";
import { enterOrgsSchema } from "~/lib/@type-schemas/enter-orgs";
import { useOrgsTabsStore } from "~/stores/orgs-tabs";

const orgsTabStore = useOrgsTabsStore();
const { $authClient } = useNuxtApp();

const joinOrgForm = useForm({
  defaultValues: { invitationId: "" },
  validators: {
    onChange: enterOrgsSchema,
    onSubmit: enterOrgsSchema,
  },
  onSubmit: async ({ value }) => {
    const { error } = await $authClient.organization.acceptInvitation({
      invitationId: value.invitationId,
    });
    if (!error) {
      toast.success("Successfully joined organization");
      await refreshNuxtData()
      await navigateTo("/dashboard");
    } else {
      toast.error("Failed to join organization");
    }
  },
});
</script>

<template>
  <UiCard class="w-full max-w-md">
    <UiCardHeader>
      <UiCardTitle class="text-2xl">Join Organization</UiCardTitle>
      <UiCardDescription>Enter the invitation ID to join.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form class="grid gap-4" @submit.prevent="joinOrgForm.handleSubmit()">
        <joinOrgForm.Field name="invitationId">
          <template #default="{ field }">
            <div class="grid gap-2">
              <UiLabel for="invitationId">Invitation ID</UiLabel>
              <UiInput
                id="invitationId"
                type="text"
                placeholder="Enter invitation ID"
                :value="field.state.value"
                required
                class="text-center"
                @blur="field.handleBlur()"
                @input="(e: Event) => field.handleChange((e.target as HTMLInputElement).value)"
              />
              <p v-if="field.state.meta.errors.length > 0" class="text-sm text-destructive">
                {{ field.state.meta.errors[0]?.message }}
              </p>
            </div>
          </template>
        </joinOrgForm.Field>

        <joinOrgForm.Subscribe>
          <template #default="{ isSubmitting }">
            <UiButton type="submit" class="w-full" :disabled="isSubmitting">
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
              <Icon v-else name="lucide:users" class="mr-2 h-4 w-4" />
              {{ isSubmitting ? "Joining..." : "Join Organization" }}
            </UiButton>
          </template>
        </joinOrgForm.Subscribe>
      </form>
    </UiCardContent>
    <UiCardFooter class="flex flex-col gap-4">
      <UiSeparator />
      <div class="text-center">
        <p class="text-sm text-muted-foreground">Don't have an invitation ID?</p>
        <button class="text-sm font-medium text-primary underline hover:no-underline cursor-pointer" @click="orgsTabStore.setActiveTab('create')">
          Create your own organization
        </button>
      </div>
    </UiCardFooter>
  </UiCard>
</template>
