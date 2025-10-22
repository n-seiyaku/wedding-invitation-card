import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl) {
    throw new Error(
        'Supabase URL is required (set NEXT_PUBLIC_SUPABASE_URL or NEXT_SUPABASE_URL)'
    )
}

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
