<script setup lang="ts">
const file = ref<File | undefined>()
</script>

<template>
  <UApp>
    <UContainer class="py-12">
      <InputsFile v-model="file" />
    </UContainer>
  </UApp>
</template>
