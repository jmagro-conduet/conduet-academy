'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { PromptCard } from '@/components/academy/PromptCard'
import { prompts101 } from '@/lib/content/session-101'
import { promptCategories, promptRoles, sessions } from '@/lib/content/shared'
import { createClient } from '@/lib/supabase/client'

// All prompts — extend with 201/301 prompts when content is ready
const ALL_PROMPTS = [...prompts101]

export default function PromptsPage() {
  const { user, loading, unlockedSessions } = useAuth()
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [sessionFilter, setSessionFilter] = useState('all')
  const [activeView, setActiveView] = useState<'all' | 'saved'>('all')
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [loadingSaved, setLoadingSaved] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    setLoadingSaved(true)
    supabase
      .from('saved_prompts')
      .select('prompt_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setSavedIds(data?.map((r) => r.prompt_id) ?? [])
        setLoadingSaved(false)
      })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const sessionColourMap = useMemo(() => {
    const map: Record<string, string> = {}
    sessions.forEach((s) => { map[s.id] = s.colour })
    return map
  }, [])

  const filteredPrompts = useMemo(() => {
    let list = activeView === 'saved'
      ? ALL_PROMPTS.filter((p) => savedIds.includes(p.id))
      : ALL_PROMPTS

    if (sessionFilter !== 'all') list = list.filter((p) => p.session === sessionFilter)
    if (categoryFilter !== 'all') list = list.filter((p) => p.category === categoryFilter)
    if (roleFilter !== 'all') list = list.filter((p) => p.role === roleFilter)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }
    return list
  }, [search, categoryFilter, roleFilter, sessionFilter, activeView, savedIds])

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: 'center', color: '#6B6B6B', fontSize: 14 }}>
        Loading…
      </div>
    )
  }

  if (!user) return null

  const filterBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 12px',
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
    background: active ? '#111111' : 'transparent',
    color: active ? '#F1F1F2' : '#6B6B6B',
    border: `0.5px solid ${active ? '#111111' : '#E4E4E5'}`,
    borderRadius: 100,
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#111111', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 500, color: '#F1F1F2', margin: '0 0 8px' }}>
            Prompt library
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            Copy, save, and build on these prompts. All from your unlocked sessions.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* View toggle */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {(['all', 'saved'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              style={{
                padding: '7px 16px',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                background: activeView === view ? '#111111' : 'transparent',
                color: activeView === view ? '#F1F1F2' : '#6B6B6B',
                border: `0.5px solid ${activeView === view ? '#111111' : '#E4E4E5'}`,
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {view === 'all' ? 'All prompts' : `Saved (${savedIds.length})`}
            </button>
          ))}
        </div>

        {/* Search + filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts..."
            style={{
              width: '100%',
              maxWidth: 480,
              padding: '10px 14px',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              border: '0.5px solid #E4E4E5',
              borderRadius: 8,
              background: '#FFFFFF',
              color: '#111111',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#CEA4FF')}
            onBlur={(e) => (e.target.style.borderColor = '#E4E4E5')}
          />

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {/* Session filter */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Session</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                <button style={filterBtnStyle(sessionFilter === 'all')} onClick={() => setSessionFilter('all')}>All</button>
                {sessions.map((s) => {
                  const unlocked = unlockedSessions.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      style={{
                        ...filterBtnStyle(sessionFilter === s.id),
                        opacity: unlocked ? 1 : 0.45,
                      }}
                      onClick={() => setSessionFilter(s.id)}
                    >
                      {s.id} — {s.level}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Category filter */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Category</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {promptCategories.map((cat) => (
                  <button key={cat.id} style={filterBtnStyle(categoryFilter === cat.id)} onClick={() => setCategoryFilter(cat.id)}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Role filter */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Role</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {promptRoles.map((role) => (
                  <button key={role.id} style={filterBtnStyle(roleFilter === role.id)} onClick={() => setRoleFilter(role.id)}>
                    {role.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {loadingSaved && activeView === 'saved' ? (
          <div style={{ color: '#6B6B6B', fontSize: 14 }}>Loading saved prompts…</div>
        ) : filteredPrompts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 24px',
            color: '#6B6B6B',
            fontSize: 14,
          }}>
            {activeView === 'saved' && savedIds.length === 0
              ? 'No saved prompts yet. Use the save button on any prompt card.'
              : 'No prompts match your filters.'}
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 16 }}>
              {filteredPrompts.length} prompt{filteredPrompts.length === 1 ? '' : 's'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
              {filteredPrompts.map((prompt) => {
                const sessionUnlocked = unlockedSessions.includes(prompt.session)
                if (!sessionUnlocked) {
                  // Locked session prompt — show blurred overlay
                  const session = sessions.find((s) => s.id === prompt.session)
                  return (
                    <div key={prompt.id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                      <div style={{ filter: 'blur(3px)', pointerEvents: 'none', userSelect: 'none' }}>
                        <PromptCard prompt={prompt} showSessionBadge sessionColour={sessionColourMap[prompt.session]} />
                      </div>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(246,246,246,0.85)',
                        gap: 8,
                        padding: 16,
                        textAlign: 'center',
                      }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: '#6B6B6B' }}>
                          <path d="M7 9V7a3 3 0 016 0v2M5 9h10a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span style={{ fontSize: 12, color: '#6B6B6B', fontWeight: 500 }}>
                          Unlock {session?.id} to access these prompts
                        </span>
                      </div>
                    </div>
                  )
                }
                return (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    showSessionBadge
                    sessionColour={sessionColourMap[prompt.session]}
                  />
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
