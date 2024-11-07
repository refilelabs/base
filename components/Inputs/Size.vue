<script setup lang="ts">
const props = defineProps<{
  aspectRatio: number
  sourceDimensions: [number, number]
  size: [number, number]
}>()

const sizeModel = useVModel(props, 'size')

const width = ref(props.size[0])
const height = ref(props.size[1])

let updating = false

watchEffect(() => {
  if (!updating) {
    updating = true
    height.value = Math.round(width.value / props.aspectRatio)
    updating = false
  }
})

watchEffect(() => {
  if (!updating) {
    updating = true
    width.value = Math.round(height.value * props.aspectRatio)
    updating = false
  }
})

watchEffect(() => {
  sizeModel.value = [width.value, height.value]
})
</script>

<template>
  <div class="flex flex-row items-center space-x-2">
    <UFormField label="Width">
      <UInput v-model.number="width" type="number" />
    </UFormField>
    <UIcon name="heroicons:x-mark-20-solid" class="text-[var(--ui-text-muted)] mt-7" />
    <UFormField label="Height">
      <UInput v-model.number="height" type="number" />
    </UFormField>
  </div>
</template>
