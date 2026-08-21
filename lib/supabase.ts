'use client'
import { createClient } from '@supabase/supabase-js'

// Clé publique (publishable) Supabase — conçue pour être exposée côté client.
const supabaseUrl = 'https://phcddipevdmccrjqqjav.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoY2RkaXBldmRtY2NyanFxamF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NDI4NDksImV4cCI6MjEwMTAxODg0OX0.w9ryTvE5qL_y9Nx2OtMpPK8vpLx-Tb3BXt2Lyq6DQE4'

// Le schéma "eglise" doit être ajouté dans Supabase > Project Settings > API > Exposed schemas
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'eglise' },
})
