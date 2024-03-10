
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    <'Your Supabase URL'>,
     <'Your Key'>)