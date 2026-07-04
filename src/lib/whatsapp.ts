export function linkWhatsApp(mensaje: string) {
  const num = process.env.NEXT_PUBLIC_WHATSAPP || '';
  return `https://wa.me/${num}?text=${encodeURIComponent(mensaje)}`;
}

export function precioARS(n: number) {
  return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
}
