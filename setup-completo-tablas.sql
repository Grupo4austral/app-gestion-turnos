-- ========================================
-- CREAR TABLAS COMPLETAS
-- Ejecutar en Supabase SQL Editor
-- ========================================

-- 1. CREAR TABLA USUARIO
CREATE TABLE IF NOT EXISTS public.usuario (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_usuario text,
  ubicacion text,
  dni text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. CREAR TABLA COMENTARIO
CREATE TABLE IF NOT EXISTS public.comentario (
  id_comentario bigserial PRIMARY KEY,
  comentario text NOT NULL,
  descripcion text,
  fecha_comentario timestamptz NOT NULL DEFAULT now(),
  puntuacion integer CHECK (puntuacion BETWEEN 1 AND 5),
  usuario_id uuid REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- 3. CREAR ÍNDICES
CREATE INDEX IF NOT EXISTS idx_usuario_email ON public.usuario(email);
CREATE INDEX IF NOT EXISTS idx_comentario_fecha ON public.comentario(fecha_comentario DESC);
CREATE INDEX IF NOT EXISTS idx_comentario_usuario ON public.comentario(usuario_id);

-- 4. DESHABILITAR RLS (para desarrollo)
ALTER TABLE public.usuario DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.comentario DISABLE ROW LEVEL SECURITY;

-- 5. VERIFICAR QUE TODO ESTÉ CREADO
SELECT 
  schemaname, 
  tablename, 
  rowsecurity,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = tablename) as num_columns
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('usuario', 'comentario')
ORDER BY tablename;

-- 6. VER COLUMNAS DE CADA TABLA
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name IN ('usuario', 'comentario')
ORDER BY table_name, ordinal_position;
