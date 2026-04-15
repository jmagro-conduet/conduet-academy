'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { UnlockModal } from '@/components/academy/UnlockModal'
import { tabs301, session301Meta } from '@/lib/content/session-301'
import { sessions } from '@/lib/content/shared'

const COLOUR = '#FF8C78'
const SESSION_DATA = sessions.find((s) => s.id === '301')!

export default function Session301Page() {
  const { unlockedSessions, loading, refreshUnlockedSessions } = useAuth()
  const [activeTab, setActiveTab] = useState('field-guide')
  const [showModal, setShowModal] = useState(false)

  const unlocked = !loading && unlockedSessions.includes('301')

  if (!loading && !unlocked) {
    return (
      <>
        <div style={{ background: '#111111', padding: '80px 24px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: 480, textAlign: 'center' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(255,140,120,0.12)',
              border: '0.5px solid rgba(255,140,120,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: COLOUR }}>
                <path d="M7 11V8a4 4 0 018 0v3M5 11h12a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 500, color: '#F1F1F2', margin: '0 0 12px' }}>
              301 — Run is locked
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: '0 0 28px', lineHeight: 1.7 }}>
              Attend the 301 Run session to unlock this content. You&apos;ll receive a code on the closing slide.
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '11px 28px',
                background: COLOUR,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
              }}
            >
              Enter unlock code
            </button>
          </div>
        </div>
        {showModal && (
          <UnlockModal
            session={SESSION_DATA}
            onClose={() => setShowModal(false)}
            onUnlocked={async () => { await refreshUnlockedSessions() }}
          />
        )}
      </>
    )
  }

  const currentTab = tabs301.find((t) => t.id === activeTab) ?? tabs301[0]

  return (
    <div>
      {/* Hero */}
      <div style={{ background: '#111111', padding: '40px 24px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{
              background: COLOUR,
              color: '#111111',
              borderRadius: 4,
              padding: '3px 10px',
              fontSize: 12,
              fontWeight: 500,
            }}>
              301 — Run
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{session301Meta.subtitle}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 500, color: '#F1F1F2', margin: '0 0 32px', lineHeight: 1.2 }}>
            Claude Code & prototypes
          </h1>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 2, borderBottom: '0.5px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
            {tabs301.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 16px',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? `2px solid ${COLOUR}` : '2px solid transparent',
                  color: activeTab === tab.id ? COLOUR : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  marginBottom: -0.5,
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Placeholder tab content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
        <PlaceholderTab tab={currentTab.placeholder} colour={COLOUR} />
      </div>
    </div>
  )
}

function PlaceholderTab({ tab, colour }: { tab: { title: string; description: string; teaser: string[] }, colour: string }) {
  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{
        background: `${colour}10`,
        border: `0.5px solid ${colour}30`,
        borderRadius: 8,
        padding: '12px 16px',
        fontSize: 13,
        color: colour,
        fontWeight: 500,
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Content coming after your 301 session
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 10px' }}>
        {tab.title}
      </h2>
      <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 28px', lineHeight: 1.7 }}>
        {tab.description}
      </p>

      <div style={{ fontSize: 13, fontWeight: 500, color: '#111111', marginBottom: 12 }}>
        What you&apos;ll get:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {tab.teaser.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            background: '#FFFFFF',
            border: '0.5px solid #E4E4E5',
            borderRadius: 8,
            padding: '12px 14px',
          }}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: `${colour}12`,
              border: `1px dashed ${colour}50`,
              flexShrink: 0,
              marginTop: 1,
            }} />
            <span style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
