'use client'

import { useState } from 'react'
import { PromptCard } from '@/components/academy/PromptCard'
import {
  fieldGuide101,
  prompts101,
  bestPractices101,
  microHacks101,
  advancedMoves101,
} from '@/lib/content/session-101'

const COLOUR = '#CEA4FF'
const TABS = [
  { id: 'field-guide', label: 'Field guide' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'best-practices', label: 'Best practices' },
  { id: 'micro-hacks', label: 'Micro hacks' },
  { id: 'advanced', label: 'Advanced moves' },
]

export default function Session101Page() {
  const [activeTab, setActiveTab] = useState('field-guide')

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
              101 — Crawl
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>Claude fundamentals</span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 500, color: '#F1F1F2', margin: '0 0 32px', lineHeight: 1.2 }}>
            The foundations of working with Claude
          </h1>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 2, borderBottom: '0.5px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
            {TABS.map((tab) => (
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

      {/* Tab content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        {activeTab === 'field-guide' && <FieldGuideTab />}
        {activeTab === 'prompts' && <PromptsTab />}
        {activeTab === 'best-practices' && <BestPracticesTab />}
        {activeTab === 'micro-hacks' && <MicroHacksTab />}
        {activeTab === 'advanced' && <AdvancedTab />}
      </div>
    </div>
  )
}

// ─── Field Guide Tab ──────────────────────────────────────────────────────────

function FieldGuideTab() {
  const fg = fieldGuide101
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

      {/* Section 1 — The Gap */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 6px' }}>
          {fg.section1.heading}
        </h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 20px' }}>
          {fg.section1.subheading}
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 500, color: '#6B6B6B', background: '#F6F6F6', border: '0.5px solid #E4E4E5', width: '50%' }}>Most users</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 500, color: COLOUR, background: '#F6F6F6', border: '0.5px solid #E4E4E5', width: '50%' }}>Power users</th>
              </tr>
            </thead>
            <tbody>
              {fg.section1.comparison.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6B6B6B', border: '0.5px solid #E4E4E5', background: '#FFFFFF' }}>{row.left}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#111111', border: '0.5px solid #E4E4E5', background: '#FFFFFF', fontWeight: 500 }}>{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2 — Four-Ingredient Prompt */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 6px' }}>
          {fg.section2.heading}
        </h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 16px' }}>
          {fg.section2.intro}
        </p>
        {/* Formula */}
        <div style={{
          background: '#111111',
          color: '#F1F1F2',
          borderRadius: 8,
          padding: '14px 18px',
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: 24,
          lineHeight: 1.5,
        }}>
          {fg.section2.formula}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {fg.section2.ingredients.map((ing) => (
            <div key={ing.number} style={{
              background: '#FFFFFF',
              border: '0.5px solid #E4E4E5',
              borderRadius: 8,
              padding: '16px',
              borderLeft: `5px solid ${ing.colour}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: ing.colour, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                {ing.number}. {ing.name}
              </div>
              <div style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 8 }}>
                {ing.description}
              </div>
              <div style={{
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                color: '#111111',
                background: '#F6F6F6',
                borderRadius: 4,
                padding: '6px 8px',
                lineHeight: 1.5,
              }}>
                {ing.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Context is King */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 4px' }}>
          {fg.section3.heading}
        </h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 16px' }}>
          {fg.section3.subheading}
        </p>
        <blockquote style={{
          margin: '0 0 20px',
          borderLeft: `4px solid ${COLOUR}`,
          paddingLeft: 16,
          fontSize: 16,
          fontWeight: 500,
          color: '#111111',
          fontStyle: 'normal',
        }}>
          {fg.section3.pullQuote}
        </blockquote>
        <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 20px', lineHeight: 1.7 }}>
          {fg.section3.body}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
          {fg.section3.contextTypes.map((ct) => (
            <div key={ct.type} style={{
              background: '#FFFFFF',
              border: '0.5px solid #E4E4E5',
              borderRadius: 8,
              padding: '14px 16px',
              borderLeft: `5px solid ${ct.colour}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#111111', marginBottom: 4 }}>
                {ct.type}
              </div>
              <div style={{ fontSize: 12, color: '#6B6B6B', lineHeight: 1.5 }}>
                {ct.examples}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — From One-Off to Always-On */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 4px' }}>
          {fg.section4.heading}
        </h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 20px' }}>
          {fg.section4.subheading}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fg.section4.levels.map((lvl) => (
            <div key={lvl.level} style={{
              background: '#FFFFFF',
              border: '0.5px solid #E4E4E5',
              borderRadius: 8,
              padding: '20px',
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: lvl.colour,
                color: lvl.colour === '#6B6B6B' ? '#fff' : '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 500,
                flexShrink: 0,
              }}>
                {lvl.level}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#111111' }}>{lvl.name}</span>
                  <span style={{
                    padding: '1px 8px',
                    borderRadius: 100,
                    fontSize: 11,
                    fontWeight: 500,
                    background: `${lvl.colour}18`,
                    color: lvl.colour,
                  }}>{lvl.speed}</span>
                  <span style={{ fontSize: 12, color: '#6B6B6B', fontStyle: 'italic' }}>{lvl.label}</span>
                </div>
                <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, lineHeight: 1.6 }}>
                  {lvl.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5 — Power Moves */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 4px' }}>
          {fg.section5.heading}
        </h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 20px' }}>
          {fg.section5.intro}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fg.section5.moves.map((move) => (
            <div key={move.number} style={{
              background: '#FFFFFF',
              border: '0.5px solid #E4E4E5',
              borderRadius: 8,
              padding: '18px 20px',
              borderLeft: `5px solid ${move.colour}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: move.colour, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                Move {move.number}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#111111', marginBottom: 6 }}>
                {move.title}
              </div>
              <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, lineHeight: 1.7 }}>
                {move.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 — Trust Rules */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 20px' }}>
          {fg.section6.heading}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 20 }}>
          <div style={{
            background: '#FFFFFF',
            border: '0.5px solid #E4E4E5',
            borderRadius: 8,
            padding: '20px',
            borderTop: `4px solid ${COLOUR}`,
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#111111', marginBottom: 12 }}>
              ✓ Use freely — low stakes
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {fg.section6.useFreelyItems.map((item, i) => (
                <li key={i} style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
          <div style={{
            background: '#FFFFFF',
            border: '0.5px solid #E4E4E5',
            borderRadius: 8,
            padding: '20px',
            borderTop: '4px solid #FF8C78',
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#111111', marginBottom: 12 }}>
              ⚠ Verify first — higher stakes
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {fg.section6.verifyFirstItems.map((item, i) => (
                <li key={i} style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <blockquote style={{
          margin: 0,
          background: '#F6F6F6',
          border: '0.5px solid #E4E4E5',
          borderLeft: `4px solid ${COLOUR}`,
          borderRadius: '0 8px 8px 0',
          padding: '16px 20px',
          fontSize: 14,
          color: '#6B6B6B',
          fontStyle: 'italic',
          lineHeight: 1.7,
        }}>
          &ldquo;{fg.section6.analogy}&rdquo;
        </blockquote>
      </section>
    </div>
  )
}

// ─── Prompts Tab ──────────────────────────────────────────────────────────────

function PromptsTab() {
  const [filter, setFilter] = useState('all')
  const categories = ['all', 'analysis', 'communication', 'research', 'productivity', 'specialist']
  const filtered = filter === 'all' ? prompts101 : prompts101.filter((p) => p.category === filter)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 6px' }}>
          15 copy-paste prompts
        </h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 16px' }}>
          Ready to use. Customise the bracketed parts for your context.
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '5px 12px',
                fontSize: 12,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                background: filter === cat ? '#111111' : 'transparent',
                color: filter === cat ? '#F1F1F2' : '#6B6B6B',
                border: `0.5px solid ${filter === cat ? '#111111' : '#E4E4E5'}`,
                borderRadius: 100,
                cursor: 'pointer',
                transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
        {filtered.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} sessionColour={COLOUR} />
        ))}
      </div>
    </div>
  )
}

// ─── Best Practices Tab ───────────────────────────────────────────────────────

function BestPracticesTab() {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 6px' }}>
        Build your brain in Claude
      </h2>
      <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 24px' }}>
        Four practices that compound over time. Start with one.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {bestPractices101.map((practice) => (
          <div key={practice.number} style={{
            background: '#FFFFFF',
            border: '0.5px solid #E4E4E5',
            borderRadius: 8,
            padding: '20px',
            borderLeft: `5px solid ${practice.colour}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  background: `${practice.colour}15`,
                  color: practice.colour,
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontWeight: 500,
                  marginBottom: 6,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {practice.actionTag}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111111', margin: '0 0 8px' }}>
                  {practice.title}
                </h3>
                <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, lineHeight: 1.7 }}>
                  {practice.body}
                </p>
              </div>
            </div>
            {practice.template && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#6B6B6B', marginBottom: 8 }}>Starter template:</div>
                <div className="prompt-block">{practice.template}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Micro Hacks Tab ──────────────────────────────────────────────────────────

function MicroHacksTab() {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 6px' }}>
        Small habits, big difference
      </h2>
      <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 24px' }}>
        These take seconds. They compound into hours.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {microHacks101.map((hack) => (
          <div key={hack.number} style={{
            background: '#FFFFFF',
            border: '0.5px solid #E4E4E5',
            borderRadius: 12,
            padding: '20px',
            borderTop: `5px solid ${hack.colour}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: hack.colour, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Hack {hack.number}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111111', margin: '0 0 10px' }}>
              {hack.title}
            </h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, lineHeight: 1.7 }}>
              {hack.body}
            </p>
            {hack.tool && (
              <div style={{ marginTop: 12 }}>
                <a
                  href={hack.tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 12,
                    fontWeight: 500,
                    color: hack.colour,
                    textDecoration: 'none',
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M8.5 2.5L2.5 8.5M8.5 2.5H5M8.5 2.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {hack.tool.name} — {hack.tool.description}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Advanced Moves Tab ───────────────────────────────────────────────────────

function AdvancedTab() {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 500, color: '#111111', margin: '0 0 6px' }}>
        Advanced moves
      </h2>
      <p style={{ fontSize: 14, color: '#6B6B6B', margin: '0 0 24px' }}>
        Six techniques for when the basics aren&apos;t enough.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {advancedMoves101.map((move) => (
          <div key={move.number} style={{
            background: '#FFFFFF',
            border: '0.5px solid #E4E4E5',
            borderRadius: 8,
            padding: '20px',
            borderLeft: `5px solid ${move.colour}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: move.colour, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Advanced {move.number}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111111', margin: '0 0 8px' }}>
              {move.title}
            </h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, lineHeight: 1.7 }}>
              {move.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
