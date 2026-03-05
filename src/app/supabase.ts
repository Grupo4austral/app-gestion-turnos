import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

// Usa las variables de entorno (cambia automáticamente entre desarrollo y producción)
export const supabase = createClient(
  environment.supabase.url,
  environment.supabase.anonKey
);
