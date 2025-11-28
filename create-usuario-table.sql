-- ========================================
-- CREAR TABLA USUARIO SI NO EXISTE
-- Ejecutar en Supabase SQL Editor
-- ========================================

-- Crear tabla usuario
CREATE TABLE IF NOT EXISTS public.usuario (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_usuario text,
  ubicacion text,
  dni text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_usuario_email ON public.usuario(email);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_usuario_updated_at ON public.usuario;
CREATE TRIGGER update_usuario_updated_at
    BEFORE UPDATE ON public.usuario
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.usuario ENABLE ROW LEVEL SECURITY;

-- Verificar estructura
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'usuario'
ORDER BY ordinal_position;
