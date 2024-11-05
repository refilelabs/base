<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

.dark {
    --ui-bg: var(--ui-color-neutral-950);
    --ui-bg-elevated: var(--ui-color-neutral-900);
    --ui-bg-accented: var(--ui-color-neutral-800);
    --ui-bg-inverted: var(--color-white);

    --ui-border: var(--ui-color-neutral-800);
    --ui-border-accented: var(--ui-color-neutral-700);
    --ui-border-inverted: var(--color-white);
}
</style>
