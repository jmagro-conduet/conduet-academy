import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { Nav } from '@/components/ui/Nav'
import { Footer } from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Conduet Academy',
  description: 'Your AI training hub. Level up, session by session.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Nav />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
