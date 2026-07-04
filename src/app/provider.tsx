'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { system } from '@/theme';

/**
 * Provider global de Chakra UI v3.
 * Arranca en modo claro (estilo cálido) pero permite alternar a oscuro.
 */
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
