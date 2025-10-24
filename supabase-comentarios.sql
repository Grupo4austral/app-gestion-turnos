-- Crear tabla de comentarios en Supabase
-- Ejecutar este script en el SQL Editor de Supabase

create table if not exists public.comentario (
  id_comentario bigserial primary key,
  comentario text not null,
  descripcion text,
  fecha_comentario timestamptz not null default now(),
  puntuacion integer check (puntuacion between 1 and 5),
  usuario_id uuid references auth.users(id) on update cascade on delete set null,
  created_at timestamptz default now()
);

-- Índices para mejorar el rendimiento
create index if not exists idx_comentario_fecha on public.comentario (fecha_comentario desc);
create index if not exists idx_comentario_usuario on public.comentario (usuario_id);

-- Habilitar Row Level Security (RLS)
alter table public.comentario enable row level security;

-- Política: Los usuarios pueden ver todos los comentarios
create policy "Los usuarios pueden ver todos los comentarios"
  on public.comentario for select
  using (true);

-- Política: Los usuarios pueden insertar sus propios comentarios
create policy "Los usuarios pueden insertar comentarios"
  on public.comentario for insert
  with check (auth.uid() = usuario_id);

-- Política: Los usuarios solo pueden actualizar sus propios comentarios
create policy "Los usuarios pueden actualizar sus propios comentarios"
  on public.comentario for update
  using (auth.uid() = usuario_id);

-- Política: Los usuarios solo pueden eliminar sus propios comentarios
create policy "Los usuarios pueden eliminar sus propios comentarios"
  on public.comentario for delete
  using (auth.uid() = usuario_id);
