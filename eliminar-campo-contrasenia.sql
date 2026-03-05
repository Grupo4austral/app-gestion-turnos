-- ========================================
-- ELIMINAR CAMPO CONTRASENIA DE TABLA USUARIO
-- ========================================
-- Este script elimina el campo 'contrasenia' que es innecesario
-- porque Supabase Auth maneja las contraseñas automáticamente
-- 
-- Ejecutar en Supabase SQL Editor
-- ========================================

-- 1. Verificar si la columna existe antes de eliminar
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'usuario' 
        AND column_name = 'contrasenia'
    ) THEN
        -- Eliminar la columna
        ALTER TABLE public.usuario DROP COLUMN contrasenia;
        RAISE NOTICE 'Columna contrasenia eliminada correctamente';
    ELSE
        RAISE NOTICE 'La columna contrasenia no existe, no se requiere acción';
    END IF;
END $$;

-- 2. Verificar que se eliminó correctamente
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'usuario'
ORDER BY ordinal_position;
