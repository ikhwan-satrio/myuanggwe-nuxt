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
      toast.success("Berhasil bergabung dengan organisasi");
      await refreshNuxtData()
      await navigateTo("/dashboard");
    } else {
      toast.error("Gagal bergabung dengan organisasi");
    }
  },
});
</script>

<template>
  <UiCard class="w-full max-w-md">
    <UiCardHeader>
      <UiCardTitle class="text-2xl">Gabung Organisasi</UiCardTitle>
      <UiCardDescription>Masukkan ID undangan untuk bergabung.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form class="grid gap-4" @submit.prevent="joinOrgForm.handleSubmit()">
        <joinOrgForm.Field name="invitationId">
          <template #default="{ field }">
            <div class="grid gap-2">
              <UiLabel for="invitationId">ID Undangan</UiLabel>
              <UiInput
                id="invitationId"
                type="text"
                placeholder="Masukkan ID undangan"
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
              {{ isSubmitting ? "Bergabung..." : "Gabung Organisasi" }}
            </UiButton>
          </template>
        </joinOrgForm.Subscribe>
      </form>
    </UiCardContent>
    <UiCardFooter class="flex flex-col gap-4">
      <UiSeparator />
      <div class="text-center">
        <p class="text-sm text-muted-foreground">Tidak punya ID undangan?</p>
        <button class="text-sm font-medium text-primary underline hover:no-underline cursor-pointer" @click="orgsTabStore.setActiveTab('create')">
          Buat organisasi sendiri
        </button>
      </div>
    </UiCardFooter>
  </UiCard>
</template>
