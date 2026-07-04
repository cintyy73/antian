'use client';

import { useFormState } from 'react-dom';
import { Box, Button, Container, Field, Heading, Input, Stack } from '@chakra-ui/react';
import { loginAction } from '../actions';

export default function LoginPage() {
  const [state, action] = useFormState(loginAction, undefined);

  return (
    <Container as="main" maxW="sm" py={{ base: 12, md: 20 }}>
      <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize="3xl" mb={6}>
        ANTIAN · Admin
      </Heading>
      <form action={action}>
        <Stack gap={4}>
          {state?.error && (
            <Box
              bg="terracota.subtle"
              color="terracota.fg"
              borderWidth="1px"
              borderColor="terracota.muted"
              rounded="md"
              px={4}
              py={3}
              fontWeight="bold"
            >
              {state.error}
            </Box>
          )}
          <Field.Root required>
            <Field.Label>Contraseña</Field.Label>
            <Input type="password" name="password" autoFocus required bg="bg.panel" />
          </Field.Root>
          <Button type="submit" colorPalette="terracota" rounded="full" fontWeight="bold">
            Entrar
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
