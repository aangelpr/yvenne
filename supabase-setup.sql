-- ============================================================
-- YVENNE — Configuración de Supabase (pégalo completo en el
-- SQL Editor de tu proyecto y dale RUN una sola vez)
-- ============================================================

-- 1) Tabla única con todos los datos de la tienda
create table if not exists public.tienda (
  id int primary key,
  config jsonb not null,
  categorias jsonb not null,
  catalogo jsonb not null,
  updated_at timestamptz default now()
);

-- 2) Seguridad: cualquiera puede LEER (es una tienda pública),
--    pero solo tú con tu sesión puedes ESCRIBIR
alter table public.tienda enable row level security;

drop policy if exists "lectura publica" on public.tienda;
create policy "lectura publica"
  on public.tienda for select
  using (true);

drop policy if exists "escribir solo admin" on public.tienda;
create policy "escribir solo admin"
  on public.tienda for update
  to authenticated
  using (true) with check (true);

drop policy if exists "insertar solo admin" on public.tienda;
create policy "insertar solo admin"
  on public.tienda for insert
  to authenticated
  with check (true);

-- 3) Almacenamiento de fotos: carpeta pública "fotos"
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do nothing;

drop policy if exists "fotos lectura publica" on storage.objects;
create policy "fotos lectura publica"
  on storage.objects for select
  using (bucket_id = 'fotos');

drop policy if exists "fotos subir solo admin" on storage.objects;
create policy "fotos subir solo admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'fotos');

drop policy if exists "fotos actualizar solo admin" on storage.objects;
create policy "fotos actualizar solo admin"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'fotos');

drop policy if exists "fotos borrar solo admin" on storage.objects;
create policy "fotos borrar solo admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'fotos');
