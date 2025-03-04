import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: {
      getItem: (key) => {
        if (typeof window === 'undefined') {
          return null
        }
        const storedValue = window.localStorage.getItem(key)
        if (!storedValue) return null
        
        // Check if stored session is expired
        try {
          const session = JSON.parse(storedValue)
          if (session.expires_at && new Date(session.expires_at) < new Date()) {
            window.localStorage.removeItem(key)
            return null
          }
        } catch {
          return storedValue
        }
        return storedValue
      },
      setItem: (key, value) => {
        if (typeof window === 'undefined') return
        window.localStorage.setItem(key, value)
      },
      removeItem: (key) => {
        if (typeof window === 'undefined') return
        window.localStorage.removeItem(key)
      },
    },
  }
}) 