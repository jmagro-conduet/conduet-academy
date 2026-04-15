'use client'

import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { SessionCard } from '@/components/academy/SessionCard'
import { sessions } from '@/lib/content/shared'

export default function Home() {
  const { user, loading, unlockedSessions } = useAuth()

  const unlockedCount = unlockedSessions.length

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: '#111111',
        padding: '80px 24px 72px',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(206,164,255,0.12)',
            border: '0.5px solid rgba(206,164,255,0.25)',
            borderRadius: 100,
            padding: '4px 12px',
            fontSize: 12,
            fontWeight: 500,
            color: '#CEA4FF',
            marginBottom: 24,
          }}>
            conduet° AI Training
          </div>

          {/* Heading */}
          {loading ? (
            <div style={{ height: 52, background: 'rgba(255,255,255,0.06)', borderRadius: 8, marginBottom: 16 }} />
          ) : user ? (
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 500, color: '#F1F1F2', margin: '0 0 16px', lineHeight: 1.15 }}>
              Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}
            </h1>
          ) : (
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 500, color: '#F1F1F2', margin: '0 0 16px', lineHeight: 1.15 }}>
              Conduet Academy
            </h1>
          )}

          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', margin: '0 0 32px', lineHeight: 1.7, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Your AI training hub. Content unlocks after each session.
          </p>

          {/* Progress indicator — logged in */}
          {!loading && user && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '10px 18px',
              marginBottom: 32,
            }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      width: 28,
                      height: 6,
                      borderRadius: 3,
                      background: unlockedSessions.includes(s.id) ? s.colour : 'rgba(255,255,255,0.12)',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                {unlockedCount} of {sessions.length} session{unlockedCount === 1 ? '' : 's'} unlocked
              </span>
            </div>
          )}

          {/* CTAs — logged out */}
          {!loading && !user && (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/auth/signup"
                style={{
                  padding: '11px 24px',
                  background: '#CEA4FF',
                  color: '#111111',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Create account
              </Link>
              <Link
                href="/auth/login"
                style={{
                  padding: '11px 24px',
                  background: 'transparent',
                  color: '#F1F1F2',
                  border: '0.5px solid rgba(255,255,255,0.2)',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
              >
                Log in
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Session cards */}
      <section style={{
        background: '#F6F6F6',
        padding: '60px 24px 80px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: '#111111', margin: '0 0 6px' }}>
              The programme
            </h2>
            <p style={{ fontSize: 14, color: '#6B6B6B', margin: 0 }}>
              Three sessions. Each one builds on the last.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                unlocked={!loading && unlockedSessions.includes(session.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works — only shown to logged-out users */}
      {!loading && !user && (
        <section style={{
          background: '#111111',
          padding: '64px 24px',
        }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: '#F1F1F2', textAlign: 'center', marginTop: 0, marginBottom: 40 }}>
              How it works
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 24,
            }}>
              {[
                { step: '01', title: 'Attend a session', desc: 'Join a lunch & learn. Each session unlocks the next level.' },
                { step: '02', title: 'Scan the QR code', desc: 'At the end of the session, a code appears on the closing slide.' },
                { step: '03', title: 'Unlock your content', desc: 'Enter the code here. Your session unlocks permanently.' },
                { step: '04', title: 'Return any time', desc: 'Content lives here forever. Access it from any device.' },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{
                  padding: '20px',
                  background: '#1C1C1C',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#CEA4FF', letterSpacing: '0.08em', marginBottom: 10 }}>
                    {step}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#F1F1F2', marginBottom: 8 }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
