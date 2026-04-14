"use client";

import { useState, useEffect } from "react";

export interface WhoopMetrics {
  rhr?: number;
  hrv?: number;
  recovery_score?: number;
  deep_sleep_minutes?: number;
  sleep_debt_minutes?: number;
  sleep_duration_minutes?: number;
  sleep_efficiency?: number;
  rem_minutes?: number;
  light_minutes?: number;
  sleep_date?: string;
  [key: string]: unknown;
}

interface WhoopState {
  data: WhoopMetrics | null;
  loading: boolean;
  error: string | null;
  configured: boolean;
  fetchedAt: string | null;
}

export function useWhoop(): WhoopState {
  const [state, setState] = useState<WhoopState>({
    data: null,
    loading: true,
    error: null,
    configured: false,
    fetchedAt: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch("/api/whoop");
        const json = await res.json();

        if (cancelled) return;

        if (!json.configured) {
          setState({ data: null, loading: false, error: null, configured: false, fetchedAt: null });
          return;
        }

        if (json.data) {
          setState({
            data: json.data,
            loading: false,
            error: null,
            configured: true,
            fetchedAt: json.fetchedAt,
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: json.message,
            configured: true,
            fetchedAt: null,
          });
        }
      } catch {
        if (!cancelled) {
          setState({ data: null, loading: false, error: "Network error", configured: false, fetchedAt: null });
        }
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return state;
}
