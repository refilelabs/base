<script setup lang="ts">
import type { FileInputProps } from './File.vue'
import { twMerge } from 'tailwind-merge'
import { fileInputPropsDefaults } from './File.vue'

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

const dropZoneRef = useTemplateRef('dropZoneRef')

const { isOverDropZone: isOverDropZoneSource } = useDropZone(dropZoneRef, setFile)

const isOverDropZone = computed(() => isOverDropZoneSource.value && !props.disableInput)

const baseClasses = [
  'flex',
  'flex-col',
  'items-center',
  'justify-center',
  'w-full',
  'h-screen',
  'min-h-[30vh]',
  'max-h-[65vh]',
  'border-2',
  'border-dashed',
  'rounded-xl',
  'cursor-pointer',
  'bg-elevated',
  'transition-colors',
]
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label
      ref="dropZoneRef" for="file-dropzone"
      :class="{
        'border-default': !isOverDropZone,
        'hover:border-accented': !props.disableInput,
        'border-primary': isOverDropZone,
        'hover:bg-accented': !props.disableInput,
        [twMerge(baseClasses, props.class)]: true,
      }"
    >
      <div v-if="!data" class="flex flex-col items-center justify-center pt-5 pb-6">
        <UIcon :name="icon" class="w-12 h-12 mb-4 text-primary opacity-70" />
        <p class="mb-2 text-sm text-muted">
          <span class="font-semibold text-highlighted">Click to upload</span>
          or drag and drop
        </p>
        <p v-if="hint" class="text-xs text-muted" v-text="hint" />
      </div>
      <slot v-else name="file-preview" />
      <input v-if="!disableInput" id="file-dropzone" type="file" :accept="accept" class="hidden" multiple="false" @change="onUpdate">
    </label>
  </div>
</template>
