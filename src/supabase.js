import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_API_SUPABASEURL
const supabaseKey = import.meta.env.VITE_API_SUPABASEKEY

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
