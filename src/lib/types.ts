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
  imagen_url: string | null;
  destacado: boolean;
  disponible: boolean;
  created_at: string;
}
