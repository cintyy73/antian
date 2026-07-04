'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { IconButton } from '@chakra-ui/react';

export default function ColorModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [montado, setMontado] = useState(false);

  // Evita el desajuste de hidratación (el tema real se conoce en el cliente).
  useEffect(() => setMontado(true), []);

  const esOscuro = resolvedTheme === 'dark';

  return (
    <IconButton
      aria-label={esOscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={esOscuro ? 'Modo claro' : 'Modo oscuro'}
      variant="ghost"
      size="sm"
      rounded="full"
      color="fg.muted"
      _hover={{ color: 'terracota.solid', bg: 'bg.muted' }}
      onClick={() => setTheme(esOscuro ? 'light' : 'dark')}
    >
      <span style={{ fontSize: '18px', lineHeight: 1 }}>{montado && esOscuro ? '☀' : '☾'}</span>
    </IconButton>
  );
}
