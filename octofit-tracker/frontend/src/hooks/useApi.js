import { useState, useEffect } from 'react';

/**
 * Custom hook for making API calls to the OctoFit Tracker backend.
 *
 * Each call must pass the full API URL to `useApi`.
 */
export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!options.skip);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (options.skip) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options.skip]);

  return { data, loading, error };
}

/**
 * Helper to make POST/PUT/DELETE requests.
 * The full API URL should be passed in as `endpoint`.
 */
export async function apiRequest(endpoint, method = 'POST', body) {
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
