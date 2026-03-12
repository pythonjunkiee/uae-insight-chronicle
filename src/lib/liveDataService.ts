import { API_CONFIG, type ApiName } from "./apiConfig";
import { incidents as staticIncidents, type Incident } from "@/data/incidents";

// ─── Keyword Classification ─────────────────────────────
export function classifyIncident(
  title: string,
  description: string
): Incident["type"] {
  const text = `${title} ${description}`.toLowerCase();
  if (/intercept|shoot\s*down|destroyed|neutralized|patriot|thaad/i.test(text))
    return "Interception";
  if (/missile|ballistic|rocket|warhead/i.test(text)) return "Missile";
  if (/drone|uav|unmanned|quadcopter/i.test(text)) return "Drone";
  return "UAV";
}

function classifyOutcome(text: string): Incident["outcome"] {
  const t = text.toLowerCase();
  if (/intercept|neutrali|destroy|shoot.?down/i.test(t)) return "Intercepted";
  if (/block|prevent|disrupt/i.test(t)) return "Blocked";
  return "Hit";
}

function extractLocation(text: string): string {
  const locs = [
    "Abu Dhabi", "Dubai", "Fujairah", "Sharjah", "Ras Al Khaimah",
    "Ajman", "Umm Al Quwain", "Al Dhafra", "Musaffah",
  ];
  for (const loc of locs) {
    if (text.toLowerCase().includes(loc.toLowerCase())) return loc;
  }
  return "UAE";
}

// ─── Timeout wrapper ─────────────────────────────────────
function fetchWithTimeout(url: string, opts: RequestInit = {}, ms = 10_000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...opts, signal: controller.signal }).finally(() => clearTimeout(timer));
}

let nextId = 1000;
function makeId(): string {
  return `live-${nextId++}`;
}

// ─── GDELT ───────────────────────────────────────────────
async function fetchGdelt(): Promise<Incident[]> {
  const url =
    "https://api.gdeltproject.org/api/v2/doc/doc?query=UAE%20drone%20attack%20OR%20UAE%20missile%20attack%20OR%20Houthi%20UAE%20OR%20UAE%20interception&mode=artlist&maxrecords=50&format=json&timespan=12m";
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`GDELT ${res.status}`);
  const data = await res.json();
  const articles: any[] = data?.articles ?? [];
  return articles.map((a) => {
    const title = a.title ?? "";
    const desc = a.seendate ?? "";
    const type = classifyIncident(title, "");
    return {
      id: makeId(),
      date: a.seendate ? a.seendate.substring(0, 10).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3") : new Date().toISOString().substring(0, 10),
      title,
      type,
      location: extractLocation(title),
      coordinates: [24.45, 54.38] as [number, number],
      targetArea: extractLocation(title),
      outcome: classifyOutcome(title),
      description: title,
      sourceUrl: a.url ?? "",
      sourceName: a.domain ?? "GDELT",
    };
  });
}

