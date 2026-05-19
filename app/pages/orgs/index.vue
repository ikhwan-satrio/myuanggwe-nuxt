<script setup lang="ts">
const { $authClient } = useNuxtApp();

const orgs = $authClient.useListOrganizations();

useHead({
  title: "NewOrgs - MyUangGwe | Financial Management App",
  meta: [
    { name: "description", content: "Create an organizations to collaborate" },
    {
      name: "keywords",
      content:
        "create organizations, financial account, financial management, financial dashboard",
    },
  ],
});

</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <UiTabs default-value="create">
      <UiTabsList>
        <UiTabsTrigger value="create">Create</UiTabsTrigger>
        <UiTabsTrigger value="enter">Enter</UiTabsTrigger>
        <UiTabsTrigger value="invite" :disabled="!orgs?.data"
          >Invite</UiTabsTrigger
        >
      </UiTabsList>
      <UiTabsContent value="create"><FormsOrgsCreate /></UiTabsContent>
      <UiTabsContent value="enter"><FormsOrgsEnter /></UiTabsContent>
      <UiTabsContent value="invite"><FormsOrgsInvite /></UiTabsContent>
    </UiTabs>
  </div>
</template>
