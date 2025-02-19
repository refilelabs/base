export function startDownload(file: Uint8Array, filename: string) {
  const blob = new Blob([file], { type: 'application/octet-stream' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function startDownloadFile(file: File) {
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
