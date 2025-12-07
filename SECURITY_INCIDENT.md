# 🚨 SECURITY INCIDENT - React2Shell (CVE-2025-55182) EXPLOIT

## ⚠️ CRITICAL: React Server Components RCE Vulnerability

**Root Cause Identified:** Your application has been compromised via the **React2Shell (CVE-2025-55182)** vulnerability - a critical Remote Code Execution (RCE) flaw in React Server Components.

## Summary
Your application has been compromised with malicious code that attempts to exfiltrate sensitive data including:
- `.env` file contents (containing database credentials, API keys, etc.)
- Directory listings
- Application metadata

The malicious code attempts to send this data to: `195.178.110.131:8001`

**Important:** The malicious code was **injected at runtime** via the RSC exploit, NOT in your source code. This means:
- Your source code is likely clean
- The attack happened through a vulnerable RSC endpoint
- The attacker executed arbitrary code on your server
- The wget commands are the attacker's payload, not in your codebase

## Immediate Actions (Do These NOW)

### 1. **STOP THE APPLICATION IMMEDIATELY** 🛑
   ```bash
   docker compose down
   # or
   pm2 stop all
   ```
   **Do this FIRST** to prevent further data exfiltration!

### 2. **MONITOR FOR PATCHES AND APPLY IMMEDIATELY** 🔄
   **Current vulnerable versions:**
   - Next.js: `16.0.7` ❌ VULNERABLE (latest available)
   - React: `19.2.1` ❌ VULNERABLE (latest available)
   
   **⚠️ IMPORTANT:** Security patches (16.0.8+ and 19.2.2+) are not yet released.
   
   **Action Required:**
   1. **Subscribe to security advisories:**
      - [Next.js Security](https://github.com/vercel/next.js/security/advisories)
      - [React Security](https://github.com/facebook/react/security/advisories)
   
   2. **When patches are released, update immediately:**
      ```bash
      pnpm add next@latest react@latest react-dom@latest
      pnpm install
      pnpm run build
      ```
   
   3. **Until patches are available, implement mitigation strategies** (see below)

### 3. **ROTATE ALL SECRETS IMMEDIATELY** ⚠️
   - MongoDB connection strings
   - All API keys
   - GitHub tokens
   - SSH keys
   - Any other credentials in your `.env` files
   
   **Assume all secrets are compromised!**

### 4. **Audit Dependencies**
   ```bash
   # Check for known vulnerabilities
   pnpm audit
   
   # Check for suspicious packages
   pnpm list --depth=0
   
   # Review package scripts
   grep -r "postinstall\|preinstall\|install" node_modules/*/package.json | grep -v node_modules/.pnpm
   ```

### 5. **Understanding the Attack Vector**
   **This is NOT a compromised package issue!**
   
   The React2Shell exploit works by:
   1. Attacker sends a specially crafted HTTP request to your RSC endpoint
   2. The vulnerable RSC deserialization allows code injection
   3. Attacker executes arbitrary code on your server (the wget commands)
   4. Malicious code runs at runtime to exfiltrate data
   
   **Your source code is likely clean** - the attack happens at runtime through the vulnerability.

### 6. **Check for Runtime-Injected Code**
   The malicious code may be in:
   - Runtime memory (won't be in files)
   - Build artifacts (`.next/` directory)
   - Temporary files
   
   ```bash
   # Check build artifacts
   grep -r "195.178.110.131" .next/ 2>/dev/null
   grep -r "wget.*post-data" .next/ 2>/dev/null
   
   # Check for any suspicious files
   find . -name "*.js" -exec grep -l "195.178.110.131" {} \; 2>/dev/null
   ```

### 7. **Review Recent Changes**
   ```bash
   # Check git history for suspicious commits
   git log --all --oneline --since="2 weeks ago"
   
   # Check for any unexpected file changes
   git status
   git diff
   ```

## Investigation Steps

### Step 1: Identify the Compromised Package
1. Check all packages for postinstall scripts:
   ```bash
   find node_modules -name "package.json" -exec grep -l "postinstall\|preinstall" {} \; | head -20
   ```

2. Search for the malicious IP or wget commands:
   ```bash
   grep -r "195.178.110.131" node_modules/ 2>/dev/null
   grep -r "wget" node_modules/ 2>/dev/null | grep -i "post-data"
   ```

### Step 2: Check Build Artifacts
The malicious code might be in the built Next.js application:
```bash
# If you have access to the built files
grep -r "195.178.110.131" .next/ 2>/dev/null
```

### Step 3: Verify Package Integrity
```bash
# Check package integrity hashes
pnpm install --frozen-lockfile --verify-store-integrity
```

## Remediation Steps

### Step 1: Monitor and Apply Patches When Available (REQUIRED)
**⚠️ Security patches are not yet released. Monitor for updates!**

```bash
# When patches are available, update immediately:
pnpm add next@latest react@latest react-dom@latest

# Verify versions
pnpm list next react react-dom
```

**Required minimum versions (when released):**
- Next.js: `16.0.8` or later (currently on `16.0.7` - VULNERABLE, waiting for patch)
- React: `19.2.2` or later (currently on `19.2.1` - VULNERABLE, waiting for patch)

**Until patches are available, you MUST implement mitigation strategies:**
- Enable WAF rules for React2Shell detection
- Implement rate limiting on RSC endpoints
- Monitor and block suspicious IPs
- Restrict serverActions.allowedOrigins (you already have this ✅)

### Step 2: Clean Rebuild
```bash
# Remove build artifacts (may contain injected code)
rm -rf .next node_modules

# Fresh install
pnpm install

# Rebuild with patched versions
pnpm run build
```

### Step 3: Verify No Malicious Code in Build
```bash
# Check build output for malicious code
grep -r "195.178.110.131" .next/ 2>/dev/null
grep -r "wget.*post-data" .next/ 2>/dev/null

# Should return nothing if clean
```

### Step 4: Deploy Patched Version
```bash
# Rebuild Docker image with patched versions
docker build -t your-image:latest .

# Deploy
docker compose up -d --force-recreate
```

## Prevention Measures

### Immediate Protections:
1. **Keep Next.js and React updated** - Subscribe to security advisories
2. **Implement WAF rules** - Cloudflare and others have React2Shell detection rules
3. **Network egress filtering** - Block suspicious outbound connections (like `195.178.110.131`)
4. **Monitor RSC endpoints** - Log and alert on suspicious RSC requests
5. **Use `serverActions.allowedOrigins`** - You already have this configured ✅

### Long-term Security:
1. **Use `pnpm audit` regularly** to check for vulnerabilities
2. **Enable dependency scanning** in CI/CD
3. **Monitor for suspicious network activity**
4. **Regular security updates** - Set up automated dependency updates
5. **Review access logs** regularly for suspicious patterns
6. **Implement rate limiting** on RSC endpoints
7. **Use Content Security Policy** - You already have this configured ✅

## Monitoring

After remediation, monitor for:
- Unexpected network connections
- File system access to `.env` files
- Unusual process execution
- Changes to `package.json` or lock files

## Next Steps

1. ✅ Rotate all secrets (URGENT)
2. ✅ Stop the application
3. ✅ Identify the compromised package
4. ✅ Remove malicious code
5. ✅ Rebuild and redeploy
6. ✅ Monitor for continued suspicious activity
7. ✅ Review access logs and audit trails

## React2Shell (CVE-2025-55182) Details

**Vulnerability:** Remote Code Execution via React Server Components
**CVE:** CVE-2025-55182
**Severity:** CRITICAL
**Affected Versions:**
- Next.js: 14.3.0-canary, all 15.x, all 16.x (before patches)
- React: 19.0.0, 19.1.0, 19.1.1, 19.2.0, 19.2.1

**How it works:**
1. Attacker crafts malicious HTTP request to RSC endpoint
2. Vulnerable deserialization in RSC Flight protocol
3. Arbitrary code execution on server
4. Attacker can read files, execute commands, exfiltrate data

**Your current status:**
- ⚠️ Next.js 16.0.7 - **VULNERABLE** (patches not yet released, monitor for 16.0.8+)
- ⚠️ React 19.2.1 - **VULNERABLE** (patches not yet released, monitor for 19.2.2+)
- ✅ You have `serverActions.allowedOrigins` configured (good mitigation!)
- ✅ You have CSP configured (good!)
- ⚠️ **CRITICAL:** Implement additional mitigations until patches are available

## Resources

- [React2Shell CVE-2025-55182 Details](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2025-55182)
- [Next.js Security Advisories](https://github.com/vercel/next.js/security/advisories)
- [React Security Advisories](https://github.com/facebook/react/security/advisories)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)
- [pnpm Security](https://pnpm.io/security)

---

**Last Updated:** 2025-01-XX
**Status:** 🔴 CRITICAL - React2Shell RCE Exploit - Immediate upgrade required
**Root Cause:** CVE-2025-55182 - React Server Components RCE vulnerability

