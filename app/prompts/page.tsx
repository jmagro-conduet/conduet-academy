'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { PromptCard } from '@/components/academy/PromptCard'
import { SubmitPromptModal, type CommunityPrompt } from '@/components/academy/SubmitPromptModal'
import { prompts101 } from '@/lib/content/session-101'
import { promptCategories, promptRoles, sessions } from '@/lib/content/shared'
import { createClient } from '@/lib/supabase/client'

const BUILTIN_PROMPTS = [...prompts101]

export default function PromptsPage() {
  const { user, loading, unlockedSessions } = useAuth()
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [sessionFilter, setSessionFilter] = useState('all')
  const [activeView, setActiveView] = useState<'all' | 'saved' | 'community'>('all')
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [loadingSaved, setLoadingSaved] = useState(false)
  const [communityPrompts, setCommunityPrompts] = useState<CommunityPrompt[]>([])
  const [loadingCommunity, setLoadingCommunity] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

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

  useEffect(() => {
    if (!user || activeView !== 'community') return
    setLoadingCommunity(true)
    supabase
      .from('community_prompts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setCommunityPrompts((data as CommunityPrompt[]) ?? [])
        setLoadingCommunity(false)
      })
  }, [user, activeView]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveToggle = (id: string, nowSaved: boolean) => {
    setSavedIds((prev) =>
      nowSaved ? [...prev, id] : prev.filter((x) => x !== id)
    )
  }

  const sessionColourMap = useMemo(() => {
    const map: Record<string, string> = {}
    sessions.forEach((s) => { map[s.id] = s.colour })
    return map
  }, [])

  const filteredBuiltin = useMemo(() => {
    let list = activeView === 'saved'
      ? BUILTIN_PROMPTS.filter((p) => savedIds.includes(p.id))
      : BUILTIN_PROMPTS

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

  const filteredCommunity = useMemo(() => {
    let list = communityPrompts
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
  }, [search, categoryFilter, roleFilter, communityPrompts])

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

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '7px 16px',
    fontSize: 13,
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
    background: active ? '#111111' : 'transparent',
    color: active ? '#F1F1F2' : '#6B6B6B',
    border: `0.5px solid ${active ? '#111111' : '#E4E4E5'}`,
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.15s',
  })

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#111111', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 500, color: '#F1F1F2', margin: '0 0 8px' }}>
              Prompt library
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              Copy, save, and build on these prompts. All from your unlocked sessions.
            </p>
          </div>
          <button
            onClick={() => setShowSubmitModal(true)}
            style={{
              padding: '9px 18px',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              background: '#CEA4FF',
              color: '#111111',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            + Share a prompt
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* View tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          <button onClick={() => setActiveView('all')} style={tabStyle(activeView === 'all')}>
            All prompts
          </button>
          <button onClick={() => setActiveView('saved')} style={tabStyle(activeView === 'saved')}>
            Saved ({savedIds.length})
          </button>
          <button onClick={() => setActiveView('community')} style={tabStyle(activeView === 'community')}>
            Community {communityPrompts.length > 0 && activeView === 'community' ? `(${communityPrompts.length})` : ''}
          </button>
        </div>

        {/* Search + filters — not shown on community tab where different logic applies */}
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
            {/* Session filter — only on all/saved tabs */}
            {activeView !== 'community' && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Session</div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  <button style={filterBtnStyle(sessionFilter === 'all')} onClick={() => setSessionFilter('all')}>All</button>
                  {sessions.map((s) => {
                    const unlocked = unlockedSessions.includes(s.id)
                    return (
                      <button
                        key={s.id}
                        style={{ ...filterBtnStyle(sessionFilter === s.id), opacity: unlocked ? 1 : 0.45 }}
                        onClick={() => setSessionFilter(s.id)}
                      >
                        {s.id} — {s.level}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

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

        {/* Results — Community tab */}
        {activeView === 'community' && (
          <>
            {loadingCommunity ? (
              <div style={{ color: '#6B6B6B', fontSize: 14 }}>Loading community prompts…</div>
            ) : filteredCommunity.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 16px' }}>
                  No community prompts yet. Be the first to share one.
                </p>
                <button
                  onClick={() => setShowSubmitModal(true)}
                  style={{
                    padding: '9px 18px',
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    background: '#111111',
                    color: '#F1F1F2',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                >
                  Share a prompt
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 16 }}>
                  {filteredCommunity.length} community prompt{filteredCommunity.length === 1 ? '' : 's'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
                  {filteredCommunity.map((cp) => (
                    <CommunityPromptCard
                      key={cp.id}
                      prompt={cp}
                      savedIds={savedIds}
                      onSaveToggle={handleSaveToggle}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Results — All / Saved tabs */}
        {activeView !== 'community' && (
          <>
            {loadingSaved && activeView === 'saved' ? (
              <div style={{ color: '#6B6B6B', fontSize: 14 }}>Loading saved prompts…</div>
            ) : filteredBuiltin.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px', color: '#6B6B6B', fontSize: 14 }}>
                {activeView === 'saved' && savedIds.length === 0
                  ? 'No saved prompts yet. Use the save button on any prompt card.'
                  : 'No prompts match your filters.'}
              </div>
            ) : (
              <>
                <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 16 }}>
                  {filteredBuiltin.length} prompt{filteredBuiltin.length === 1 ? '' : 's'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
                  {filteredBuiltin.map((prompt) => {
                    const sessionUnlocked = unlockedSessions.includes(prompt.session)
                    if (!sessionUnlocked) {
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
                        initialSaved={savedIds.includes(prompt.id)}
                        onSaveToggle={handleSaveToggle}
                      />
                    )
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {showSubmitModal && (
        <SubmitPromptModal
          onClose={() => setShowSubmitModal(false)}
          onSubmitted={(newPrompt) => {
            setCommunityPrompts((prev) => [newPrompt, ...prev])
            setActiveView('community')
          }}
        />
      )}
    </div>
  )
}

// ── Community prompt card (no session gating, shows submitter) ────────────────

type CommunityCardProps = {
  prompt: CommunityPrompt
  savedIds: string[]
  onSaveToggle: (id: string, nowSaved: boolean) => void
}

const categoryColours: Record<string, string> = {
  analysis: '#CEA4FF',
  communication: '#008278',
  research: '#FF8C78',
  productivity: '#FFCC50',
  specialist: '#6B6B6B',
}

function CommunityPromptCard({ prompt, savedIds, onSaveToggle }: CommunityCardProps) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(savedIds.includes(prompt.id))
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()
  const supabase = createClient()
  const catColour = categoryColours[prompt.category] ?? '#6B6B6B'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveToggle = async () => {
    if (!user || saving) return
    setSaving(true)
    if (saved) {
      await supabase.from('saved_prompts').delete().eq('user_id', user.id).eq('prompt_id', prompt.id)
      setSaved(false)
      onSaveToggle(prompt.id, false)
    } else {
      await supabase.from('saved_prompts').upsert({ user_id: user.id, prompt_id: prompt.id })
      setSaved(true)
      onSaveToggle(prompt.id, true)
    }
    setSaving(false)
  }

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
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <h4 style={{ fontSize: 14, fontWeight: 500, color: '#111111', margin: 0, lineHeight: 1.3 }}>
            {prompt.title}
          </h4>
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 11, fontWeight: 500, background: `${catColour}18`, color: catColour }}>
              {prompt.category}
            </span>
            <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 11, fontWeight: 500, background: 'rgba(206,164,255,0.12)', color: '#CEA4FF' }}>
              community
            </span>
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#6B6B6B', margin: '0 0 4px', lineHeight: 1.5 }}>
          {prompt.description}
        </p>

        {prompt.submitter_name && (
          <p style={{ fontSize: 11, color: '#aaa', margin: '0 0 10px' }}>
            Shared by {prompt.submitter_name}
          </p>
        )}

        <div className="prompt-block" style={{ marginBottom: 12 }}>
          {prompt.prompt}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleCopy}
            style={{
              padding: '6px 12px', fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif',
              background: copied ? '#111111' : 'transparent',
              color: copied ? '#F1F1F2' : '#111111',
              border: `0.5px solid ${copied ? '#111111' : '#E4E4E5'}`,
              borderRadius: 6, cursor: 'pointer', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: 5,
            }}
          >
            {copied ? 'Copied!' : 'Copy prompt'}
          </button>
          {user && (
            <button
              onClick={handleSaveToggle}
              disabled={saving}
              style={{
                padding: '6px 12px', fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif',
                background: saved ? `${catColour}15` : 'transparent',
                color: saved ? catColour : '#6B6B6B',
                border: `0.5px solid ${saved ? catColour : '#E4E4E5'}`,
                borderRadius: 6, cursor: saving ? 'default' : 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: 5,
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
