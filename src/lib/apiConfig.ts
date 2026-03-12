export const API_CONFIG = {
  newsapi: {
    key: import.meta.env.VITE_NEWSAPI_KEY as string | undefined,
    baseUrl: "https://newsapi.org/v2",
    enabled: !!import.meta.env.VITE_NEWSAPI_KEY,
  },
  gdelt: {
    baseUrl: "https://api.gdeltproject.org/api/v2",
    enabled: true,
  },
  acled: {
    key: import.meta.env.VITE_ACLED_KEY as string | undefined,
    email: import.meta.env.VITE_ACLED_EMAIL as string | undefined,
    baseUrl: "https://api.acleddata.com",
    enabled: !!import.meta.env.VITE_ACLED_KEY,
  },
  mediastack: {
    key: import.meta.env.VITE_MEDIASTACK_KEY as string | undefined,
    baseUrl: "http://api.mediastack.com/v1",
    enabled: !!import.meta.env.VITE_MEDIASTACK_KEY,
  },
} as const;

export type ApiName = keyof typeof API_CONFIG;

export function getActiveApiCount(): number {
  return Object.values(API_CONFIG).filter((c) => c.enabled).length;
}

export function validateApiKeys(): void {
  if (!API_CONFIG.newsapi.enabled) {
    console.warn("[UAE Tracker] NewsAPI key missing — VITE_NEWSAPI_KEY not set");
  }
  if (!API_CONFIG.acled.enabled) {
    console.warn("[UAE Tracker] ACLED key missing — VITE_ACLED_KEY not set");
  }
  if (!API_CONFIG.mediastack.enabled) {
    console.warn("[UAE Tracker] MediaStack key missing — VITE_MEDIASTACK_KEY not set");
  }
  console.info(`[UAE Tracker] ${getActiveApiCount()} of 4 APIs active`);
}
