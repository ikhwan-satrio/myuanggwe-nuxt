<script setup lang="ts">
const colorMode = useColorMode();
function toggleColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <UiButton variant="ghost" size="icon" @click="toggleColorMode">
    <Icon
      :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
      size="20"
    />
  </UiButton>
</template>
