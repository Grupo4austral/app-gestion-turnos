import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oqdqedhoemxuzshyamqn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xZHFlZGhvZW14dXpzaHlhbXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMDk5MjEsImV4cCI6MjA3MDY4NTkyMX0.Jtc8SewceRMvnTTD-IM22A3XhA5i_h3jMg4aUu9ivyE';

export const supabase = createClient(supabaseUrl, supabaseKey);
