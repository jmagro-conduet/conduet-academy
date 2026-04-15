'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { UnlockModal } from './UnlockModal'

type Session = {
  id: string
  level: string
  title: string
  colour: string
  textOnColour: string
  code: string
  preview: string[]
}

type Props = {
  session: Session
  unlocked: boolean
}

export function SessionCard({ session, unlocked }: Props) {
  const [showModal, setShowModal] = useState(false)
  const { user, refreshUnlockedSessions } = useAuth()
  const router = useRouter()

  const handleLockedClick = () => {
    if (!user) {
      router.push('/auth/login')
      return
    }
    setShowModal(true)
  }

  const handleUnlocked = async () => {
    await refreshUnlockedSessions()
  }

  const card = (
    <div
      style={{
        background: '#FFFFFF',
        border: '0.5px solid #E4E4E5',
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'all 0.15s',
        opacity: unlocked ? 1 : 0.7,
        cursor: unlocked ? 'pointer' : 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = session.colour
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E4E4E5'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 5,
        background: unlocked ? session.colour : '#E4E4E5',
        transition: 'background 0.15s',
      }} />

      <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Session badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: unlocked ? session.colour : '#E4E4E5',
            color: unlocked ? session.textOnColour : '#6B6B6B',
            borderRadius: 4,
            padding: '3px 10px',
            fontSize: 12,
            fontWeight: 500,
            transition: 'all 0.15s',
          }}>
            {session.id} — {session.level}
          </span>
          {!unlocked && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#6B6B6B' }}>
              <path d="M5 7V5a3 3 0 016 0v2M3 7h10a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 16,
          fontWeight: 500,
          color: '#111111',
          margin: '0 0 4px',
          lineHeight: 1.3,
        }}>
          {session.title}
        </h3>

        {/* Preview items */}
        <ul style={{
          margin: '12px 0 0',
          padding: 0,
          listStyle: 'none',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          {session.preview.map((item, i) => (
            <li key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              fontSize: 13,
              color: unlocked ? '#6B6B6B' : '#9B9B9C',
              lineHeight: 1.5,
            }}>
              <span style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: unlocked ? session.colour : '#C4C4C4',
                marginTop: 7,
                flexShrink: 0,
              }} />
              {item}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ marginTop: 20 }}>
          {unlocked ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              color: session.colour,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1l6 6-6 6M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Open session
            </div>
          ) : (
            <button
              onClick={handleLockedClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'transparent',
                border: '0.5px solid #E4E4E5',
                borderRadius: 6,
                padding: '7px 12px',
                fontSize: 12,
                fontWeight: 500,
                color: '#6B6B6B',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = session.colour
                e.currentTarget.style.color = session.colour
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E4E4E5'
                e.currentTarget.style.color = '#6B6B6B'
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M3.5 5V4a2 2 0 014 0v1M2 5h7a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-4A.5.5 0 012 5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Enter code to unlock
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {unlocked ? (
        <Link href={`/session/${session.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
          {card}
        </Link>
      ) : (
        <div onClick={handleLockedClick} style={{ display: 'block', height: '100%', cursor: 'pointer' }}>
          {card}
        </div>
      )}

      {showModal && (
        <UnlockModal
          session={session}
          onClose={() => setShowModal(false)}
          onUnlocked={handleUnlocked}
        />
      )}
    </>
  )
}
