# UAE Threat Tracker — Security Hardening Checklist

## ✅ Implemented (Client-Side)

### Security Headers (via meta tags + `_headers` file)
- [x] `X-Content-Type-Options: nosniff`
- [x] `X-Frame-Options: DENY`
- [x] `X-XSS-Protection: 1; mode=block`
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=()`
- [x] `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- [x] `Content-Security-Policy` — strict policy with allowlisted sources
- [x] `Cross-Origin-Opener-Policy: same-origin`
- [x] `Cross-Origin-Resource-Policy: same-origin`

### XSS Prevention
- [x] Strict CSP blocking inline scripts (except Vite dev)
- [x] No `dangerouslySetInnerHTML` with user content (only internal chart styles)
- [x] Input sanitization utilities (`src/lib/security.ts`)
- [x] HTML entity encoding for all dynamic text rendering

### Clickjacking Prevention
- [x] `X-Frame-Options: DENY`
- [x] CSP `frame-ancestors 'none'`
- [x] Frame-busting JavaScript in `index.html`

### Subresource Integrity (SRI)
- [x] Leaflet CSS loaded with `integrity` and `crossorigin` attributes

### Sensitive Data Exposure Prevention
- [x] Console methods stripped in production builds
- [x] Generic error boundary — no stack traces shown to users
- [x] No API keys or secrets in frontend code

### Supply Chain Security
- [x] Package versions locked in `bun.lock`
- [x] No high/critical vulnerabilities (verified via `npm audit`)
- [x] SRI hashes on all external CDN resources

### Monitoring
- [x] `/.well-known/security.txt` for responsible disclosure
- [x] Error boundary with production error capture hook

---

## 🔧 Infrastructure / Hosting Configuration Required

These must be configured at the hosting/CDN level (e.g., Cloudflare, Vercel, Netlify):

### HTTPS & HSTS
- [ ] Force HTTPS on all connections (redirect HTTP → HTTPS)
- [ ] Enable HSTS preloading — submit to https://hstspreload.org
- [ ] Verify TLS configuration at https://ssllabs.com/ssltest

### DDoS Protection
- [ ] Enable Cloudflare proxy (or equivalent WAF/CDN)
- [ ] Configure rate limiting: 100 req/IP/min general, 10 req/IP/min for search
- [ ] Set request payload size limits (10KB max for API endpoints)

### Cookie Security (if auth is added)
- [ ] Set `Secure; HttpOnly; SameSite=Strict` on all cookies
- [ ] Implement 15-min session expiry with token rotation
- [ ] Bind sessions to IP + User-Agent

### CSRF Protection (if state-changing operations are added)
- [ ] Add CSRF tokens to all POST/PUT/DELETE requests
- [ ] Validate `Origin` and `Referer` headers server-side
- [ ] Implement double-submit cookie pattern

### Authentication (if admin login is added)
- [ ] Enforce 12+ char passwords with mixed case, numbers, symbols
- [ ] Implement MFA (TOTP or WebAuthn)
- [ ] Lock accounts after 5 failed attempts
- [ ] Use bcrypt with salt rounds ≥ 12
- [ ] Log all login attempts with IP and timestamp

### API Security (if backend APIs are added)
- [ ] Validate and sanitize all query parameters server-side
- [ ] Use API versioning (`/api/v1/`)
- [ ] Disable unnecessary HTTP methods (allow GET only for public endpoints)
- [ ] Implement JWT expiry and rotation
- [ ] Add request logging for anomaly detection

### DNS Security
- [ ] Enable DNSSEC on domain registrar
- [ ] Consider DNS-over-HTTPS for resolver configuration

### File Upload Security (if file uploads are added)
- [ ] Validate file type, size, and content (not just extension)
- [ ] Serve uploads from separate domain/bucket
- [ ] Scan uploads with antivirus before storage

---

## 🧪 Post-Deployment Verification

Run these tools after every deployment:

| Tool | URL | Purpose |
|------|-----|---------|
| Security Headers | https://securityheaders.com | Verify HTTP security headers |
| Mozilla Observatory | https://observatory.mozilla.org | Comprehensive security scan |
| SSL Labs | https://ssllabs.com/ssltest | TLS/SSL configuration audit |
| OWASP ZAP | https://owasp.org/www-project-zap/ | Automated vulnerability scanner |

### CLI Checks
```bash
# Check for vulnerable dependencies
npm audit

# Verify no secrets in codebase
grep -r "apiKey\|secret\|password\|token" src/ --include="*.ts" --include="*.tsx"

# Verify SRI hashes
# Compare hash of downloaded file against integrity attribute
curl -s https://unpkg.com/leaflet@1.9.4/dist/leaflet.css | openssl dgst -sha256 -binary | openssl base64
```

---

## 🔐 Hosting Account Security
- [ ] Enable 2FA on hosting provider account
- [ ] Enable 2FA on domain registrar account
- [ ] Enable 2FA on GitHub repository
- [ ] Set up uptime monitoring (e.g., UptimeRobot, Pingdom)
- [ ] Configure alerts for unusual traffic patterns
- [ ] Review and rotate any API keys quarterly

---

## 📋 Incident Response
1. If a vulnerability is reported via `security.txt`, acknowledge within 24 hours
2. Assess severity using CVSS scoring
3. Patch critical vulnerabilities within 48 hours
4. Notify affected users if data exposure occurred
5. Document incident and update security measures

---

*Last updated: 2026-03-11*
