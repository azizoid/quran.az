import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiting (use Redis in production for distributed systems)
const rateLimitMap = new Map<string, number[]>()

// Known malicious IPs - add the attacker's IP
const BLOCKED_IPS = new Set([
  '195.178.110.131', // Known attacker IP from your logs
])

// Rate limit configuration
const RATE_LIMIT_WINDOW_MS = 60000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100

function getRateLimitKey(request: NextRequest): string {
  const ip = request.ip || 
             request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown'
  return `rate_limit_${ip}`
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const requests = rateLimitMap.get(key) || []
  
  // Filter out old requests outside the window
  const recentRequests = requests.filter((time: number) => now - time < RATE_LIMIT_WINDOW_MS)
  
  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance to cleanup
    rateLimitMap.forEach((requests, k) => {
      const filtered = requests.filter((time: number) => now - time < RATE_LIMIT_WINDOW_MS)
      if (filtered.length === 0) {
        rateLimitMap.delete(k)
      } else {
        rateLimitMap.set(k, filtered)
      }
    })
  }
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }
  
  // Add current request
  recentRequests.push(now)
  rateLimitMap.set(key, recentRequests)
  
  return false
}

export function middleware(request: NextRequest) {
  const ip = request.ip || 
             request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown'
  
  // Block known malicious IPs
  if (BLOCKED_IPS.has(ip)) {
    console.warn(`[SECURITY] Blocked request from known malicious IP: ${ip}`)
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  // Rate limit RSC endpoints (React Server Components)
  const pathname = request.nextUrl.pathname
  const isRSCEndpoint = pathname.includes('__rsc') || 
                       pathname.includes('_next/static') ||
                       pathname.includes('/api/')
  
  if (isRSCEndpoint) {
    const rateLimitKey = getRateLimitKey(request)
    
    if (isRateLimited(rateLimitKey)) {
      console.warn(`[SECURITY] Rate limit exceeded for IP: ${ip}, path: ${pathname}`)
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': '60',
        },
      })
    }
    
    // Log RSC requests for monitoring
    if (pathname.includes('__rsc')) {
      console.log(`[RSC] Request from ${ip} to ${pathname}`)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

