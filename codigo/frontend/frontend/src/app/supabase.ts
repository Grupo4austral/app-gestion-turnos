import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://laykevvzjskyiqsiwltc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxheWtldnZ6anNreWlxc2l3bHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODE1NzIsImV4cCI6MjA2ODg1NzU3Mn0.RsF0YXsgrnDayeknoQ5fOGQV42sjV-2n83SrVp0A2lU';

export const supabase = createClient(supabaseUrl, supabaseKey);
