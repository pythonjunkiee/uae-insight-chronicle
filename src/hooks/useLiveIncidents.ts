import { useState, useEffect, useCallback, useRef } from "react";
import { fetchLiveData, type ApiStatuses, type LiveDataResult } from "@/lib/liveDataService";
import { incidents as staticIncidents, type Incident } from "@/data/incidents";

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 min

export interface UseLiveIncidentsResult {
  incidents: Incident[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  apiStatuses: ApiStatuses;
  refresh: () => void;
}

export function useLiveIncidents(): UseLiveIncidentsResult {
  const [incidents, setIncidents] = useState<Incident[]>(staticIncidents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [apiStatuses, setApiStatuses] = useState<ApiStatuses>({
    gdelt: "disabled",
    newsapi: "disabled",
    acled: "disabled",
    mediastack: "disabled",
  });
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const load = useCallback(async (force = false) => {
    setLoading(true);
    setError(null);
    try {
      const result: LiveDataResult = await fetchLiveData(force);
      setIncidents(result.incidents);
      setApiStatuses(result.statuses);
      setLastUpdated(result.lastUpdated);
    } catch (err) {
      console.error("[UAE Tracker] Live data fetch failed:", err);
      setError("Live APIs temporarily unavailable");
      setIncidents([...staticIncidents].sort((a, b) => b.date.localeCompare(a.date)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    intervalRef.current = setInterval(() => load(true), REFRESH_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [load]);

  const refresh = useCallback(() => load(true), [load]);

  return { incidents, loading, error, lastUpdated, apiStatuses, refresh };
}
