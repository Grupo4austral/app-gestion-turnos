# 🔧 Solución de Errores RLS

## 🚨 Errores que estabas viendo:
```
❌ Error al guardar cambios: new row violates row-level security policy for table "usuario"
Error al guardar: Error desconocido
```

## 📋 Solución paso a paso:

### 1️⃣ Crear/Verificar la tabla `usuario`

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Copia y pega el contenido de `create-usuario-table.sql`
5. Haz clic en **RUN**

### 2️⃣ Configurar políticas RLS correctas

1. En el mismo **SQL Editor**
2. Copia y pega el contenido de `fix-rls-policies.sql`
3. Haz clic en **RUN**

### 3️⃣ Verificar que funcionó

Ejecuta esta query para verificar las políticas:

```sql
-- Ver políticas de usuario
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('usuario', 'comentario');
```

Deberías ver:
- **usuario**: políticas para SELECT, INSERT, UPDATE
- **comentario**: políticas para SELECT, INSERT, UPDATE, DELETE

### 4️⃣ Probar en la app

1. Recarga tu app (F5)
2. Intenta editar tu perfil y guardar
3. Intenta crear un comentario

## 🔍 ¿Qué hacen las políticas?

### Tabla `usuario`:
- ✅ **SELECT**: Cualquiera puede ver perfiles
- ✅ **INSERT**: Solo puedes crear TU propio perfil (`auth.uid() = user_id`)
- ✅ **UPDATE**: Solo puedes actualizar TU propio perfil

### Tabla `comentario`:
- ✅ **SELECT**: Cualquiera puede ver comentarios
- ✅ **INSERT**: Solo usuarios autenticados pueden crear comentarios propios
- ✅ **UPDATE**: Solo puedes editar TUS comentarios
- ✅ **DELETE**: Solo puedes eliminar TUS comentarios

## 🆘 Si sigue fallando:

### Opción A: Deshabilitar RLS temporalmente (solo desarrollo)

```sql
-- ⚠️ SOLO PARA TESTING - NO USAR EN PRODUCCIÓN
ALTER TABLE public.usuario DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.comentario DISABLE ROW LEVEL SECURITY;
```

### Opción B: Crear política super permisiva (solo desarrollo)

```sql
-- Usuario
CREATE POLICY "allow_all_usuario" ON public.usuario FOR ALL USING (true) WITH CHECK (true);

-- Comentario  
CREATE POLICY "allow_all_comentario" ON public.comentario FOR ALL USING (true) WITH CHECK (true);
```

### Opción C: Verificar autenticación

Ejecuta en la consola del navegador:
```javascript
const { data } = await supabase.auth.getUser();
console.log('Usuario autenticado:', data);
```

Deberías ver un objeto con `id`, `email`, etc.

## 📊 Estructura correcta de las tablas:

### `usuario`
```sql
user_id         uuid (PK, FK a auth.users)
nombre_usuario  text
ubicacion       text  
dni             text
email           text
created_at      timestamptz
updated_at      timestamptz
```

### `comentario`
```sql
id_comentario      bigserial (PK)
comentario         text (NOT NULL)
descripcion        text
fecha_comentario   timestamptz (DEFAULT now())
puntuacion         integer (1-5)
usuario_id         uuid (FK a auth.users)
created_at         timestamptz (DEFAULT now())
```

## ✅ Checklist de verificación:

- [ ] Ejecuté `create-usuario-table.sql`
- [ ] Ejecuté `fix-rls-policies.sql`
- [ ] Las políticas están creadas (verificado con la query)
- [ ] RLS está habilitado en ambas tablas
- [ ] Estoy autenticado en la app
- [ ] Recargué la app después de los cambios

---

**¡Después de ejecutar los scripts SQL, todo debería funcionar!** 🎉
