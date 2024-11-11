<script setup lang="ts">
import { type FileInputProps, fileInputPropsDefaults } from './File.vue'

const props = withDefaults(defineProps<FileInputProps>(), fileInputPropsDefaults)

const data = useVModel(props, 'modelValue')

const imgSource = computed(() => {
  if (data.value) {
    return URL.createObjectURL(data.value)
  }
  else {
    return undefined
  }
})
</script>

<template>
  <InputsFile v-bind="props" v-model="data" accept="image/*">
    <template #file-preview>
      <img :src="imgSource || ''" class="object-scale-down max-h-56 max-w-xl min-h-24 min-w-24">
    </template>
  </InputsFile>
</template>
