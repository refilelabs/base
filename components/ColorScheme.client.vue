<script lang="ts" setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <UButton variant="ghost" :icon="isDark ? 'heroicons:moon-20-solid' : 'heroicons:sun-20-solid'" color="neutral" size="lg" class="cursor-pointer" square @click="isDark = !isDark">
    <span class="sr-only">Toggle color mode</span>
  </UButton>
</template>
