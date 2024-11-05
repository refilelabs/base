<template>
  <footer class="w-full border-t border-[var(--ui-border)]">
    <UContainer class="py-4">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row items-center text-sm text-[var(--ui-text-dimmed)]">
          Made with ❤️ by <Logo class="inline ml-2.5 w-24 pb-1" />
        </div>

        <div>
          <UButton icon="simple-icons:github" to="https://github.com/refilelabs" target="_blank" variant="ghost" color="neutral" size="lg" class="rounded-full" square>
            <span class="sr-only">GitHub</span>
          </UButton>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
