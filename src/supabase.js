import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sbpqaqggwxngcrhrbzdx.supabase.co';
const supabaseKey = 'sb_publishable_MNPDrGN5bG7MrRT4zYzHDg_8MrPvL7A';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
