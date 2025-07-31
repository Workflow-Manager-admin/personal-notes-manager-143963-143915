'use client';

export const API_URL = process.env.NEXT_PUBLIC_NOTES_API_URL || '';

/**
 * Wrapper for HTTP requests to backend. Handles authentication and errors.
 * @param {string} endpoint - The relative API path.
 * @param {RequestInit} options - Request options.
 */
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = API_URL + endpoint;
  const opts: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include', // for cookies/session if used
  };
  const res = await fetch(url, opts);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || res.statusText);
  }
  return res.json();
}
