# ANTIAN · Sitio web + Panel de administración

Sitio web oficial de **ANTIAN** (conservas y pastelería artesanal): catálogo por
categorías, subdominios por producto, pedidos por WhatsApp y un panel de
administración para que los dueños carguen y actualicen sus productos sin tocar
código.

> Este repositorio es la web de un cliente, no una plantilla para clonar y
> reutilizar. La documentación de abajo sirve para **mantener y operar este
> sitio** (configurar el entorno, publicar cambios y el uso diario del panel).

**Stack:** Next.js 14 (App Router) · Chakra UI v3 (modo claro/oscuro) · Supabase (base de datos + fotos) · Vercel (hosting)

---

## Configurar el entorno (una sola vez)

Para trabajar sobre el sitio se necesitan las variables de entorno del cliente.
Nunca se versionan: viven en `.env` (local) y en Vercel (producción).

1. Copiar la plantilla y completar los valores reales:
   ```bash
   cp .env.example .env
   ```
   Ahí van las credenciales de Supabase, la contraseña del panel (`ADMIN_PASSWORD`)
   y el número de WhatsApp.
2. La base de datos ya está creada en Supabase. Si hubiera que rehacerla desde
   cero, en **SQL Editor** se pega el contenido de `supabase/schema.sql` y se
   ejecuta: crea la tabla de productos, el bucket de fotos y datos de ejemplo.
3. Las claves de Supabase están en **Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ clave secreta, nunca se comparte ni se sube al repo.

## Levantar el sitio localmente

```bash
npm install
npm run dev
```

- Web: http://localhost:3000
- Admin: http://localhost:3000/admin (contraseña = `ADMIN_PASSWORD` del `.env`)
- Subdominios en local: http://conservas.localhost:3000, http://alfajores.localhost:3000, etc.

> La primera carga de cada página en modo desarrollo tarda unos segundos mientras
> Next.js compila; después es instantáneo.

## Publicar cambios

El sitio está alojado en Vercel y se actualiza automáticamente al hacer push a la
rama conectada.

1. Subir los cambios al repo de GitHub.
2. Vercel detecta el push y despliega solo.
3. Las variables de entorno ya están cargadas en **Vercel → Settings → Environment
   Variables** (las mismas del `.env`, con `NEXT_PUBLIC_SITE_URL` y
   `NEXT_PUBLIC_ROOT_DOMAIN` apuntando al dominio real).

## Dominio y subdominios

En **Vercel → Settings → Domains** hay dos entradas:

| Dominio en Vercel | Para qué |
|---|---|
| `antian.com.ar` | el sitio principal |
| `*.antian.com.ar` | todos los subdominios (wildcard) |

Con el wildcard configurado, cada subdominio muestra su categoría automáticamente:

- `conservas.antian.com.ar` → Conservas
- `alfajores.antian.com.ar` → Alfajores
- `pasteleria.antian.com.ar` → Pastelería
- `combos.antian.com.ar` → Combos

Para agregar un subdominio nuevo (ej. una campaña `navidad.antian.com.ar`),
se suma una línea en `middleware.ts`, en el objeto `SUBDOMAIN_ROUTES`.

## Uso diario (para los dueños)

1. Entrar a `antian.com.ar/admin` con la contraseña.
2. **+ Nuevo producto**: nombre, categoría, presentación (ej. "Caja x6"),
   precio, descripción y foto. Marcar **Destacado** para que salga en la portada.
3. ¿Se acabó el stock? Botón **Pausar** → desaparece de la web sin borrarse.
4. Todo cambio impacta en la web al instante.

## Pendientes a completar cuando estén definidos

- [ ] Número de WhatsApp real en `NEXT_PUBLIC_WHATSAPP`
- [ ] Zonas de entrega (sección FAQ y footer)
- [ ] Preguntas frecuentes definitivas (se arman según los productos)
- [ ] Reseñas reales de clientes (reemplazar las de muestra en `src/app/page.tsx`)
- [ ] Link de Instagram y link "Dejanos tu reseña" de Google Business (footer)
- [ ] Favicon / logo en alta calidad

## Estructura del código

```
src/theme.ts                     → sistema de diseño Chakra (paleta cálida + modo oscuro)
src/app/provider.tsx             → provider de Chakra UI + next-themes
src/app/layout.tsx               → layout raíz (navbar, footer, botón de WhatsApp)
src/app/page.tsx                 → home (hero, destacados, cómo pedir, reseñas, FAQ)
src/app/productos/[categoria]/   → página de cada categoría
src/app/producto/[slug]/         → detalle de producto con botón de pedido
src/app/admin/                   → login, listado, alta y edición de productos
src/app/admin/actions.ts         → lógica del servidor (guardar, pausar, borrar, subir fotos)
src/components/                   → navbar, tarjetas, formulario y UI compartida
src/lib/supabase.ts              → consultas a la base de datos
src/lib/auth.ts                  → sesión del admin (cookie firmada)
middleware.ts                    → subdominios → categorías + guardia del admin
supabase/schema.sql              → script inicial de la base
```
