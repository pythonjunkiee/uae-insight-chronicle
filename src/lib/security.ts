/**
 * Security utilities for UAE Threat Tracker
 * Input sanitization, validation, and XSS prevention
 */

/**
 * Sanitize a string by stripping HTML tags and dangerous characters.
 * Use this for any user-provided text rendered in the UI.
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate and sanitize a URL parameter.
 * Returns null if the value is suspicious.
 */
export function sanitizeParam(value: string | null): string | null {
  if (!value) return null;
  // Reject if it contains script injection patterns
  const dangerous = /(<script|javascript:|on\w+=|data:text\/html)/i;
  if (dangerous.test(value)) return null;
  return sanitizeText(value);
}

/**
 * Validate that a value matches expected types.
 * Rejects SQL injection patterns.
 */
export function isSafeInput(value: string): boolean {
  if (typeof value !== 'string') return false;
  const sqlPatterns = /('|\\"|;|--|\/\*|\*\/|xp_|union\s+select|drop\s+table|insert\s+into|delete\s+from)/i;
  return !sqlPatterns.test(value);
}

/**
 * Enforce maximum length on input strings.
 */
export function truncateInput(value: string, maxLength: number = 500): string {
  if (typeof value !== 'string') return '';
  return value.slice(0, maxLength);
}

/**
 * Strip console methods in production to prevent data leakage.
 * Call once at app initialization.
 */
export function stripConsoleLogs(): void {
  if (import.meta.env.PROD) {
    const noop = () => {};
    console.log = noop;
    console.debug = noop;
    console.info = noop;
    console.warn = noop;
    // Keep console.error for critical runtime issues
  }
}

/**
 * Generate a simple nonce for inline scripts (if needed).
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}
