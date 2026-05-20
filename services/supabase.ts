import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://auvdtuozebzruwmibuuu.supabase.co' //url de DATA API
const supabaseAnonKey = 'sb_publishable_1y4sxtunyE6Xk6cmyIVbeQ_V6Fp8O6R' //key anon de API KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
