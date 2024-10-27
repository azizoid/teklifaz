const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const cache = new Map<string, { etag: string; data: any }>()

export const fetchFromGitHubWithETag = async <T = unknown>(endpoint: string): Promise<T> => {
  const cached = cache.get(endpoint)

  const headers: Record<string, string> = {
    Authorization: `Bearer ${GITHUB_TOKEN}`
  }

  if (cached && cached.etag) {
    // Send the ETag with the request to check if data has changed
    headers['If-None-Match'] = cached.etag
  }

  const res = await fetch(`https://api.github.com/${endpoint}`, {
    headers
  })

  if (res.status === 304 && cached) {
    return cached.data
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.statusText}`)
  }

  const data = await res.json()

  // Cache the response and store the new ETag
  const etag = res.headers.get('etag')
  if (etag) {
    cache.set(endpoint, { etag, data })
  }

  return data
}