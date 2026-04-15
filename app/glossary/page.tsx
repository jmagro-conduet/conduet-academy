'use client'

import { glossary } from '@/lib/content/shared'

export default function GlossaryPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ background: '#111111', padding: '40px 24px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 500, color: '#F1F1F2', margin: '0 0 8px' }}>
            Glossary
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            {glossary.length} terms. Everything you&apos;ll encounter across the series.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
        }}>
          {glossary.map((item) => (
            <div
              key={item.term}
              style={{
                background: '#FFFFFF',
                border: '0.5px solid #E4E4E5',
                borderRadius: 8,
                padding: '18px 16px 18px 20px',
                borderLeft: `5px solid ${item.colour}`,
              }}
            >
              <h3 style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#111111',
                margin: '0 0 6px',
                fontFamily: item.term === '/clear' ? "'JetBrains Mono', monospace" : 'Inter, sans-serif',
              }}>
                {item.term}
              </h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, lineHeight: 1.6 }}>
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
