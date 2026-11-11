const BASE_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('Cannot reach the server. Is "npm run api" running?')
  }
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return (res.status === 204 ? undefined : await res.json()) as T
}
