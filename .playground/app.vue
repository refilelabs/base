<script setup lang="ts">
const file = ref<File | undefined>()
const size = ref<[number, number]>([1920, 1080])
</script>

<template>
  <UApp>
    <div class="flex flex-col items-center justify-center w-full h-screen">
      <SharedHeader />
      <UContainer class="py-12 flex-1 flex flex-col gap-8">
        <InputsFile v-model="file" />
        <InputsImage v-model="file" />
        <InputsMinimal v-model="file" />
        <InputsSize v-model:size="size" :aspect-ratio="16 / 9" :source-dimensions="[1920, 1080]" />
      </UContainer>
      <SharedFooter />
    </div>
  </UApp>
</template>
