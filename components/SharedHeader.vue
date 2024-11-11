<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  options?: NavigationMenuItem[]
}>()

const verticalMenuOpen = ref(false)

const items = computed(() => [
  [
    ...(props.options ?? []),
  ],
  [
    {
      label: 'GitHub',
      icon: 'simple-icons:github',
      badge: {
        color: 'secondary',
        label: 'New',
      },
      to: 'https://github.com/refilelabs',
      target: '_blank',
    },
  ],
] as NavigationMenuItem[][])

// If a group has children remove the to property and instead add an additional child at the start which points to the original parent to url
const verticalOptions = computed(() => {
  return items.value.map((group) => {
    return group.map((item) => {
      if (item.children) {
        return {
          ...item,
          to: undefined,
          children: [
            {
              label: 'Overview',
              icon: 'heroicons:list-bullet',
              to: item.to,
              active: item.active,
              onSelect: () => verticalMenuOpen.value = false,
            },
            ...item.children.map((child) => {
              return {
                ...child,
                onSelect: () => verticalMenuOpen.value = false,
              }
            }),
          ],
        }
      }
      return item
    })
  })
})
</script>

<template>
  <header class="w-full p-3 flex flex-row justify-between items-center sticky top-0 z-999 border-b border-[var(--ui-border)] backdrop-blur-xl">
    <UTooltip text="Go to home">
      <ULink to="https://refilelabs.com" class="text-2xl font-bold" variant="link">
        <Logo />
      </ULink>
    </UTooltip>

    <div class="flex flex-row items-center">
      <nav class="hidden md:flex flex-row gap-x-4">
        <UNavigationMenu orientation="horizontal" :items="items" class="data-[orientation=vertical]:w-48" />
      </nav>
      <div class="flex flex-row items-center md:ml-6 md:pl-6 md:border-l md:border-[var(--ui-border)] gap-x-2">
        <UTooltip text="Toggle color mode">
          <ColorScheme />
        </UTooltip>
        <UTooltip text="Toggle menu">
          <UModal v-model:open="verticalMenuOpen" fullscreen :transition="false">
            <UButton variant="ghost" color="neutral" size="lg" icon="heroicons:bars-3" class="md:hidden cursor-pointer" />

            <template #title>
              <ULink to="/" class="text-2xl font-bold" variant="link">
                <Logo class="w-36" />
                <span class="sr-only">
                  re;file labs
                </span>
              </ULink>
            </template>

            <template #body>
              <UNavigationMenu orientation="vertical" :items="verticalOptions" />
            </template>
          </UModal>
        </UTooltip>
      </div>
    </div>
  </header>
</template>
