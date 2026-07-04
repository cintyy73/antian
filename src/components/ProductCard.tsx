import NextLink from 'next/link';
import { Button, Flex, Heading, Link as ChakraLink, Text } from '@chakra-ui/react';
import { imagenesProducto, Producto } from '@/lib/types';
import { linkWhatsApp, precioARS } from '@/lib/whatsapp';
import ImageCarousel from '@/components/ImageCarousel';

export default function ProductCard({ p }: { p: Producto }) {
  const msg = `¡Hola ANTIAN! Quiero pedir: ${p.nombre}${p.presentacion ? ` (${p.presentacion})` : ''}`;
  const fotos = imagenesProducto(p);

  return (
    <Flex
      direction="column"
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.muted"
      rounded="card"
      overflow="hidden"
      boxShadow="0 1px 2px rgba(33,29,25,0.04)"
      transition="transform 0.18s ease, box-shadow 0.18s ease"
      _hover={{ transform: 'translateY(-4px)', boxShadow: '0 14px 30px rgba(33,29,25,0.14)' }}
    >
      <ImageCarousel imagenes={fotos} alt={p.nombre} ratio={4 / 3} href={`/producto/${p.slug}`} />

      <Flex direction="column" gap={2} p={5} flex="1">
        {p.presentacion && (
          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="0.08em"
            textTransform="uppercase"
            color="oliva.600"
          >
            {p.presentacion}
          </Text>
        )}
        <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="xl" lineHeight="1.2">
          <ChakraLink asChild color="fg" _hover={{ color: 'terracota.fg', textDecoration: 'none' }}>
            <NextLink href={`/producto/${p.slug}`}>{p.nombre}</NextLink>
          </ChakraLink>
        </Heading>
        {p.descripcion && (
          <Text fontSize="sm" color="fg.muted" lineClamp={3}>
            {p.descripcion}
          </Text>
        )}
        <Text fontFamily="heading" fontSize="2xl" fontWeight="600" color="terracota.fg" mt="auto">
          {precioARS(p.precio)}
        </Text>
        <Button
          asChild
          colorPalette="whatsapp"
          size="sm"
          rounded="full"
          fontWeight="bold"
          mt={1}
        >
          <a href={linkWhatsApp(msg)} target="_blank" rel="noopener">
            Pedir por WhatsApp
          </a>
        </Button>
      </Flex>
    </Flex>
  );
}
