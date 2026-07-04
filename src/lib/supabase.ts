import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Producto, Categoria } from './types';

// Cliente de servidor (service role: puede escribir). NUNCA exponer en el navegador.
let admin: SupabaseClient | null = null;
export function supabaseAdmin(): SupabaseClient {
  if (!admin) {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  }
  return admin;
}

// ── Lecturas públicas ──
export async function getProductos(opts?: { categoria?: Categoria; soloDisponibles?: boolean; destacados?: boolean }) {
  let q = supabaseAdmin().from('productos').select('*').order('created_at', { ascending: false });
  if (opts?.categoria) q = q.eq('categoria', opts.categoria);
  if (opts?.soloDisponibles !== false) q = q.eq('disponible', true);
  if (opts?.destacados) q = q.eq('destacado', true);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Producto[];
}

export async function getProductoPorSlug(slug: string) {
  const { data, error } = await supabaseAdmin().from('productos').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data as Producto | null;
}

export async function getProductoPorId(id: string) {
  const { data, error } = await supabaseAdmin().from('productos').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as Producto | null;
}

export async function getTodosAdmin() {
  const { data, error } = await supabaseAdmin().from('productos').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Producto[];
}
