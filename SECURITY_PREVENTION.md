# 🛡️ Security Prevention Guide - Avoiding React2Shell and Similar RCE Attacks

## Overview
This guide provides actionable steps to prevent React2Shell (CVE-2025-55182) and similar Remote Code Execution (RCE) vulnerabilities in your Next.js application.

## 1. Keep Dependencies Updated ⚡

### Automated Dependency Updates
Set up automated security updates to catch vulnerabilities early:

```bash
# Install pnpm-audit for automated checks
pnpm add -D pnpm-audit

# Add to package.json scripts
"scripts": {
  "security:audit": "pnpm audit",
  "security:check": "pnpm audit --audit-level=moderate"
}
```

### Regular Update Schedule
- **Weekly:** Run `pnpm audit` to check for vulnerabilities
- **Monthly:** Review and update dependencies
- **Immediately:** Update when security advisories are published

### Subscribe to Security Advisories
- [Next.js Security Advisories](https://github.com/vercel/next.js/security/advisories)
- [React Security Advisories](https://github.com/facebook/react/security/advisories)
- [npm Security Advisories](https://github.com/advisories?query=ecosystem%3Anpm)
- Enable GitHub Dependabot or similar tools

### Version Pinning Strategy
```json
{
  "dependencies": {
    // Use exact versions for critical security packages
    "next": "16.0.8",  // Not "^16.0.8" - prevents unexpected updates
    "react": "19.2.2",
    "react-dom": "19.2.2"
  }
}
```

## 2. Implement WAF (Web Application Firewall) 🚧

### Cloudflare WAF Rules
Cloudflare has implemented React2Shell detection rules. Enable:
- **Managed Rules:** React2Shell detection
- **Rate Limiting:** On RSC endpoints
- **IP Reputation:** Block known malicious IPs

### Custom WAF Rules
```javascript
// Example: Block suspicious RSC requests
// (Implementation depends on your WAF provider)
if (request.path.includes('/_next/static') && 
    request.body.includes('__rsc')) {
  // Log and potentially block
  logSuspiciousActivity(request);
}
```

## 3. Network Security 🔒

### Egress Filtering
Block outbound connections to suspicious IPs:

```bash
# Firewall rules to block known malicious IPs
# Add to your server firewall or Docker network config
iptables -A OUTPUT -d 195.178.110.131 -j DROP
```

### Monitor Outbound Connections
```bash
# Monitor network connections
netstat -an | grep ESTABLISHED
# or
ss -tuln

# Set up alerts for suspicious outbound connections
```

### Docker Network Isolation
```yaml
# docker-compose.yml
services:
  quranaz-app:
    networks:
      - internal-only
    # Restrict outbound access
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE

networks:
  internal-only:
    driver: bridge
    internal: true  # No external access
```

## 4. Server Actions Security 🔐

### Strict Origin Validation
You already have this configured, but ensure it's strict:

```typescript
// next.config.ts
experimental: {
  serverActions: {
    allowedOrigins: [
      'quran.az',
      'www.quran.az',
      // Remove 'localhost:3000' in production!
    ],
  },
}
```

### Rate Limiting on RSC Endpoints
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimitMap = new Map()

export function middleware(request: NextRequest) {
  // Rate limit RSC endpoints
  if (request.nextUrl.pathname.includes('_next/static') || 
      request.nextUrl.pathname.includes('__rsc')) {
    const ip = request.ip || 'unknown'
    const key = `rsc_${ip}`
    const now = Date.now()
    const windowMs = 60000 // 1 minute
    const maxRequests = 100

    const requests = rateLimitMap.get(key) || []
    const recentRequests = requests.filter((time: number) => now - time < windowMs)
    
    if (recentRequests.length >= maxRequests) {
      return new NextResponse('Rate limit exceeded', { status: 429 })
    }
    
    recentRequests.push(now)
    rateLimitMap.set(key, recentRequests)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/_next/static/:path*', '/api/:path*'],
}
```

### Input Validation
```typescript
// Always validate inputs in server actions
'use server'

export async function myServerAction(data: unknown) {
  // Validate input structure
  if (!isValidInput(data)) {
    throw new Error('Invalid input')
  }
  
  // Sanitize inputs
  const sanitized = sanitizeInput(data)
  
  // Process...
}
```

## 5. Environment Variable Protection 🔑

### Never Expose in Client Code
```typescript
// ❌ BAD - Exposes secret
const apiKey = process.env.SECRET_API_KEY

// ✅ GOOD - Only public vars
const apiKey = process.env.NEXT_PUBLIC_API_KEY
```

### Use Secret Management
```bash
# Use Docker secrets or Kubernetes secrets
# Never commit .env files
echo ".env*" >> .gitignore
echo ".env.production" >> .gitignore
```

### Rotate Secrets Regularly
- **Monthly:** Rotate non-critical secrets
- **Immediately:** After any security incident
- **Quarterly:** Rotate all secrets

## 6. Monitoring and Alerting 📊

### Application Monitoring
```typescript
// Add monitoring for suspicious activity
// utils/monitoring.ts
export function logSuspiciousActivity(event: {
  type: string
  ip: string
  path: string
  details: unknown
}) {
  // Log to monitoring service (Sentry, Datadog, etc.)
  console.error('[SECURITY]', event)
  
  // Alert if critical
  if (event.type === 'RSC_SUSPICIOUS') {
    sendSecurityAlert(event)
  }
}
```

### Network Monitoring
```bash
# Set up alerts for:
# - Unexpected outbound connections
# - Connections to known malicious IPs
# - High network traffic from app
# - File system access to .env files
```

### Log Analysis
```bash
# Monitor logs for:
# - Failed authentication attempts
# - Unusual request patterns
# - RSC endpoint access
# - Error patterns that might indicate exploitation
```

## 7. CI/CD Security Checks 🔍

### Add Security Scanning to GitHub Actions
```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run pnpm audit
        run: pnpm audit --audit-level=moderate
      
      - name: Check for known vulnerabilities
        run: pnpm audit --json > audit.json
      
      - name: Fail on critical vulnerabilities
        run: |
          if grep -q '"severity":"critical"' audit.json; then
            echo "Critical vulnerabilities found!"
            exit 1
          fi
```

### Dependency Review
```yaml
- name: Review dependencies
  run: |
    # Check for suspicious packages
    pnpm list --depth=0 > deps.txt
    # Review for unknown or suspicious packages
```

## 8. Code Review Best Practices 👥

### Security Checklist
Before merging PRs, check:
- [ ] No hardcoded secrets
- [ ] Input validation on all server actions
- [ ] Rate limiting on public endpoints
- [ ] Proper error handling (no info leakage)
- [ ] Dependencies are from trusted sources
- [ ] No suspicious network calls
- [ ] Environment variables properly scoped

### Automated Security Checks
```bash
# Pre-commit hooks
# .husky/pre-commit
#!/bin/sh
pnpm audit --audit-level=moderate
pnpm run lint
```

## 9. Runtime Protection 🛡️

### Process Isolation
```dockerfile
# Dockerfile - Run as non-root user
USER quranaz-user  # ✅ You already have this

# Drop unnecessary capabilities
RUN apk add --no-cache dumb-init
ENTRYPOINT ["dumb-init", "--"]
```

### Resource Limits
```yaml
# docker-compose.yml
services:
  quranaz-app:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### Read-Only File System (where possible)
```dockerfile
# Make certain directories read-only
RUN chmod -R 555 /app/.next/static
```

## 10. Incident Response Plan 📋

### Preparation
1. **Documentation:** Keep security contacts and procedures documented
2. **Backups:** Regular, tested backups
3. **Monitoring:** Set up alerts before incidents
4. **Access Control:** Limit who can deploy and access production

### Response Steps
1. **Isolate:** Stop the application immediately
2. **Assess:** Determine scope of compromise
3. **Rotate:** Change all secrets
4. **Patch:** Update vulnerable dependencies
5. **Monitor:** Watch for continued suspicious activity
6. **Document:** Record what happened and lessons learned

## 11. Regular Security Audits 🔎

### Monthly Checklist
- [ ] Run `pnpm audit`
- [ ] Review access logs
- [ ] Check for suspicious network activity
- [ ] Review dependency updates
- [ ] Rotate secrets (if due)
- [ ] Review security advisories

### Quarterly Deep Dive
- [ ] Full dependency audit
- [ ] Penetration testing (if budget allows)
- [ ] Review and update security policies
- [ ] Team security training

## 12. Specific React2Shell Protections 🎯

### ⚠️ CRITICAL: Patches Not Yet Available
**Security patches for React2Shell are not yet released. You MUST implement mitigations NOW!**

### Immediate Mitigation Actions (Do These NOW)
1. ⚠️ **Monitor for patches** - Subscribe to Next.js and React security advisories
2. ✅ **Enable WAF rules** for React2Shell detection (Cloudflare has rules available)
3. ✅ **Implement rate limiting** on RSC endpoints (see example below)
4. ✅ **Restrict serverActions.allowedOrigins** - You already have this configured ✅
5. ✅ **Monitor RSC endpoints** for suspicious activity
6. ✅ **Block known malicious IPs** - Add `195.178.110.131` to firewall blocklist
7. ✅ **Network egress filtering** - Block suspicious outbound connections

### When Patches Are Released
1. **Upgrade immediately:**
   ```bash
   pnpm add next@latest react@latest react-dom@latest
   pnpm install
   pnpm run build
   ```
2. **Verify versions:**
   - Next.js: `16.0.8+` (when available)
   - React: `19.2.2+` (when available)

### Long-term Protection
```typescript
// Add RSC endpoint monitoring
// middleware.ts or custom server
export function middleware(request: NextRequest) {
  // Log all RSC requests
  if (request.nextUrl.pathname.includes('__rsc')) {
    logRSCRequest({
      ip: request.ip,
      path: request.nextUrl.pathname,
      timestamp: new Date(),
    })
  }
  
  return NextResponse.next()
}
```

## Quick Reference: Daily Security Routine

```bash
# Daily (automated)
pnpm audit --audit-level=moderate

# Weekly (manual review)
git log --since="1 week ago" --oneline
pnpm outdated
review-access-logs.sh

# Monthly
pnpm update --latest
rotate-secrets.sh
security-audit.sh
```

## Tools and Resources

### Security Tools
- **pnpm audit** - Dependency vulnerability scanning
- **Snyk** - Advanced dependency scanning
- **OWASP ZAP** - Security testing
- **npm-check-updates** - Dependency updates

### Monitoring Services
- **Sentry** - Error and security monitoring
- **Datadog** - Infrastructure monitoring
- **Cloudflare** - WAF and DDoS protection

### Learning Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [React Security](https://react.dev/learn/escape-hatches)

---

**Remember:** Security is an ongoing process, not a one-time setup. Regular updates, monitoring, and vigilance are key to preventing incidents like React2Shell.

