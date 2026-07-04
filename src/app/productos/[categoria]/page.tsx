import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Box, Button, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { getProductos } from '@/lib/supabase';
import { CATEGORIAS, Categoria } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import { Eyebrow } from '@/components/ui';
import { linkWhatsApp } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';

type Props = { params: { categoria: string } };

export function generateMetadata({ params }: Props): Metadata {
  const cat = CATEGORIAS.find((c) => c.slug === params.categoria);
  if (!cat) return {};
  return {
    title: `${cat.nombre} artesanales`,
    description: `${cat.descripcion} Pedidos por WhatsApp.`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const cat = CATEGORIAS.find((c) => c.slug === params.categoria);
  if (!cat) notFound();

  let productos: Awaited<ReturnType<typeof getProductos>> = [];
  try {
    productos = await getProductos({ categoria: cat.slug as Categoria });
  } catch {
    /* base sin configurar */
  }

  return (
    <Box as="main">
      <Box
        as="section"
        textAlign="center"
        py={{ base: 12, md: 16 }}
        px={4}
        bgGradient="to-b"
        gradientFrom="crema.100"
        gradientTo="terracota.50"
        _dark={{ gradientFrom: '#211d19', gradientTo: '#2b1710' }}
        borderBottomWidth="1px"
        borderColor="border.muted"
      >
        <Container maxW="3xl">
          <Eyebrow color="terracota.fg">ANTIAN · Artesanal</Eyebrow>
          <Heading
            as="h1"
            fontFamily="heading"
            fontWeight="700"
            fontSize={{ base: '36px', md: '52px' }}
            mt={2}
          >
            {cat.nombre}
          </Heading>
          <Text color="fg.muted" mt={3} maxW="xl" mx="auto">
            {cat.descripcion}
          </Text>
        </Container>
      </Box>

      <Box as="section" py={{ base: 14, md: 20 }}>
        <Container maxW="6xl">
          {productos.length === 0 ? (
            <Box textAlign="center" py={10}>
              <Heading as="h2" fontFamily="heading" fontWeight="600" fontSize="2xl" mb={2}>
                Muy pronto 🍴
              </Heading>
              <Text color="fg.muted">
                Estamos cocinando esta sección. Mientras tanto, consultanos directo:
              </Text>
              <Button
                asChild
                colorPalette="whatsapp"
                size="lg"
                rounded="full"
                fontWeight="bold"
                mt={6}
              >
                <a
                  href={linkWhatsApp(
                    `¡Hola ANTIAN! Quería consultar por ${cat.nombre.toLowerCase()}.`,
                  )}
                  target="_blank"
                  rel="noopener"
                >
                  Consultar por WhatsApp
                </a>
              </Button>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
              {productos.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>
    </Box>
  );
}
