'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Mode = 'login' | 'signup'

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        })
        if (error) throw error
        router.push('/')
        router.refresh()
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/')
        router.refresh()
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    border: '0.5px solid rgba(255,255,255,0.15)',
    borderRadius: 8,
    background: 'rgba(255,255,255,0.06)',
    color: '#F1F1F2',
    outline: 'none',
    transition: 'border-color 0.15s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Wordmark */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 20, fontWeight: 500, color: '#F1F1F2', marginBottom: 4 }}>
            Conduet Academy
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Level up, session by session
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#1C1C1C',
          border: '0.5px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '32px 28px',
        }}>
          <h1 style={{ fontSize: 17, fontWeight: 500, color: '#F1F1F2', marginBottom: 24, marginTop: 0 }}>
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(206,164,255,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@conduet.com"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(206,164,255,0.6)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'Min. 8 characters' : '••••••••'}
                required
                minLength={8}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(206,164,255,0.6)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(255,100,100,0.1)',
                border: '0.5px solid rgba(255,100,100,0.3)',
                borderRadius: 6,
                padding: '10px 12px',
                fontSize: 13,
                color: '#FF8080',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                width: '100%',
                padding: '11px',
                fontSize: 14,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                background: loading ? 'rgba(206,164,255,0.5)' : '#CEA4FF',
                color: '#111111',
                border: 'none',
                borderRadius: 8,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}
            </button>
          </form>

          <p style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 0 }}>
            {mode === 'signup' ? (
              <>Already have an account? <Link href="/auth/login" style={{ color: '#CEA4FF', textDecoration: 'none' }}>Log in</Link></>
            ) : (
              <>Don&apos;t have an account? <Link href="/auth/signup" style={{ color: '#CEA4FF', textDecoration: 'none' }}>Sign up</Link></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
