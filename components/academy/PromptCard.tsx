'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'

type Prompt = {
  id: string
  title: string
  category: string
  role: string
  session: string
  description: string
  prompt: string
  outcome: string
}

type Props = {
  prompt: Prompt
  showSessionBadge?: boolean
  sessionColour?: string
  initialSaved?: boolean
  onSaveToggle?: (id: string, nowSaved: boolean) => void
}

const categoryColours: Record<string, string> = {
  analysis: '#CEA4FF',
  communication: '#008278',
  research: '#FF8C78',
  productivity: '#FFCC50',
  specialist: '#6B6B6B',
}

export function PromptCard({ prompt, showSessionBadge, sessionColour = '#CEA4FF', initialSaved = false, onSaveToggle }: Props) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(initialSaved)
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()
  const supabase = createClient()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveToggle = async () => {
    if (!user || saving) return
    setSaving(true)
    if (saved) {
      // Unsave
      await supabase
        .from('saved_prompts')
        .delete()
        .eq('user_id', user.id)
        .eq('prompt_id', prompt.id)
      setSaved(false)
      onSaveToggle?.(prompt.id, false)
    } else {
      // Save
      await supabase.from('saved_prompts').upsert({
        user_id: user.id,
        prompt_id: prompt.id,
      })
      setSaved(true)
      onSaveToggle?.(prompt.id, true)
    }
    setSaving(false)
  }

  const catColour = categoryColours[prompt.category] ?? '#6B6B6B'

  return (
    <div style={{
      background: '#FFFFFF',
      border: '0.5px solid #E4E4E5',
      borderRadius: 8,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ height: 4, background: catColour }} />

      <div style={{ padding: '16px 16px 14px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <h4 style={{ fontSize: 14, fontWeight: 500, color: '#111111', margin: 0, lineHeight: 1.3 }}>
            {prompt.title}
          </h4>
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            <span style={{
              padding: '2px 8px',
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 500,
              background: `${catColour}18`,
              color: catColour,
            }}>
              {prompt.category}
            </span>
            {showSessionBadge && (
              <span style={{
                padding: '2px 8px',
                borderRadius: 100,
                fontSize: 11,
                fontWeight: 500,
                background: `${sessionColour}18`,
                color: sessionColour,
              }}>
                {prompt.session}
              </span>
            )}
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#6B6B6B', margin: '0 0 12px', lineHeight: 1.5 }}>
          {prompt.description}
        </p>

        <div className="prompt-block" style={{ marginBottom: 10 }}>
          {prompt.prompt}
        </div>

        <p style={{ fontSize: 12, color: catColour, margin: '0 0 12px', fontWeight: 500 }}>
          {prompt.outcome}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleCopy}
            style={{
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              background: copied ? '#111111' : 'transparent',
              color: copied ? '#F1F1F2' : '#111111',
              border: `0.5px solid ${copied ? '#111111' : '#E4E4E5'}`,
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M3 8H2a1 1 0 01-1-1V2a1 1 0 011-1h5a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Copy prompt
              </>
            )}
          </button>

          {user && (
            <button
              onClick={handleSaveToggle}
              disabled={saving}
              style={{
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                background: saved ? `${catColour}15` : 'transparent',
                color: saved ? catColour : '#6B6B6B',
                border: `0.5px solid ${saved ? catColour : '#E4E4E5'}`,
                borderRadius: 6,
                cursor: saving ? 'default' : 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill={saved ? 'currentColor' : 'none'}>
                <path d="M6 1l1.545 3.13L11 4.635l-2.5 2.435.59 3.44L6 8.885l-3.09 1.625.59-3.44L1 4.635l3.455-.505L6 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
              {saving ? '…' : saved ? 'Saved' : 'Save'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