// ─── NewsAPI ─────────────────────────────────────────────
async function fetchNewsApi(): Promise<Incident[]> {
  if (!API_CONFIG.newsapi.enabled) return [];
  const url = `${API_CONFIG.newsapi.baseUrl}/everything?q=UAE+drone+attack+OR+UAE+missile+OR+Houthi+UAE&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_CONFIG.newsapi.key}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`NewsAPI ${res.status}`);
  const data = await res.json();
  const articles: any[] = data?.articles ?? [];
  return articles.map((a) => {
    const title = a.title ?? "";
    const desc = a.description ?? "";
    return {
      id: makeId(),
      date: a.publishedAt ? a.publishedAt.substring(0, 10) : new Date().toISOString().substring(0, 10),
      title,
      type: classifyIncident(title, desc),
      location: extractLocation(`${title} ${desc}`),
      coordinates: [24.45, 54.38] as [number, number],
      targetArea: extractLocation(`${title} ${desc}`),
      outcome: classifyOutcome(`${title} ${desc}`),
      description: desc,
      sourceUrl: a.url ?? "",
      sourceName: a.source?.name ?? "NewsAPI",
    };
  });
}

// ─── ACLED ───────────────────────────────────────────────
async function fetchAcled(): Promise<Incident[]> {
  if (!API_CONFIG.acled.enabled) return [];
  const url = `${API_CONFIG.acled.baseUrl}/acled/read?key=${API_CONFIG.acled.key}&email=${API_CONFIG.acled.email}&country=United+Arab+Emirates&event_type=Explosions/Remote+violence&limit=50&format=json`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`ACLED ${res.status}`);
  const data = await res.json();
  const rows: any[] = data?.data ?? [];
  return rows.map((r) => {
    const notes = r.notes ?? "";
    const loc = r.location ?? "UAE";
    const lat = parseFloat(r.latitude) || 24.45;
    const lng = parseFloat(r.longitude) || 54.38;
    return {
      id: makeId(),
      date: r.event_date ?? new Date().toISOString().substring(0, 10),
      title: `${r.event_type ?? "Incident"} — ${loc}`,
      type: classifyIncident(r.event_type ?? "", notes),
      location: loc,
      coordinates: [lat, lng] as [number, number],
      targetArea: loc,
      outcome: classifyOutcome(notes),
      description: notes,
      sourceUrl: r.source ?? "",
      sourceName: r.source ?? "ACLED",
    };
  });
}

// ─── MediaStack ──────────────────────────────────────────
async function fetchMediaStack(): Promise<Incident[]> {
  if (!API_CONFIG.mediastack.enabled) return [];
  const url = `${API_CONFIG.mediastack.baseUrl}/news?access_key=${API_CONFIG.mediastack.key}&keywords=UAE+drone+missile+attack&countries=ae&limit=50`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`MediaStack ${res.status}`);
  const data = await res.json();
  const articles: any[] = data?.data ?? [];
  return articles.map((a) => {
    const title = a.title ?? "";
    const desc = a.description ?? "";
    return {
      id: makeId(),
      date: a.published_at ? a.published_at.substring(0, 10) : new Date().toISOString().substring(0, 10),
      title,
      type: classifyIncident(title, desc),
      location: extractLocation(`${title} ${desc}`),
      coordinates: [24.45, 54.38] as [number, number],
      targetArea: extractLocation(`${title} ${desc}`),
      outcome: classifyOutcome(`${title} ${desc}`),
      description: desc,
      sourceUrl: a.url ?? "",
      sourceName: a.source ?? "MediaStack",
    };
  });
}

// ─── Deduplication ───────────────────────────────────────
function deduplicateIncidents(list: Incident[]): Incident[] {
  const seen = new Set<string>();
  return list.filter((i) => {
    const key = `${i.date}|${i.title.toLowerCase().substring(0, 60)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─── Cache ───────────────────────────────────────────────
interface CacheEntry {
  incidents: Incident[];
  statuses: Record<ApiName, "active" | "failed" | "disabled">;
  timestamp: number;
}

let cache: CacheEntry | null = null;
const CACHE_TTL = 15 * 60 * 1000; // 15 min

export type ApiStatuses = Record<ApiName, "active" | "failed" | "disabled">;

export interface LiveDataResult {
  incidents: Incident[];
  statuses: ApiStatuses;
  lastUpdated: Date;
}

export async function fetchLiveData(forceRefresh = false): Promise<LiveDataResult> {
  if (!forceRefresh && cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return { incidents: cache.incidents, statuses: cache.statuses, lastUpdated: new Date(cache.timestamp) };
  }

  const fetchers: { name: ApiName; fn: () => Promise<Incident[]> }[] = [
    { name: "gdelt", fn: fetchGdelt },
    { name: "newsapi", fn: fetchNewsApi },
    { name: "acled", fn: fetchAcled },
    { name: "mediastack", fn: fetchMediaStack },
  ];

  const results = await Promise.allSettled(fetchers.map((f) => f.fn()));

  const statuses: ApiStatuses = { gdelt: "disabled", newsapi: "disabled", acled: "disabled", mediastack: "disabled" };
  let allIncidents: Incident[] = [];

  results.forEach((result, idx) => {
    const name = fetchers[idx].name;
    const cfg = API_CONFIG[name];
    if (!cfg.enabled) {
      statuses[name] = "disabled";
      return;
    }
    if (result.status === "fulfilled") {
      statuses[name] = result.value.length > 0 ? "active" : "active";
      allIncidents = allIncidents.concat(result.value);
    } else {
      statuses[name] = "failed";
      console.error(`[UAE Tracker] ${name} failed:`, result.reason);
    }
  });

  let incidents = deduplicateIncidents(allIncidents);
  incidents.sort((a, b) => b.date.localeCompare(a.date));

  // Fallback to static data if nothing returned
  if (incidents.length === 0) {
    incidents = [...staticIncidents].sort((a, b) => b.date.localeCompare(a.date));
  }

  const now = Date.now();
  cache = { incidents, statuses, timestamp: now };

  return { incidents, statuses, lastUpdated: new Date(now) };
}
