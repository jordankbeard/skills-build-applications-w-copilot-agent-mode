/**
 * Custom hook for making API calls to the OctoFit Tracker backend.
 * 
 * Requires VITE_CODESPACE_NAME environment variable to be set in .env.local
 * Example: VITE_CODESPACE_NAME=my-codespace-name
 * 
 * API endpoints: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[endpoint]/
 */

import { useState, useEffect } from 'react';

/**
 * Get the API base URL with fallback handling
 */
function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not set. API calls may fail. ' +
      'Please define VITE_CODESPACE_NAME in .env.local file.'
    );
    return 'https://localhost:8000/api';
  }
  
  return `https://${codespaceName}-8000.app.github.dev/api`;
}

/**
 * Hook for fetching data from the API
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
        
        const baseUrl = getApiBaseUrl();
        const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
        
        const response = await fetch(url);
        
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
 * Helper to make POST/PUT/DELETE requests
 */
export async function apiRequest(endpoint, method = 'POST', body) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  
  const response = await fetch(url, {
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
