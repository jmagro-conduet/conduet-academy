'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { nav } from '@/lib/content/shared'

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, unlockedSessions } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const isSessionLocked = (href: string) => {
    const match = href.match(/\/session\/(\d+)/)
    if (!match) return false
    return !unlockedSessions.includes(match[1])
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav style={{
      background: '#111111',
      borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
        }}>
          <span style={{
            fontSize: 15,
            fontWeight: 500,
            color: '#F1F1F2',
            letterSpacing: '-0.01em',
          }}>
            Conduet Academy
          </span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            const locked = isSessionLocked(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '5px 12px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? '#111111' : locked ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.65)',
                  background: active ? '#CEA4FF' : 'transparent',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {locked && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M3 4V3a2 2 0 014 0v1M2 4h6a1 1 0 011 1v3a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                )}
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Auth actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {user ? (
            <button
              onClick={handleSignOut}
              style={{
                padding: '5px 14px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.5)',
                background: 'transparent',
                border: '0.5px solid rgba(255,255,255,0.12)',
                cursor: 'pointer',
              }}
            >
              Sign out
            </button>
          ) : (
            <>
              <Link href="/auth/login" style={{
                padding: '5px 14px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.65)',
                textDecoration: 'none',
              }}>
                Log in
              </Link>
              <Link href="/auth/signup" style={{
                padding: '5px 14px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                color: '#111111',
                background: '#CEA4FF',
                textDecoration: 'none',
              }}>
                Sign up
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.65)',
              padding: 4,
            }}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {menuOpen ? (
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              ) : (
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden" style={{
          background: '#1C1C1C',
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
          padding: '12px 24px 16px',
        }}>
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            const locked = isSessionLocked(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 0',
                  fontSize: 14,
                  fontWeight: 500,
                  color: active ? '#CEA4FF' : locked ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                }}
              >
                {locked && (
                  <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                    <path d="M3 4V3a2 2 0 014 0v1M2 4h6a1 1 0 011 1v3a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                )}
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
