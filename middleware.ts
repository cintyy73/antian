import { NextRequest, NextResponse } from 'next/server';

// Subdominios que se redirigen a su página de categoría.
// Para agregar uno nuevo (ej: navidad.antian.com → /productos/combos),
// sumá una línea acá.
const SUBDOMAIN_ROUTES: Record<string, string> = {
  conservas: '/productos/conservas',
  alfajores: '/productos/alfajores',
  pasteleria: '/productos/pasteleria',
  combos: '/productos/combos',
};

function getSubdomain(host: string): string | null {
  const hostname = host.split(':')[0]; // sin puerto
  // Desarrollo local: conservas.localhost:3000
  if (hostname.endsWith('.localhost')) {
    return hostname.replace('.localhost', '');
  }
  const root = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
  if (root && hostname !== root && hostname.endsWith(`.${root}`)) {
    const sub = hostname.slice(0, -(root.length + 1));
    if (sub && sub !== 'www') return sub;
  }
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Protección del panel admin (la validación fina se hace en el layout,
  //    esto es la primera barrera).
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const cookie = req.cookies.get('antian_admin')?.value;
    if (!cookie) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // 2) Subdominios → categorías (rewrite: la URL del navegador no cambia)
  const host = req.headers.get('host') || '';
  const sub = getSubdomain(host);
  if (sub && SUBDOMAIN_ROUTES[sub] && pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = SUBDOMAIN_ROUTES[sub];
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
