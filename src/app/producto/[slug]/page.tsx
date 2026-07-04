import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Heading,
  Link as ChakraLink,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { getProductoPorSlug } from '@/lib/supabase';
import { linkWhatsApp, precioARS } from '@/lib/whatsapp';
import { CATEGORIAS, imagenesProducto } from '@/lib/types';
import ImageCarousel from '@/components/ImageCarousel';

export const dynamic = 'force-dynamic';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const p = await getProductoPorSlug(params.slug);
    if (!p) return {};
    return { title: p.nombre, description: p.descripcion };
  } catch {
    return {};
  }
}

export default async function ProductoPage({ params }: Props) {
  let p = null;
  try {
    p = await getProductoPorSlug(params.slug);
  } catch {
    /* */
  }
  if (!p || !p.disponible) notFound();

  const cat = CATEGORIAS.find((c) => c.slug === p.categoria);
  const msg = `¡Hola ANTIAN! Quiero pedir: ${p.nombre}${p.presentacion ? ` (${p.presentacion})` : ''}`;

  return (
    <Box as="main" py={{ base: 10, md: 16 }}>
      <Container maxW="5xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12 }} alignItems="start">
          <Box
            bg="bg.panel"
            borderWidth="1px"
            borderColor="border.muted"
            rounded="card"
            overflow="hidden"
            boxShadow="0 10px 30px rgba(33,29,25,0.10)"
          >
            <ImageCarousel imagenes={imagenesProducto(p)} alt={p.nombre} ratio={1} tamano="detalle" />
          </Box>

          <Box>
            {cat && (
              <ChakraLink
                asChild
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="oliva.600"
                _hover={{ color: 'terracota.600', textDecoration: 'none' }}
              >
                <NextLink href={`/productos/${cat.slug}`}>← {cat.nombre}</NextLink>
              </ChakraLink>
            )}
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="700"
              fontSize={{ base: '32px', md: '44px' }}
              lineHeight="1.1"
              my={3}
            >
              {p.nombre}
            </Heading>
            {p.presentacion && (
              <Text
                fontSize="sm"
                fontWeight="bold"
                letterSpacing="0.08em"
                textTransform="uppercase"
                color="oliva.600"
              >
                {p.presentacion}
              </Text>
            )}
            <Text fontSize={{ base: 'md', md: 'lg' }} color="fg.muted" my={4}>
              {p.descripcion}
            </Text>
            <Text fontFamily="heading" fontWeight="700" fontSize="4xl" color="terracota.fg">
              {precioARS(p.precio)}
            </Text>
            <Button
              asChild
              colorPalette="whatsapp"
              size="lg"
              rounded="full"
              fontWeight="bold"
              mt={6}
            >
              <a href={linkWhatsApp(msg)} target="_blank" rel="noopener">
                Pedir por WhatsApp
              </a>
            </Button>
            <Text fontSize="sm" color="fg.subtle" mt={4}>
              Producto artesanal hecho a pedido. Confirmamos disponibilidad y entrega por WhatsApp.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
