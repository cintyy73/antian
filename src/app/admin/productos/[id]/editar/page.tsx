import NextLink from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Container, Heading, Link as ChakraLink } from '@chakra-ui/react';
import { sesionValida } from '@/lib/auth';
import { getProductoPorId } from '@/lib/supabase';
import ProductForm from '@/components/ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditarProducto({ params }: { params: { id: string } }) {
  if (!sesionValida()) redirect('/admin/login');
  const producto = await getProductoPorId(params.id);
  if (!producto) notFound();
  return (
    <Container as="main" maxW="3xl" py={{ base: 8, md: 12 }}>
      <ChakraLink asChild color="oliva.600" fontWeight="medium" _hover={{ color: 'terracota.600' }}>
        <NextLink href="/admin">← Volver</NextLink>
      </ChakraLink>
      <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize="3xl" mt={3} mb={6}>
        Editar: {producto.nombre}
      </Heading>
      <ProductForm producto={producto} />
    </Container>
  );
}
