import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { getProductos } from '@/lib/supabase';
import { CATEGORIAS } from '@/lib/types';
import { linkWhatsApp } from '@/lib/whatsapp';
import ProductCard from '@/components/ProductCard';
import { Eyebrow, SectionTitle } from '@/components/ui';

export const dynamic = 'force-dynamic';

const porQue = [
  { titulo: 'Sin apuro', texto: 'Cada frasco y cada alfajor se hace a mano, en tandas chicas.' },
  { titulo: 'Ingredientes reales', texto: 'Materia prima seleccionada, sin conservantes innecesarios.' },
  { titulo: 'A pedido', texto: 'Producimos lo que nos pedís: siempre fresco, nunca de góndola.' },
];

const pasos = [
  { num: '1', titulo: 'Elegí', texto: 'Mirá el catálogo y armá tu pedido: productos sueltos o combos.' },
  { num: '2', titulo: 'Escribinos', texto: 'Tocá el botón de WhatsApp: te confirmamos disponibilidad y total.' },
  { num: '3', titulo: 'Recibilo', texto: 'Coordinamos entrega o retiro. ¡Y a disfrutar!' },
];

const resenas = [
  { texto: 'Los alfajores son otra cosa: se nota lo casero.', autor: '— Cliente ANTIAN' },
  { texto: 'El combo de conservas fue el regalo perfecto.', autor: '— Cliente ANTIAN' },
  { texto: 'Pedí una torta y superó lo que esperaba.', autor: '— Cliente ANTIAN' },
];

const faqs = [
  {
    q: '¿Cómo hago un pedido?',
    a: 'Elegís los productos en la web y nos escribís por WhatsApp con el botón verde. Te confirmamos disponibilidad, total y entrega.',
  },
  {
    q: '¿Hacen envíos?',
    a: 'Coordinamos entrega o retiro por WhatsApp según tu zona. (Completar zonas cuando estén definidas.)',
  },
  {
    q: '¿Con cuánta anticipación pido?',
    a: 'Como todo se hace a pedido, recomendamos escribirnos con unos días de anticipación. Para combos grandes o fechas especiales, ¡cuanto antes mejor!',
  },
];

