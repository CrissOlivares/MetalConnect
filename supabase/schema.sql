-- MetalConnect: tablas de la base de datos
-- Pegar completo en Supabase → SQL Editor → New query → Run

-- ===== TALLERES =====
create table public.talleres (
  id bigint generated always as identity primary key,
  user_id uuid not null unique default auth.uid() references auth.users(id) on delete cascade,
  nombre text not null,
  rut text,
  direccion text,
  telefono text,
  whatsapp text,
  horario text,
  especialidades text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- ===== TRABAJOS (publicados por clientes) =====
create table public.trabajos (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  titulo text not null,
  categoria text,
  ubicacion text,
  descripcion text,
  estado text not null default 'Abierto',
  created_at timestamptz not null default now()
);

-- ===== OFERTAS (presupuestos de talleres a un trabajo) =====
create table public.ofertas (
  id bigint generated always as identity primary key,
  trabajo_id bigint not null references public.trabajos(id) on delete cascade,
  taller_id bigint not null references public.talleres(id) on delete cascade,
  precio numeric,
  mensaje text,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.talleres, public.trabajos, public.ofertas to authenticated;

-- ===== PERMISOS (Row Level Security) =====
alter table public.talleres enable row level security;
alter table public.trabajos enable row level security;
alter table public.ofertas enable row level security;

-- Talleres: cualquier usuario con sesión los ve; cada uno edita solo el suyo
create policy "Ver talleres" on public.talleres
  for select to authenticated using (true);
create policy "Crear mi taller" on public.talleres
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Editar mi taller" on public.talleres
  for update to authenticated using (user_id = (select auth.uid()));

-- Trabajos: todos los ven (los talleres necesitan verlos); cada uno maneja los suyos
create policy "Ver trabajos" on public.trabajos
  for select to authenticated using (true);
create policy "Publicar trabajo" on public.trabajos
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Editar mi trabajo" on public.trabajos
  for update to authenticated using (user_id = (select auth.uid()));
create policy "Borrar mi trabajo" on public.trabajos
  for delete to authenticated using (user_id = (select auth.uid()));

-- Ofertas: las ve el dueño del trabajo y el taller que la envió
create policy "Ver ofertas" on public.ofertas
  for select to authenticated using (
    exists (select 1 from public.trabajos t where t.id = trabajo_id and t.user_id = (select auth.uid()))
    or exists (select 1 from public.talleres ta where ta.id = taller_id and ta.user_id = (select auth.uid()))
  );
create policy "Enviar oferta desde mi taller" on public.ofertas
  for insert to authenticated with check (
    exists (select 1 from public.talleres ta where ta.id = taller_id and ta.user_id = (select auth.uid()))
  );
