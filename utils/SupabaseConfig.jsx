
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://qlbuqtbibxmihvzsvbvl.supabase.co',
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsYnVxdGJpYnhtaWh2enN2YnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3NzA4NjEsImV4cCI6MjAyNTM0Njg2MX0.ZFCywAi12H0MVEyW81fdN1cxmW1zJX1MtNGyB1phUgc')