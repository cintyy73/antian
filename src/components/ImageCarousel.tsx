'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { AspectRatio, Box, chakra, HStack, Image, Link as ChakraLink } from '@chakra-ui/react';

type Props = {
  imagenes: string[];
  alt: string;
  ratio?: number;
  href?: string; // si se pasa, la foto enlaza al detalle del producto
  tamano?: 'card' | 'detalle';
};

const Flecha = chakra('button', {
  base: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    rounded: 'full',
    display: 'grid',
    placeItems: 'center',
    bg: 'rgba(27,24,21,0.55)',
    color: 'white',
    lineHeight: '1',
    backdropFilter: 'blur(2px)',
    transition: 'background 0.15s ease',
    _hover: { bg: 'rgba(27,24,21,0.85)' },
  },
});

const Punto = chakra('button', {
  base: {
    h: '7px',
    rounded: 'full',
    transition: 'width 0.2s ease, background 0.2s ease',
  },
});

export default function ImageCarousel({ imagenes, alt, ratio = 4 / 3, href, tamano = 'card' }: Props) {
  const [i, setI] = useState(0);
  const n = imagenes.length;

  // Sin fotos → placeholder
  if (n === 0) {
    return (
      <AspectRatio ratio={ratio}>
        <Box
          display="grid"
          placeItems="center"
          fontSize={tamano === 'detalle' ? '72px' : '42px'}
          bg="bg.muted"
          color="fg.muted"
        >
          🍴
        </Box>
      </AspectRatio>
    );
  }

  const ir = (paso: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setI((prev) => (prev + paso + n) % n);
  };
  const irA = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setI(idx);
  };

  const foto = (
    <AspectRatio ratio={ratio}>
      <Image src={imagenes[i]} alt={alt} objectFit="cover" w="100%" h="100%" />
    </AspectRatio>
  );

  const tamFlecha = tamano === 'detalle' ? '40px' : '32px';
  const fsFlecha = tamano === 'detalle' ? 'xl' : 'md';

  return (
    <Box position="relative" overflow="hidden" css={{ userSelect: 'none' }}>
      {href ? (
        <ChakraLink asChild display="block">
          <NextLink href={href}>{foto}</NextLink>
        </ChakraLink>
      ) : (
        foto
      )}

      {n > 1 && (
        <>
          <Flecha
            type="button"
            aria-label="Foto anterior"
            onClick={(e) => ir(-1, e)}
            left="8px"
            w={tamFlecha}
            h={tamFlecha}
            fontSize={fsFlecha}
          >
            ‹
          </Flecha>
          <Flecha
            type="button"
            aria-label="Foto siguiente"
            onClick={(e) => ir(1, e)}
            right="8px"
            w={tamFlecha}
            h={tamFlecha}
            fontSize={fsFlecha}
          >
            ›
          </Flecha>

          <HStack
            position="absolute"
            bottom="8px"
            left="50%"
            transform="translateX(-50%)"
            gap={1.5}
            px={2}
            py={1}
            rounded="full"
            bg="rgba(27,24,21,0.35)"
            backdropFilter="blur(2px)"
          >
            {imagenes.map((_, idx) => (
              <Punto
                key={idx}
                type="button"
                aria-label={`Ir a la foto ${idx + 1}`}
                onClick={(e) => irA(idx, e)}
                w={idx === i ? '18px' : '7px'}
                bg={idx === i ? 'white' : 'rgba(255,255,255,0.55)'}
              />
            ))}
          </HStack>
        </>
      )}
    </Box>
  );
}
