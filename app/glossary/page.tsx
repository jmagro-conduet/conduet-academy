'use client'

import { useState } from 'react'
import { glossary, llmAssumptions } from '@/lib/content/shared'

export default function GlossaryPage() {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  return (
    <div>
      {/* Header */}
      <div style={{ background: '#111111', padding: '40px 24px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 500, color: '#F1F1F2', margin: '0 0 8px' }}>
            Glossary
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            {glossary.length} terms. Click any card to go deeper.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* LLM Assumptions section */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 500, color: '#111111', margin: '0 0 6px', fontFamily: 'Inter, sans-serif' }}>
              Watch out for these
            </h2>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>
              Assumptions Claude (and most LLMs) make by default — and how to override them.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 12,
          }}>
            {llmAssumptions.map((item) => (
              <div
                key={item.assumption}
                style={{
                  background: '#FFFFFF',
                  border: '0.5px solid #E4E4E5',
                  borderRadius: 8,
                  padding: '16px 16px 16px 20px',
                  borderLeft: `4px solid ${item.colour}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 2, flexShrink: 0, color: item.colour }}>
                    <path d="M7 1.75a5.25 5.25 0 100 10.5A5.25 5.25 0 007 1.75zM7 4.375v3.5M7 9.625h.007" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#111111', margin: 0, lineHeight: 1.4 }}>
                    {item.assumption}
                  </p>
                </div>
                <p style={{ fontSize: 12, color: '#6B6B6B', margin: 0, lineHeight: 1.6, paddingLeft: 22 }}>
                  <span style={{ fontWeight: 500, color: '#008278' }}>Fix: </span>
                  {item.fix}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '0.5px solid #E4E4E5', marginBottom: 40 }} />

        {/* Glossary terms */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 500, color: '#111111', margin: '0 0 6px', fontFamily: 'Inter, sans-serif' }}>
            All terms
          </h2>
          <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>
            Click any card to expand the full explanation.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
        }}>
          {glossary.map((item) => {
            const isExpanded = expandedTerm === item.term
            const isCode = item.term.startsWith('/')

            return (
              <div
                key={item.term}
                onClick={() => setExpandedTerm(isExpanded ? null : item.term)}
                style={{
                  background: '#FFFFFF',
                  border: `0.5px solid ${isExpanded ? item.colour : '#E4E4E5'}`,
                  borderRadius: 8,
                  padding: '18px 16px 18px 20px',
                  borderLeft: `5px solid ${item.colour}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  gridColumn: isExpanded ? 'span 2' : 'span 1',
                }}
              >
                {/* Term header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#111111',
                    margin: 0,
                    fontFamily: isCode ? "'JetBrains Mono', monospace" : 'Inter, sans-serif',
                  }}>
                    {item.term}
                  </h3>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{
                      color: '#6B6B6B',
                      flexShrink: 0,
                      marginTop: 2,
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <path d="M2.5 5l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Short definition — always visible */}
                <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, lineHeight: 1.6 }}>
                  {item.definition}
                </p>

                {/* Expanded content */}
                {isExpanded && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '0.5px solid #E4E4E5' }}>
                    <p style={{ fontSize: 13, color: '#111111', margin: '0 0 12px', lineHeight: 1.7 }}>
                      {item.expanded}
                    </p>

                    {item.tip && (
                      <div style={{
                        background: `${item.colour}0F`,
                        border: `0.5px solid ${item.colour}30`,
                        borderRadius: 6,
                        padding: '10px 12px',
                        marginBottom: 12,
                      }}>
                        <p style={{ fontSize: 12, color: '#111111', margin: 0, lineHeight: 1.6 }}>
                          <span style={{ fontWeight: 600, color: item.colour }}>Tip: </span>
                          {item.tip}
                        </p>
                      </div>
                    )}

                    {item.youtubeQuery && (
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.youtubeQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 12,
                          color: '#FF0000',
                          textDecoration: 'none',
                          fontWeight: 500,
                        }}
                      >
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                          <path d="M13.7 1.56A1.76 1.76 0 0012.46.3C11.37 0 7 0 7 0S2.63 0 1.54.3A1.76 1.76 0 00.3 1.56C0 2.67 0 5 0 5s0 2.33.3 3.44A1.76 1.76 0 001.54 9.7C2.63 10 7 10 7 10s4.37 0 5.46-.3a1.76 1.76 0 001.24-1.26C14 7.33 14 5 14 5s0-2.33-.3-3.44zM5.6 7.14V2.86L9.24 5 5.6 7.14z"/>
                        </svg>
                        Watch a video explanation
                      </a>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
