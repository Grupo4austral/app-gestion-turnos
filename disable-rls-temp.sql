-- ========================================
-- SOLUCIÓN RÁPIDA: Deshabilitar RLS temporalmente
-- Ejecutar en Supabase SQL Editor
-- ========================================

-- OPCIÓN 1: Deshabilitar RLS (SOLO PARA DESARROLLO)
-- ⚠️ NO usar en producción
ALTER TABLE public.usuario DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.comentario DISABLE ROW LEVEL SECURITY;

-- Verificar que se deshabilitó
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('usuario', 'comentario');

-- Resultado esperado: rowsecurity = false para ambas tablas
