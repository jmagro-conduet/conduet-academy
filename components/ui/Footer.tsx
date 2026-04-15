import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{
      background: '#111111',
      borderTop: '0.5px solid rgba(255,255,255,0.08)',
      padding: '40px 24px',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#F1F1F2', marginBottom: 6 }}>
              Conduet Academy
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              Your AI training hub.<br />
              Level up, session by session.
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                Sessions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: '101 — Crawl', href: '/session/101' },
                  { label: '201 — Walk', href: '/session/201' },
                  { label: '301 — Run', href: '/session/301' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                Resources
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Prompt library', href: '/prompts' },
                  { label: 'Glossary', href: '/glossary' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            conduet° — Internal use only
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Conduet
          </span>
        </div>
      </div>
    </footer>
  )
}
