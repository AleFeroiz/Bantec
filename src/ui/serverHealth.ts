export async function checkServerHealth(baseUrl: string, signal: AbortSignal, fetcher: typeof fetch = fetch): Promise<boolean> {
  try {
    const url = new URL('/health', baseUrl)
    if (url.protocol === 'ws:') url.protocol = 'http:'
    if (url.protocol === 'wss:') url.protocol = 'https:'
    const response = await fetcher(url.toString(), { cache: 'no-store', signal })
    if (!response.ok) return false
    const body: unknown = await response.json()
    return !!body && typeof body === 'object' && 'status' in body && body.status === 'ok'
  } catch {
    return false
  }
}
