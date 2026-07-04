import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import { Container, Heading, Link as ChakraLink } from '@chakra-ui/react';
import { sesionValida } from '@/lib/auth';
import ProductForm from '@/components/ProductForm';

export const dynamic = 'force-dynamic';

export default function NuevoProducto() {
  if (!sesionValida()) redirect('/admin/login');
  return (
    <Container as="main" maxW="3xl" py={{ base: 8, md: 12 }}>
      <ChakraLink asChild color="oliva.600" fontWeight="medium" _hover={{ color: 'terracota.600' }}>
        <NextLink href="/admin">← Volver</NextLink>
      </ChakraLink>
      <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize="3xl" mt={3} mb={6}>
        Nuevo producto
      </Heading>
      <ProductForm />
    </Container>
  );
}
