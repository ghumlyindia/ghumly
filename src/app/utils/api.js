export function getApiBase() {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, '');
  }
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_API_BASE_URL must be set in production');
  }
  return 'http://localhost:5000/api';
}

export async function fetchJson(path, init) {
  const url = `${getApiBase()}${path}`;
  let headers = init?.headers || {};
  if (typeof window !== 'undefined') {
    try {
      const { getToken } = await import('./auth');
      const token = getToken();
      if (token) headers = { ...headers, Authorization: `Bearer ${token}` };
    } catch { }
  }
  const res = await fetch(url, { ...init, headers, next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}


