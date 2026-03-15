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
      class="flex flex-col items-center justify-center w-full h-screen min-h-[30vh] max-h-[65vh] border-2 border-dashed rounded-xl cursor-pointer bg-elevated hover:bg-accented transition-colors"
      :class="{
        'border-default hover:border-accented': !isOverDropZone,
        'border-primary': isOverDropZone,
      }"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6 h-full max-w-full overflow-hidden">
        <template v-if="!data">
          <UIcon :name="icon" class="w-12 h-12 mb-4 text-primary opacity-70" />
          <p class="mb-2 text-sm text-muted">
            <span class="font-semibold text-highlighted">Click to upload</span>
            or drag and drop
          </p>
          <p v-if="hint" class="text-xs text-muted" v-text="hint" />
        </template>
        <div v-else class="group h-full w-full relative grid place-items-center overflow-hidden" @click.capture.prevent="data = undefined">
          <UTooltip :text="data?.name" class="pb-0 h-full w-full flex items-center justify-center overflow-hidden">
            <div class="h-full w-full flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:brightness-50 group-hover:blur-sm">
              <slot name="file-preview">
                <div class="square">{{ data.name }}</div>
              </slot>
            </div>
          </UTooltip>
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div class="flex flex-col items-center gap-2 text-white">
              <UIcon name="heroicons:trash-solid" class="w-7 h-7 drop-shadow" />
              <span class="text-sm font-medium drop-shadow">Remove file</span>
            </div>
          </div>
        </div>
      </div>
      <input id="file-dropzone" type="file" :accept="accept" class="hidden" multiple="false" @change="onUpdate">
    </label>
  </div>
</template>
