import { Link as ChakraLink } from '@chakra-ui/react';
import { linkWhatsApp } from '@/lib/whatsapp';

export default function WhatsappFab() {
  return (
    <ChakraLink
      href={linkWhatsApp('¡Hola ANTIAN! Quiero hacer un pedido.')}
      target="_blank"
      rel="noopener"
      aria-label="Pedir por WhatsApp"
      position="fixed"
      right={{ base: '16px', md: '22px' }}
      bottom={{ base: '16px', md: '22px' }}
      zIndex="60"
      w="58px"
      h="58px"
      rounded="full"
      bg="whatsapp.500"
      color="white"
      display="grid"
      placeItems="center"
      fontSize="28px"
      boxShadow="0 8px 22px rgba(31,170,83,0.45)"
      transition="transform 0.15s ease, background 0.15s ease"
      _hover={{ bg: 'whatsapp.600', transform: 'translateY(-2px)', textDecoration: 'none' }}
      focusRing="none"
    >
      ✆
    </ChakraLink>
  );
}
