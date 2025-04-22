import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bkvubuodrrvvfdjazlhl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdnVidW9kcnJ2dmZkamF6bGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMDIxMzEsImV4cCI6MjA1ODU3ODEzMX0.cYwVumgY3GloWYKqunm-9wGwfgjNH0lYL5hcljSnU7o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
