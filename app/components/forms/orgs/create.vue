<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";
import { toast } from "vue-sonner";
import { createOrgsSchema } from "~/lib/@type-schemas/create-orgs";

const { $authClient } = useNuxtApp();
const session = $authClient.useSession();

const orgForm = useForm({
  defaultValues: { name: "", slug: "" },
  validators: {
    onChange: createOrgsSchema,
    onSubmit: createOrgsSchema,
  },
  onSubmit: async ({ value }) => {
    const { error } = await $authClient.organization.create(value);
    if (!error) {
      toast.success("Organisasi berhasil dibuat");
      await refreshNuxtData();
      await navigateTo("/dashboard");
    } else {
      toast.error("Gagal membuat organisasi");
    }
  },
});
</script>

<template>
  <UiCard class="w-full max-w-sm">
    <UiCardHeader>
      <UiCardTitle class="text-2xl">Buat Organisasi</UiCardTitle>
      <UiCardDescription>Masukkan nama dan slug untuk membuat organisasi baru.</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form class="grid gap-4" @submit.prevent="orgForm.handleSubmit()">
        <orgForm.Field name="name">
          <template #default="{ field }">
            <div class="grid gap-2">
              <UiLabel for="name">Nama</UiLabel>
              <UiInput
                id="name"
                type="text"
                placeholder="Nama Organisasi"
                :value="field.state.value"
                required
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
        </orgForm.Field>

        <orgForm.Field name="slug">
          <template #default="{ field }">
            <div class="grid gap-2">
              <UiLabel for="slug">Slug</UiLabel>
              <UiInput
                id="slug"
                type="text"
                placeholder="nama-organisasi"
                :value="field.state.value"
                required
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
        </orgForm.Field>

        <orgForm.Subscribe>
          <template #default="{ isSubmitting }">
            <UiButton
              type="submit"
              class="w-full"
              :disabled="!session.data || isSubmitting"
            >
              <Icon
                v-if="isSubmitting"
                name="lucide:loader-2"
                class="mr-2 h-4 w-4 animate-spin"
              />
              {{ isSubmitting ? "Menyimpan..." : "Buat Organisasi" }}
            </UiButton>
          </template>
        </orgForm.Subscribe>
      </form>
    </UiCardContent>
  </UiCard>
</template>
