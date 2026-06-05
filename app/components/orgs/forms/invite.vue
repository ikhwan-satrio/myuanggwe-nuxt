<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { toast } from "vue-sonner";
import { inviteOrgsSchema } from "~/lib/@type-schemas/invite-orgs";

const { $authClient } = useNuxtApp();

const inviteForm = useForm({
  defaultValues: { email: "", role: "member" as "member" | "admin" },
  validators: {
    onChange: inviteOrgsSchema,
    onSubmit: inviteOrgsSchema,
  },
  onSubmit: async ({ value }) => {
    const { error } = await $authClient.organization.inviteMember({
      email: value.email,
      role: value.role,
    });
    if (!error) {
      toast.success("Invitation sent successfully");
      await refreshNuxtData();
      inviteForm.reset();
    } else {
      toast.error("Failed to send invitation");
    }
  },
});
</script>

<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Invite Member</UiCardTitle>
      <UiCardDescription>Send an invitation to join your organization.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form class="grid gap-4" @submit.prevent="inviteForm.handleSubmit()">
        <inviteForm.Field name="email">
          <template #default="{ field }">
            <div class="grid gap-2">
              <UiLabel for="email">Email Address</UiLabel>
              <UiInput
                id="email"
                type="email"
                placeholder="member@example.com"
                :value="field.state.value"
                required
                autocomplete="email"
                @blur="field.handleBlur()"
                @input="
                  (e: Event) =>
                    field.handleChange((e.target as HTMLInputElement).value)
                "
              />
              <p
                v-if="field.state.meta.errors.length > 0"
                class="text-sm text-destructive"
              >
                {{ field.state.meta.errors[0]?.message }}
              </p>
            </div>
          </template>
        </inviteForm.Field>

        <inviteForm.Field name="role">
          <template #default="{ field }">
            <div class="grid gap-2">
              <UiLabel for="role">Role</UiLabel>
              <UiSelect :model-value="field.state.value" @update:model-value="(v) => field.handleChange(v as string)">
                <UiSelectTrigger id="role" class="w-full">
                  <UiSelectValue>
                    {{
                      field.state.value.charAt(0).toUpperCase() +
                      field.state.value.slice(1)
                    }}
                  </UiSelectValue>
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="member">
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:user" class="h-4 w-4" />
                      <div>
                        <p class="font-medium">Member</p>
                        <p class="text-xs text-muted-foreground">
                          Can view and edit data
                        </p>
                      </div>
                    </div>
                  </UiSelectItem>
                  <UiSelectItem value="admin">
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:shield" class="h-4 w-4" />
                      <div>
                        <p class="font-medium">Admin</p>
                        <p class="text-xs text-muted-foreground">
                          Full access and can manage members
                        </p>
                      </div>
                    </div>
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
              <p
                v-if="field.state.meta.errors.length > 0"
                class="text-sm text-destructive"
              >
                {{ field.state.meta.errors[0]?.message }}
              </p>
            </div>
          </template>
        </inviteForm.Field>

        <inviteForm.Subscribe>
          <template #default="{ isSubmitting }">
            <UiButton type="submit" class="w-full" :disabled="isSubmitting">
              <Icon
                v-if="isSubmitting"
                name="lucide:loader-2"
                class="mr-2 h-4 w-4 animate-spin"
              />
              <Icon v-else name="lucide:send" class="mr-2 h-4 w-4" />
              {{ isSubmitting ? "Sending..." : "Send Invitation" }}
            </UiButton>
          </template>
        </inviteForm.Subscribe>
      </form>
    </UiCardContent>
  </UiCard>
</template>
