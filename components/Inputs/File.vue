<script lang="ts">
export interface FileInputProps {
  modelValue?: File
  accept?: string
  icon?: string
  hint?: string
}

export const fileInputPropsDefaults = {
  icon: 'heroicons:arrow-up-tray-solid',
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<FileInputProps>(), fileInputPropsDefaults)

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

const { isOverDropZone } = useDropZone(dropZoneRef, setFile)
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label
      ref="dropZoneRef" for="file-dropzone"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-[var(--ui-bg-elevated)] hover:bg-[var(--ui-bg-accented)]"
      :class="{
        'border-[var(--ui-border)] hover:border-[var(--ui-border-accented)]': !isOverDropZone,
        'border-[var(--ui-primary)]': isOverDropZone,
      }"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <template v-if="!data">
          <UIcon :name="icon" class="w-10 h-10 mb-3 text-[var(--ui-text-toned)]" />
          <p class="mb-2 text-sm text-[var(--ui-text-muted)]">
            <span class="font-semibold">Click to choose</span>
            or drag and drop
          </p>
          <p v-if="hint" class="text-xs text-[var(--ui-text-muted)]" v-text="hint" />
        </template>
        <div v-else class="grid place-items-center">
          <UTooltip :text="data?.name" class="pb-0">
            <div class="relative group" @click.capture.prevent="data = undefined">
              <div class="absolute text-white inset-0 hidden group-hover:grid place-items-center backdrop-brightness-50">
                <span>Remove file</span>
              </div>
              <slot name="file-preview">
                <div class="square">{{ data.name }}</div>
              </slot>
            </div>
          </UTooltip>
        </div>
      </div>
      <input id="file-dropzone" type="file" :accept="accept" class="hidden" multiple="false" @change="onUpdate">
    </label>
  </div>
</template>
