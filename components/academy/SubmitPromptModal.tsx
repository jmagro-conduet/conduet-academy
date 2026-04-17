'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { promptCategories, promptRoles } from '@/lib/content/shared'

type Props = {
  onClose: () => void
  onSubmitted: (prompt: CommunityPrompt) => void
}

export type CommunityPrompt = {
  id: string
  user_id: string
  submitter_name: string | null
  title: string
  description: string
  prompt: string
  category: string
  role: string
  created_at: string
}

export function SubmitPromptModal({ onClose, onSubmitted }: Props) {
  const { user } = useAuth()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [prompt, setPrompt] = useState('')
  const [category, setCategory] = useState('productivity')
  const [role, setRole] = useState('general')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!user) return
    if (!title.trim() || !prompt.trim() || !description.trim()) {
      setError('Please fill in title, description, and prompt.')
      return
    }
    setSubmitting(true)
    setError('')

    const submitterName = user.user_metadata?.full_name ?? null

    const { data, error: dbError } = await supabase
      .from('community_prompts')
      .insert({
        user_id: user.id,
        submitter_name: submitterName,
        title: title.trim(),
        description: description.trim(),
        prompt: prompt.trim(),
        category,
        role,
      })
      .select()
      .single()

    if (dbError || !data) {
      setError('Something went wrong. Try again.')
      setSubmitting(false)
      return
    }

    onSubmitted(data as CommunityPrompt)
    onClose()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    fontSize: 13,
    fontFamily: 'Inter, sans-serif',
    border: '0.5px solid #E4E4E5',
    borderRadius: 8,
    background: '#FAFAFA',
    color: '#111111',
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    color: '#6B6B6B',
    display: 'block',
    marginBottom: 6,
    fontFamily: 'Inter, sans-serif',
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: '#FFFFFF',
        borderRadius: 12,
        padding: 28,
        width: '100%',
        maxWidth: 520,
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 500, color: '#111111', margin: '0 0 4px', fontFamily: 'Inter, sans-serif' }}>
              Share a prompt
            </h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Add a prompt you&apos;ve found useful. It&apos;ll be visible to the whole team.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#6B6B6B',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Draft a competitor analysis"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#CEA4FF')}
              onBlur={(e) => (e.target.style.borderColor = '#E4E4E5')}
            />
          </div>

          <div>
            <label style={labelStyle}>One-line description *</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this prompt do and when should you use it?"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#CEA4FF')}
              onBlur={(e) => (e.target.style.borderColor = '#E4E4E5')}
            />
          </div>

          <div>
            <label style={labelStyle}>Prompt *</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Paste your full prompt here. Use [brackets] for the parts someone should fill in."
              rows={7}
              style={{
                ...inputStyle,
                resize: 'vertical',
                lineHeight: 1.6,
              }}
              onFocus={(e) => (e.target.style.borderColor = '#CEA4FF')}
              onBlur={(e) => (e.target.style.borderColor = '#E4E4E5')}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={selectStyle}
                onFocus={(e) => (e.target.style.borderColor = '#CEA4FF')}
                onBlur={(e) => (e.target.style.borderColor = '#E4E4E5')}
              >
                {promptCategories.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={selectStyle}
                onFocus={(e) => (e.target.style.borderColor = '#CEA4FF')}
                onBlur={(e) => (e.target.style.borderColor = '#E4E4E5')}
              >
                {promptRoles.filter(r => r.id !== 'all').map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p style={{ fontSize: 13, color: '#e53e3e', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 4 }}>
            <button
              onClick={onClose}
              style={{
                padding: '9px 18px',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                background: 'transparent',
                color: '#6B6B6B',
                border: '0.5px solid #E4E4E5',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                padding: '9px 18px',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                background: submitting ? 'rgba(0,0,0,0.5)' : '#111111',
                color: '#F1F1F2',
                border: 'none',
                borderRadius: 8,
                cursor: submitting ? 'default' : 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              {submitting ? 'Sharing…' : 'Share prompt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
