-- ========================================
-- FIX: Políticas RLS para usuario y comentario
-- Ejecutar en Supabase SQL Editor
-- ========================================

-- TABLA USUARIO
-- ========================================

-- 1. Eliminar políticas existentes si hay conflictos
DROP POLICY IF EXISTS "Los usuarios pueden ver todos los usuarios" ON public.usuario;
DROP POLICY IF EXISTS "Los usuarios pueden insertar su propio perfil" ON public.usuario;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar su propio perfil" ON public.usuario;
DROP POLICY IF EXISTS "Usuarios pueden insertar su propio perfil" ON public.usuario;
DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON public.usuario;

-- 2. Crear políticas permisivas para usuario
CREATE POLICY "Usuarios pueden ver todos los perfiles"
  ON public.usuario FOR SELECT
  USING (true);

CREATE POLICY "Usuarios pueden crear su propio perfil"
  ON public.usuario FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil"
  ON public.usuario FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- TABLA COMENTARIO
-- ========================================

-- 1. Verificar que RLS esté habilitado
ALTER TABLE public.comentario ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar políticas existentes si hay conflictos
DROP POLICY IF EXISTS "Los usuarios pueden ver todos los comentarios" ON public.comentario;
DROP POLICY IF EXISTS "Los usuarios pueden insertar comentarios" ON public.comentario;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar sus propios comentarios" ON public.comentario;
DROP POLICY IF EXISTS "Los usuarios pueden eliminar sus propios comentarios" ON public.comentario;

-- 3. Crear políticas permisivas para comentario
CREATE POLICY "Permitir ver todos los comentarios"
  ON public.comentario FOR SELECT
  USING (true);

CREATE POLICY "Permitir insertar comentarios autenticados"
  ON public.comentario FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Permitir actualizar propios comentarios"
  ON public.comentario FOR UPDATE
  USING (auth.uid() = usuario_id)
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Permitir eliminar propios comentarios"
  ON public.comentario FOR DELETE
  USING (auth.uid() = usuario_id);


-- ========================================
-- VERIFICACIÓN
-- ========================================

-- Ver políticas de usuario
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'usuario';

-- Ver políticas de comentario
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'comentario';
