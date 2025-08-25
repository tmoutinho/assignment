'use client'

import { useState, useEffect } from 'react'

interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  robots: string;
  themeColor: string;
  favicon: string;
}

interface UseMetaOptions {
  page?: string;
  enabled?: boolean;
  refetchInterval?: number;
}

interface UseMetaReturn {
  data: MetaData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useMeta(options: UseMetaOptions = {}): UseMetaReturn {
  const { page = 'home', enabled = true, refetchInterval } = options;
  const [data, setData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<Error | null>(null);

  const fetchMeta = async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/meta?page=${encodeURIComponent(page)}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch metadata: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching metadata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeta();
  }, [page, enabled]);

  useEffect(() => {
    if (!refetchInterval || !enabled) return;

    const interval = setInterval(fetchMeta, refetchInterval);
    return () => clearInterval(interval);
  }, [refetchInterval, enabled, page]);

  return {
    data,
    loading,
    error,
    refetch: fetchMeta,
  };
}

// Hook for updating document title dynamically
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (title && typeof document !== 'undefined') {
      const previousTitle = document.title;
      document.title = title;

      return () => {
        document.title = previousTitle;
      };
    }
  }, [title]);
}

// Hook for updating document meta tags dynamically
export function useDocumentMeta(meta?: Partial<MetaData>) {
  useEffect(() => {
    if (!meta || typeof document === 'undefined') return;

    const updates: Array<() => void> = [];

    // Update description
    if (meta.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const previousContent = metaDescription.getAttribute('content');
        metaDescription.setAttribute('content', meta.description);
        updates.push(() => {
          if (previousContent) {
            metaDescription.setAttribute('content', previousContent);
          }
        });
      }
    }

    // Update theme color
    if (meta.themeColor) {
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        const previousColor = metaTheme.getAttribute('content');
        metaTheme.setAttribute('content', meta.themeColor);
        updates.push(() => {
          if (previousColor) {
            metaTheme.setAttribute('content', previousColor);
          }
        });
      }
    }

    // Cleanup function
    return () => {
      updates.forEach(cleanup => cleanup());
    };
  }, [meta]);
}
