function triggerDownload(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function startDownload(file: Uint8Array<ArrayBuffer>, filename: string) {
  const blob = new Blob([file], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
  URL.revokeObjectURL(url)
}

export function startDownloadFile(file: File) {
  const url = URL.createObjectURL(file)
  triggerDownload(url, file.name)
  URL.revokeObjectURL(url)
}

export function downloadAll(items: { url: string, filename: string }[]) {
  for (const { url, filename } of items)
    triggerDownload(url, filename)
}
