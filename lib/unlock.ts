import { createClient } from '@/lib/supabase/client'

// Hardcoded for v1 — move to Supabase table in v2 for admin control
const SESSION_CODES: Record<string, string> = {
  '101': 'CRAWL-101',
  '201': 'WALK-201',
  '301': 'RUN-301',
}

export async function getUnlockedSessions(userId: string): Promise<string[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('user_sessions')
    .select('session_id')
    .eq('user_id', userId)
  return data?.map((r) => r.session_id) ?? ['101']
}

export async function unlockSession(
  userId: string,
  code: string
): Promise<{ success: boolean; sessionId?: string; message?: string }> {
  const trimmed = code.trim().toUpperCase()
  const entry = Object.entries(SESSION_CODES).find(([, v]) => v === trimmed)

  if (!entry) {
    return {
      success: false,
      message: 'Invalid code. Check with your session facilitator.',
    }
  }

  const [sessionId] = entry
  const supabase = createClient()

  const { error } = await supabase
    .from('user_sessions')
    .upsert({ user_id: userId, session_id: sessionId })

  if (error) {
    return { success: false, message: 'Something went wrong. Try again.' }
  }

  return { success: true, sessionId }
}
