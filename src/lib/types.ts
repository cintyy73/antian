export type Categoria = 'conservas' | 'alfajores' | 'pasteleria' | 'combos';

export const CATEGORIAS: { slug: Categoria; nombre: string; descripcion: string }[] = [
  { slug: 'conservas', nombre: 'Conservas', descripcion: 'Frascos artesanales: escabeches, pickles, salsas y dulces.' },
  { slug: 'alfajores', nombre: 'Alfajores', descripcion: 'Alfajores artesanales por unidad o por caja.' },
  { slug: 'pasteleria', nombre: 'Pastelería', descripcion: 'Tortas, budines y cookies hechos a pedido.' },
  { slug: 'combos', nombre: 'Combos', descripcion: 'Cajas y combinaciones listas para regalar o disfrutar.' },
];

export interface Producto {
  id: string;
  nombre: string;
  slug: string;
  categoria: Categoria;
  descripcion: string;
  precio: number;
  presentacion: string | null; // ej: "Caja x6", "Frasco 360g"
  imagen_url: string | null;   // foto principal (= imagenes[0])
  imagenes: string[] | null;   // todas las fotos (galería / carrusel)
  destacado: boolean;
  disponible: boolean;
  created_at: string;
}

/**
 * Devuelve las fotos de un producto como array ordenado (principal primero).
 * Cae con elegancia a `imagen_url` para productos cargados antes de la galería.
 */
export function imagenesProducto(p: Pick<Producto, 'imagenes' | 'imagen_url'>): string[] {
  const arr = (p.imagenes ?? []).filter(Boolean);
  if (arr.length) return arr;
  if (p.imagen_url) return [p.imagen_url];
  return [];
}
