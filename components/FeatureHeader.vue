<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

defineProps<{
  callToAction?: ButtonProps
  title: string
}>()
</script>

<template>
  <div class="space-y-3 flex flex-col items-center mb-36 mt-24">
    <UButton v-if="callToAction" v-bind="callToAction" class="rounded-full" />
    <h1 class="text-6xl font-bold text-center text-[var(--ui-text-highlited)]" v-text="title" />
    <section class="text-center text-xl text-[var(--ui-text-toned)]">
      <slot />
    </section>
  </div>
</template>
