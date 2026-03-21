/**
 * Creates an object URL from a Blob ref and automatically revokes it when the
 * source changes or the component unmounts.
 */
export function useObjectUrl(source: MaybeRefOrGetter<Blob | null | undefined>): Readonly<Ref<string | null>> {
  const url = ref<string | null>(null)

  watchEffect((onCleanup) => {
    const blob = toValue(source)
    if (!blob) {
      url.value = null
      return
    }
    const objectUrl = URL.createObjectURL(blob)
    url.value = objectUrl
    onCleanup(() => URL.revokeObjectURL(objectUrl))
  })

  return readonly(url)
}
