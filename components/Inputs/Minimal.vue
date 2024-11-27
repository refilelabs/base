<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { type FileInputProps, fileInputPropsDefaults } from './File.vue'

const props = withDefaults(defineProps<FileInputProps & { class?: string, disableInput?: boolean }>(), { ...fileInputPropsDefaults, class: '', disableInput: false })

const data = useVModel(props, 'modelValue')

function setFile(file: File[] | null | FileList) {
  if (file) {
    data.value = file[0]
  }
}

function onUpdate(e: Event) {
  const target = e.target as HTMLInputElement

  if (target.files) {
    setFile(target.files)
  }
}

const dropZoneRef = ref<HTMLDivElement>()

const { isOverDropZone: isOverDropZoneSource } = useDropZone(dropZoneRef, setFile)

const isOverDropZone = computed(() => isOverDropZoneSource.value && !props.disableInput)

const baseClasses = [
  'flex',
  'flex-col',
  'items-center',
  'justify-center',
  'w-full',
  'h-64',
  'border-2',
  'border-dashed',
  'rounded-lg',
  'cursor-pointer',
  'bg-[var(--ui-bg-elevated)]',
]
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label
      ref="dropZoneRef" for="file-dropzone"
      :class="{
        'border-[var(--ui-border)]': !isOverDropZone,
        'hover:border-[var(--ui-border-accented)]': !props.disableInput,
        'border-[var(--ui-primary)]': isOverDropZone,
        'hover:bg-[var(--ui-bg-accented)]': !props.disableInput,
        [twMerge(baseClasses, props.class)]: true,
      }"
    >
      <div v-if="!data" class="flex flex-col items-center justify-center pt-5 pb-6">
        <UIcon :name="icon" class="w-10 h-10 mb-3 text-[var(--ui-text-toned)]" />
        <p class="mb-2 text-sm text-[var(--ui-text-muted)]">
          <span class="font-semibold">Click to choose</span>
          or drag and drop
        </p>
        <p v-if="hint" class="text-xs text-[var(--ui-text-muted)]" v-text="hint" />
      </div>
      <slot v-else name="file-preview" />
      <input v-if="!disableInput" id="file-dropzone" type="file" :accept="accept" class="hidden" multiple="false" @change="onUpdate">
    </label>
  </div>
</template>
