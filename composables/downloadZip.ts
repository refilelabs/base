/**
 * Zips a flat or folder-structured set of files and triggers a download.
 *
 * Keys are used as paths inside the zip. Use forward slashes for folders:
 *   { 'image.png': data }
 *   { 'page-1/image.png': data, 'page-2/image.png': data }
 */
export async function downloadAsZip(
  files: Record<string, Uint8Array>,
  filename = 'download.zip',
): Promise<void> {
  const { zip } = await import('fflate')
  const zipped = await new Promise<Uint8Array>((resolve, reject) => {
    zip(files, (err, data) => err ? reject(err) : resolve(data))
  })
  startDownloadFile(new File([zipped as Uint8Array<ArrayBuffer>], filename, { type: 'application/zip' }))
}
