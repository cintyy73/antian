-- ══════════════════════════════════════════════════════════════
-- ANTIAN · Script inicial para Supabase
-- Pegar TODO este archivo en: Supabase → SQL Editor → Run
-- ══════════════════════════════════════════════════════════════

-- 1) Tabla de productos
create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text not null unique,
  categoria text not null check (categoria in ('conservas','alfajores','pasteleria','combos')),
  descripcion text not null default '',
  precio integer not null check (precio >= 0),
  presentacion text,
  imagen_url text,                       -- foto principal (= imagenes[1], para compatibilidad)
  imagenes text[] not null default '{}', -- todas las fotos del producto (galería / carrusel)
  destacado boolean not null default false,
  disponible boolean not null default true,
  created_at timestamptz not null default now()
);

-- 1.b) Migración para bases ya existentes (idempotente): agrega la columna
--      imagenes si falta y copia la foto que hubiera en imagen_url.
alter table public.productos add column if not exists imagenes text[] not null default '{}';
update public.productos
  set imagenes = array[imagen_url]
  where imagen_url is not null and coalesce(array_length(imagenes, 1), 0) = 0;

-- 2) Seguridad: activamos RLS. La web usa la clave service_role (servidor),
--    que ignora RLS; nadie puede escribir desde el navegador.
alter table public.productos enable row level security;

-- Lectura pública opcional (por si algún día se consulta desde el navegador)
drop policy if exists "lectura publica" on public.productos;
create policy "lectura publica" on public.productos for select using (true);

-- 3) Bucket de imágenes (público para que la web muestre las fotos)
insert into storage.buckets (id, name, public)
values ('imagenes', 'imagenes', true)
on conflict (id) do nothing;

-- 4) Productos de ejemplo (podés borrarlos desde el panel admin)
insert into public.productos (nombre, slug, categoria, descripcion, precio, presentacion, destacado) values
  ('Alfajores de maicena', 'alfajores-de-maicena-demo', 'alfajores', 'Clásicos de maicena con dulce de leche y coco rallado.', 6000, 'Caja x6', true),
  ('Escabeche de berenjenas', 'escabeche-berenjenas-demo', 'conservas', 'Berenjenas en escabeche con receta de la casa.', 5500, 'Frasco 360g', false),
  ('Budín de limón', 'budin-de-limon-demo', 'pasteleria', 'Budín húmedo de limón con glaseado artesanal.', 7000, 'Entero', false),
  ('Combo Merienda', 'combo-merienda-demo', 'combos', 'Caja x6 alfajores + budín de limón. Ideal para regalar.', 12000, 'Caja regalo', true)
on conflict (slug) do nothing;
