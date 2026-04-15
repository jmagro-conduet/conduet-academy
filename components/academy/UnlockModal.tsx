'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { unlockSession } from '@/lib/unlock'
import { useAuth } from '@/components/auth/AuthProvider'

type Session = {
  id: string
  level: string
  title: string
  colour: string
  textOnColour: string
}

type Props = {
  session: Session
  onClose: () => void
  onUnlocked: () => void
}

export function UnlockModal({ session, onClose, onUnlocked }: Props) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      router.push('/auth/login')
      return
    }
    setError('')
    setLoading(true)

    const result = await unlockSession(user.id, code)

    if (result.success) {
      setSuccess(true)
      onUnlocked()
      setTimeout(() => {
        onClose()
        router.push(`/session/${result.sessionId}`)
      }, 1200)
    } else {
      setError(result.message ?? 'Invalid code.')
    }
    setLoading(false)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#1C1C1C',
          border: '0.5px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '32px 28px',
          width: '100%',
          maxWidth: 420,
          position: 'relative',
        }}
      >
        {/* Session badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: session.colour,
          color: session.textOnColour,
          borderRadius: 4,
          padding: '3px 10px',
          fontSize: 12,
          fontWeight: 500,
          marginBottom: 16,
        }}>
          {session.id} — {session.level}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            padding: 4,
            fontSize: 18,
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        <h2 style={{ fontSize: 17, fontWeight: 500, color: '#F1F1F2', marginTop: 0, marginBottom: 8 }}>
          Unlock {session.level}
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24, marginTop: 0, lineHeight: 1.6 }}>
          Enter the code shown on the closing slide of your session.
        </p>

        {success ? (
          <div style={{
            textAlign: 'center',
            padding: '20px 0',
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
            <div style={{ fontSize: 14, color: session.colour, fontWeight: 500 }}>
              {session.level} unlocked — welcome to the next level.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. WALK-201"
              required
              autoFocus
              style={{
                width: '100%',
                padding: '13px 16px',
                fontSize: 16,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500,
                textAlign: 'center',
                letterSpacing: '0.05em',
                border: error ? '0.5px solid rgba(255,80,80,0.6)' : '0.5px solid rgba(255,255,255,0.15)',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                color: '#F1F1F2',
                outline: 'none',
                textTransform: 'uppercase',
              }}
              onFocus={(e) => !error && (e.target.style.borderColor = `${session.colour}80`)}
              onBlur={(e) => !error && (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
            />

            {error && (
              <div style={{
                fontSize: 13,
                color: '#FF8080',
                background: 'rgba(255,80,80,0.08)',
                border: '0.5px solid rgba(255,80,80,0.2)',
                borderRadius: 6,
                padding: '8px 12px',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !code}
              style={{
                marginTop: 4,
                width: '100%',
                padding: '11px',
                fontSize: 14,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                background: loading || !code ? 'rgba(200,200,200,0.15)' : session.colour,
                color: loading || !code ? 'rgba(255,255,255,0.3)' : session.textOnColour,
                border: 'none',
                borderRadius: 8,
                cursor: loading || !code ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => !(loading || !code) && (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {loading ? 'Checking…' : 'Unlock'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
