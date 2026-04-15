'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  unlockedSessions: string[]
  refreshUnlockedSessions: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  unlockedSessions: [],
  refreshUnlockedSessions: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [unlockedSessions, setUnlockedSessions] = useState<string[]>([])

  const supabase = createClient()

  const fetchUnlockedSessions = async (userId: string) => {
    const { data } = await supabase
      .from('user_sessions')
      .select('session_id')
      .eq('user_id', userId)
    setUnlockedSessions(data?.map((r) => r.session_id) ?? [])
  }

  const refreshUnlockedSessions = async () => {
    if (user) await fetchUnlockedSessions(user.id)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchUnlockedSessions(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchUnlockedSessions(session.user.id)
      else setUnlockedSessions([])
    })

    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ user, session, loading, unlockedSessions, refreshUnlockedSessions }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
