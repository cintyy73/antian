import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE = 'antian_admin';

function firmar(valor: string) {
  return createHmac('sha256', process.env.AUTH_SECRET || 'dev-secret').update(valor).digest('hex');
}

export function crearSesion() {
  const token = `ok.${firmar('ok')}`;
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 días
    path: '/',
  });
}

export function cerrarSesion() {
  cookies().delete(COOKIE);
}

export function sesionValida(): boolean {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return false;
  const [payload, firma] = token.split('.');
  if (payload !== 'ok' || !firma) return false;
  const esperada = firmar('ok');
  try {
    return timingSafeEqual(Buffer.from(firma), Buffer.from(esperada));
  } catch {
    return false;
  }
}

export function passwordCorrecta(pass: string) {
  return Boolean(process.env.ADMIN_PASSWORD) && pass === process.env.ADMIN_PASSWORD;
}