export default async function Home() {
  let destacados: Awaited<ReturnType<typeof getProductos>> = [];
  try {
    destacados = await getProductos({ destacados: true });
  } catch {
    /* sin conexión a la base todavía */
  }

  return (
    <Box as="main">
      {/* HERO */}
      <Box
        as="section"
        textAlign="center"
        py={{ base: 16, md: 24 }}
        px={4}
        bgGradient="to-b"
        gradientFrom="crema.100"
        gradientTo="terracota.50"
        _dark={{ gradientFrom: '#211d19', gradientTo: '#2b1710' }}
        borderBottomWidth="1px"
        borderColor="border.muted"
      >
        <Container maxW="3xl">
          <Eyebrow color="terracota.fg">Hecho a mano · Por pedido</Eyebrow>
          <Heading
            as="h1"
            fontFamily="heading"
            fontWeight="700"
            letterSpacing="0.1em"
            lineHeight="1.05"
            fontSize={{ base: '48px', md: '72px' }}
            mt={3}
          >
            ANTIAN
          </Heading>
          <Text fontSize={{ base: '24px', md: '30px' }} letterSpacing="0.4em" my={3} aria-hidden>
            🍴 🔪 🥄
          </Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="fg.muted" maxW="xl" mx="auto" mt={2}>
            Conservas y pastelería 100% artesanal. Alfajores, frascos, tortas y combos pensados para
            regalar(te).
          </Text>
          <Flex justify="center" gap={3} mt={8} wrap="wrap">
            <Button
              asChild
              colorPalette="whatsapp"
              size="lg"
              rounded="full"
              fontWeight="bold"
            >
              <a
                href={linkWhatsApp('¡Hola ANTIAN! Quiero hacer un pedido.')}
                target="_blank"
                rel="noopener"
              >
                Hacer mi pedido
              </a>
            </Button>
            <Button asChild variant="outline" colorPalette="terracota" size="lg" rounded="full" fontWeight="bold">
              <NextLink href="/productos/combos">Ver el catálogo</NextLink>
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* DESTACADOS */}
      {destacados.length > 0 && (
        <Box as="section" py={{ base: 14, md: 20 }}>
          <Container maxW="6xl">
            <Eyebrow>Los elegidos</Eyebrow>
            <SectionTitle>Combos y destacados</SectionTitle>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
              {destacados.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      )}

      {/* CATEGORÍAS */}
      <Box as="section" pt={destacados.length ? 0 : { base: 14, md: 20 }} pb={{ base: 14, md: 20 }}>
        <Container maxW="6xl">
          <Eyebrow>Nuestro almacén</Eyebrow>
          <SectionTitle>¿Qué estás buscando?</SectionTitle>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6}>
            {CATEGORIAS.map((c) => (
              <ChakraLink
                key={c.slug}
                asChild
                _hover={{ textDecoration: 'none' }}
                role="group"
              >
                <NextLink href={`/productos/${c.slug}`}>
                  <Flex
                    direction="column"
                    gap={2}
                    h="100%"
                    bg="bg.panel"
                    borderWidth="1px"
                    borderColor="border.muted"
                    rounded="card"
                    p={6}
                    transition="transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease"
                    _groupHover={{
                      transform: 'translateY(-4px)',
                      boxShadow: '0 14px 30px rgba(33,29,25,0.12)',
                      borderColor: 'terracota.300',
                    }}
                  >
                    <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="xl" color="fg">
                      {c.nombre}
                    </Heading>
                    <Text fontSize="sm" color="fg.muted">
                      {c.descripcion}
                    </Text>
                    <Text mt="auto" pt={2} fontWeight="bold" color="terracota.fg">
                      Ver productos →
                    </Text>
                  </Flex>
                </NextLink>
              </ChakraLink>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* POR QUÉ ANTIAN */}
      <Box as="section" bg="oliva.50" py={{ base: 14, md: 20 }}>
        <Container maxW="6xl">
          <Eyebrow>Por qué ANTIAN</Eyebrow>
          <SectionTitle>Artesanal de verdad</SectionTitle>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {porQue.map((f) => (
              <Box
                key={f.titulo}
                bg="bg.panel"
                borderWidth="1px"
                borderColor="border.muted"
                rounded="card"
                p={7}
              >
                <Text fontFamily="heading" fontSize="30px" color="terracota.fg" lineHeight="1">
                  ✦
                </Text>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="xl" mt={3} mb={2}>
                  {f.titulo}
                </Heading>
                <Text color="fg.muted">{f.texto}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CÓMO PEDIR */}
      <Box as="section" id="como-pedir" py={{ base: 14, md: 20 }}>
        <Container maxW="6xl">
          <Eyebrow>Simple y directo</Eyebrow>
          <SectionTitle>Cómo pedir</SectionTitle>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {pasos.map((p) => (
              <Box
                key={p.num}
                borderWidth="1.5px"
                borderStyle="dashed"
                borderColor="border"
                rounded="card"
                p={7}
              >
                <Flex
                  align="center"
                  justify="center"
                  w={12}
                  h={12}
                  rounded="full"
                  bg="terracota.muted"
                  color="terracota.fg"
                  fontFamily="heading"
                  fontSize="24px"
                  fontWeight="700"
                >
                  {p.num}
                </Flex>
                <Heading as="h3" fontFamily="heading" fontWeight="600" fontSize="xl" mt={4} mb={2}>
                  {p.titulo}
                </Heading>
                <Text color="fg.muted">{p.texto}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* RESEÑAS */}
      <Box as="section" bg="bg.subtle" py={{ base: 14, md: 20 }}>
        <Container maxW="6xl">
          <Eyebrow>Opiniones</Eyebrow>
          <SectionTitle>Lo que dicen nuestros clientes</SectionTitle>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {resenas.map((r, i) => (
              <Box
                key={i}
                bg="bg.panel"
                borderLeftWidth="4px"
                borderColor="oliva.500"
                rounded="0 12px 12px 0"
                p={6}
              >
                <Text color="terracota.500" letterSpacing="2px" fontSize="lg">
                  ★★★★★
                </Text>
                <Text fontStyle="italic" mt={2}>
                  “{r.texto}”
                </Text>
                <Text mt={3} fontWeight="bold" fontSize="sm">
                  {r.autor}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box as="section" py={{ base: 14, md: 20 }}>
        <Container maxW="3xl">
          <Eyebrow>Dudas frecuentes</Eyebrow>
          <SectionTitle>Preguntas frecuentes</SectionTitle>
          <Stack gap={0}>
            {faqs.map((f) => (
              <Box
                key={f.q}
                as="details"
                borderBottomWidth="1px"
                borderColor="border.muted"
                py={4}
                css={{ '& summary': { cursor: 'pointer', listStyle: 'none' } }}
              >
                <Flex as="summary" align="center" justify="space-between" gap={4}>
                  <Text as="span" fontWeight="bold" fontSize="lg">
                    {f.q}
                  </Text>
                  <Text as="span" color="terracota.500" fontSize="xl">
                    +
                  </Text>
                </Flex>
                <Text color="fg.muted" pt={3}>
                  {f.a}
                </Text>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
