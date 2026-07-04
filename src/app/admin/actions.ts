'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { crearSesion, cerrarSesion, passwordCorrecta, sesionValida } from '@/lib/auth';

// ── Sesión ──
export async function loginAction(_prev: { error?: string } | undefined, formData: FormData) {
  const pass = String(formData.get('password') || '');
  if (!passwordCorrecta(pass)) {
    return { error: 'Contraseña incorrecta.' };
  }
  crearSesion();
  redirect('/admin');
}

export async function logoutAction() {
  cerrarSesion();
  redirect('/admin/login');
}

// ── Helpers ──
function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const MAX_FOTOS = 8;

async function subirImagen(file: File): Promise<string> {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `productos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const { error } = await supabaseAdmin()
    .storage.from('imagenes')
    .upload(path, buf, { contentType: file.type || 'image/jpeg', upsert: false });
  if (error) throw new Error(`No se pudo subir la imagen: ${error.message}`);
  const { data } = supabaseAdmin().storage.from('imagenes').getPublicUrl(path);
  return data.publicUrl;
}

async function subirImagenes(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const f of files) urls.push(await subirImagen(f));
  return urls;
}

function requiereSesion() {
  if (!sesionValida()) redirect('/admin/login');
}

// ── CRUD ──
export async function guardarProducto(_prev: { error?: string } | undefined, formData: FormData) {
  requiereSesion();
  const id = String(formData.get('id') || '');
  const nombre = String(formData.get('nombre') || '').trim();
  const categoria = String(formData.get('categoria') || '');
  const descripcion = String(formData.get('descripcion') || '').trim();
  const precio = Number(formData.get('precio') || 0);
  const presentacion = String(formData.get('presentacion') || '').trim() || null;
  const destacado = formData.get('destacado') === 'on';
  const disponible = formData.get('disponible') === 'on';

  // Fotos existentes que se conservan (en orden) + fotos nuevas a subir
  const existentes = formData.getAll('imagenes_existentes').map(String).filter(Boolean);
  const nuevos = formData
    .getAll('imagenes')
    .filter((v): v is File => v instanceof File && v.size > 0);

  if (!nombre || !categoria || !precio) {
    return { error: 'Nombre, categoría y precio son obligatorios.' };
  }
  if (existentes.length + nuevos.length > MAX_FOTOS) {
    return { error: `Máximo ${MAX_FOTOS} fotos por producto.` };
  }
  if (nuevos.some((f) => f.size > 4 * 1024 * 1024)) {
    return { error: 'Cada imagen debe pesar como máximo 4 MB.' };
  }

  try {
    const subidas = await subirImagenes(nuevos);
    const imagenes = [...existentes, ...subidas];

    const base: Record<string, unknown> = {
      nombre,
      categoria,
      descripcion,
      precio,
      presentacion,
      destacado,
      disponible,
      imagenes,
      imagen_url: imagenes[0] ?? null, // foto principal, para compatibilidad
    };

    if (id) {
      const { error } = await supabaseAdmin().from('productos').update(base).eq('id', id);
      if (error) throw error;
    } else {
      base.slug = `${slugify(nombre)}-${Math.random().toString(36).slice(2, 6)}`;
      const { error } = await supabaseAdmin().from('productos').insert(base);
      if (error) throw error;
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error al guardar. Revisá la conexión con Supabase.' };
  }

  revalidatePath('/');
  redirect('/admin');
}

export async function alternarDisponible(formData: FormData) {
  requiereSesion();
  const id = String(formData.get('id'));
  const actual = formData.get('actual') === 'true';
  await supabaseAdmin().from('productos').update({ disponible: !actual }).eq('id', id);
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function eliminarProducto(formData: FormData) {
  requiereSesion();
  const id = String(formData.get('id'));
  await supabaseAdmin().from('productos').delete().eq('id', id);
  revalidatePath('/admin');
  revalidatePath('/');
}
