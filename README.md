# ANTIAN · Web + Panel Admin

Web de captación de clientes para ANTIAN (conservas y pastelería artesanal), con
catálogo por categorías, subdominios por producto, pedidos por WhatsApp y panel
de administración para que los dueños carguen y actualicen productos.

**Stack:** Next.js 14 (App Router) · Supabase (base de datos + fotos, gratis) · Vercel (hosting, gratis)

---

## 1. Configurar Supabase (una sola vez, ~10 minutos)

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta gratis (podés usar tu Google).
2. **New project** → nombre `antian`, elegí una contraseña de base de datos (guardala) y región `South America (São Paulo)`.
3. Cuando termine de crearse, andá a **SQL Editor** → pegá TODO el contenido de
   `supabase/schema.sql` → **Run**. Eso crea la tabla de productos, el bucket de
   fotos y 4 productos de ejemplo.
4. Andá a **Settings → API** y copiá tres valores:
   - `Project URL` → va en `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → va en `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → va en `SUPABASE_SERVICE_ROLE_KEY` ⚠️ esta clave es secreta,
     nunca la compartas ni la subas a un repo público.

## 2. Correr en tu compu

```bash
cp .env.example .env      # y completá los valores (Supabase, contraseña admin, WhatsApp)
npm install
npm run dev
```

- Web: http://localhost:3000
- Admin: http://localhost:3000/admin (contraseña = `ADMIN_PASSWORD` del `.env`)
- Subdominios en local: http://conservas.localhost:3000, http://alfajores.localhost:3000, etc.

## 3. Publicar en Vercel

1. Subí el proyecto a un repo de GitHub (privado está bien).
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importá el repo. Vercel detecta Next.js solo.
3. Antes de deployar, en **Environment Variables** cargá TODAS las variables del `.env`
   (las mismas que usaste en local, con `NEXT_PUBLIC_SITE_URL` y
   `NEXT_PUBLIC_ROOT_DOMAIN` apuntando a tu dominio real).
4. **Deploy**. Listo: ya funciona en `antian.vercel.app`.

## 4. Dominio propio + subdominios

En **Vercel → Settings → Domains** agregá DOS entradas:

| Dominio en Vercel | Para qué |
|---|---|
| `antian.com.ar` | el sitio principal |
| `*.antian.com.ar` | TODOS los subdominios (wildcard) |

En el panel de tu proveedor de dominio (NIC.ar + Cloudflare, o donde lo tengas),
creá los registros DNS que Vercel te indica en pantalla. Para el wildcard es un
registro tipo `CNAME` con nombre `*` apuntando a `cname.vercel-dns.com`
(Vercel te muestra el valor exacto).

Con eso, automáticamente:

- `conservas.antian.com.ar` → muestra la página de Conservas
- `alfajores.antian.com.ar` → Alfajores
- `pasteleria.antian.com.ar` → Pastelería
- `combos.antian.com.ar` → Combos

Para agregar un subdominio nuevo (ej. una campaña `navidad.antian.com.ar`),
solo sumá una línea en `middleware.ts` en el objeto `SUBDOMAIN_ROUTES`.

## 5. Uso diario (para los dueños)

1. Entrar a `antian.com.ar/admin` con la contraseña.
2. **+ Nuevo producto**: nombre, categoría, presentación (ej. "Caja x6"),
   precio, descripción y foto. Marcar **Destacado** para que salga en la portada.
3. ¿Se acabó el stock? Botón **Pausar** → desaparece de la web sin borrarse.
4. Todo cambio impacta en la web al instante.

## 6. Pendientes a completar cuando estén definidos

- [ ] Número de WhatsApp real en `NEXT_PUBLIC_WHATSAPP`
- [ ] Zonas de entrega (sección FAQ y footer)
- [ ] Preguntas frecuentes definitivas (se arman según los productos)
- [ ] Reseñas reales de clientes (reemplazar las de muestra en `src/app/page.tsx`)
- [ ] Link de Instagram y link "Dejanos tu reseña" de Google Business (footer, ya
      está el lugar comentado en `src/app/layout.tsx`)
- [ ] Favicon / logo en alta calidad

## Estructura del código

```
middleware.ts                    → subdominios → categorías + guardia del admin
src/app/page.tsx                 → home (hero, destacados, cómo pedir, reseñas, FAQ)
src/app/productos/[categoria]/   → página de cada categoría
src/app/producto/[slug]/         → detalle de producto con botón de pedido
src/app/admin/                   → login, listado, alta y edición de productos
src/app/admin/actions.ts         → lógica del servidor (guardar, pausar, borrar, subir fotos)
src/lib/supabase.ts              → consultas a la base de datos
src/lib/auth.ts                  → sesión del admin (cookie firmada)
supabase/schema.sql              → script inicial de la base
```
# antian
