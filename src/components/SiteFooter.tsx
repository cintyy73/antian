import { Box, Container, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import { linkWhatsApp } from '@/lib/whatsapp';

export default function SiteFooter() {
  return (
    <Box as="footer" id="contacto" bg="oliva.700" color="crema.100" mt={0} pt={14} pb={24}>
      <Container maxW="6xl">
        <Stack gap={3}>
          <Text fontFamily="heading" fontSize="28px" letterSpacing="0.14em" color="crema.50">
            ANTIAN
          </Text>
          <Text color="crema.200">
            Conservas y pastelería artesanal · Combos y pedidos personalizados
          </Text>
          <Text color="crema.200">
            Pedidos:{' '}
            <ChakraLink
              href={linkWhatsApp('¡Hola ANTIAN! Quiero hacer un pedido.')}
              color="crema.50"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ color: 'white' }}
              target="_blank"
              rel="noopener"
            >
              WhatsApp
            </ChakraLink>
            {/* Cuando tengan Instagram y perfil de Google, agregarlos acá */}
          </Text>
          <Text fontSize="sm" color="crema.300" opacity={0.85} mt={2}>
            © {new Date().getFullYear()} ANTIAN · Hecho a mano, con tiempo y sin apuro.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
