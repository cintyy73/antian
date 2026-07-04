'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react';
import { CATEGORIAS } from '@/lib/types';
import { linkWhatsApp } from '@/lib/whatsapp';
import ColorModeToggle from '@/components/ColorModeToggle';

const enlaces = [
  ...CATEGORIAS.map((c) => ({ href: `/productos/${c.slug}`, label: c.nombre, interno: true })),
  { href: '/#como-pedir', label: 'Cómo pedir', interno: false },
  { href: '/#contacto', label: 'Contacto', interno: false },
];

function EnlaceNav({
  href,
  label,
  interno,
  onClick,
}: {
  href: string;
  label: string;
  interno: boolean;
  onClick?: () => void;
}) {
  const estilos = {
    fontSize: 'sm',
    fontWeight: 'medium',
    letterSpacing: '0.04em',
    color: 'fg.muted',
    textDecoration: 'none',
    px: { base: 0, md: 1 },
    py: { base: 2, md: 0 },
    transition: 'color 0.15s ease',
    _hover: { color: 'terracota.600', textDecoration: 'none' },
  } as const;

  if (interno) {
    return (
      <ChakraLink asChild {...estilos}>
        <NextLink href={href} onClick={onClick}>
          {label}
        </NextLink>
      </ChakraLink>
    );
  }
  return (
    <ChakraLink href={href} onClick={onClick} {...estilos}>
      {label}
    </ChakraLink>
  );
}

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="50"
      bg="header.bg"
      backdropFilter="saturate(140%) blur(10px)"
      borderBottomWidth="1px"
      borderColor="border.muted"
    >
      <Container maxW="6xl" py={{ base: 3, md: 4 }}>
        <Flex align="center" justify="space-between" gap={4}>
          <ChakraLink
            asChild
            fontFamily="heading"
            fontSize={{ base: '22px', md: '26px' }}
            fontWeight="600"
            letterSpacing="0.14em"
            color="fg"
            textDecoration="none"
            _hover={{ textDecoration: 'none', color: 'terracota.600' }}
          >
            <NextLink href="/" onClick={cerrar}>
              ANTIAN
            </NextLink>
          </ChakraLink>

          {/* Navegación de escritorio */}
          <HStack gap={6} display={{ base: 'none', md: 'flex' }}>
            {enlaces.map((e) => (
              <EnlaceNav key={e.href} {...e} />
            ))}
            <Button
              asChild
              colorPalette="whatsapp"
              size="sm"
              rounded="full"
              fontWeight="bold"
            >
              <a
                href={linkWhatsApp('¡Hola ANTIAN! Quiero hacer un pedido.')}
                target="_blank"
                rel="noopener"
              >
                Pedir por WhatsApp
              </a>
            </Button>
            <ColorModeToggle />
          </HStack>

          {/* Controles móviles */}
          <HStack gap={1} display={{ base: 'flex', md: 'none' }}>
            <ColorModeToggle />
            <IconButton
              aria-label="Abrir menú"
              variant="ghost"
              color="fg"
              onClick={() => setAbierto((v) => !v)}
            >
              <Box as="span" fontSize="22px" lineHeight="1">
                {abierto ? '✕' : '☰'}
              </Box>
            </IconButton>
          </HStack>
        </Flex>

        {/* Panel móvil */}
        {abierto && (
          <Stack gap={1} pt={4} pb={2} display={{ base: 'flex', md: 'none' }}>
            {enlaces.map((e) => (
              <EnlaceNav key={e.href} {...e} onClick={cerrar} />
            ))}
            <Button
              asChild
              colorPalette="whatsapp"
              size="sm"
              rounded="full"
              fontWeight="bold"
              mt={2}
              alignSelf="start"
            >
              <a
                href={linkWhatsApp('¡Hola ANTIAN! Quiero hacer un pedido.')}
                target="_blank"
                rel="noopener"
                onClick={cerrar}
              >
                Pedir por WhatsApp
              </a>
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
