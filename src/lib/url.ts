export function optimizeThumbnailUrl(src: string): string {
  const url = new URL(src)

  if (!url.searchParams.has('format')) {
    url.searchParams.set('format', 'webp')
  }

  if (!url.searchParams.has('thumbnail')) {
    url.searchParams.set('thumbnail', '512')
  }

  return url.toString()
}
