'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Box,
  Button,
  Checkbox,
  Field,
  Image,
  Input,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { guardarProducto } from '@/app/admin/actions';
import { CATEGORIAS, imagenesProducto, Producto } from '@/lib/types';

function BotonGuardar() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      colorPalette="terracota"
      rounded="full"
      fontWeight="bold"
      loading={pending}
      loadingText="Guardando…"
      alignSelf="start"
      mt={2}
    >
      Guardar producto
    </Button>
  );
}

export default function ProductForm({ producto }: { producto?: Producto }) {
  const [state, action] = useFormState(guardarProducto, undefined);
  const fotosExistentes = producto ? imagenesProducto(producto) : [];

  return (
    <form action={action}>
      <Stack gap={5} maxW="560px">
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

        {producto && <input type="hidden" name="id" value={producto.id} />}

        <Field.Root required>
          <Field.Label>
            Nombre <Field.RequiredIndicator />
          </Field.Label>
          <Input
            name="nombre"
            defaultValue={producto?.nombre}
            required
            placeholder="Alfajores de maicena"
            bg="bg.panel"
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label>
            Categoría <Field.RequiredIndicator />
          </Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field name="categoria" defaultValue={producto?.categoria ?? ''} bg="bg.panel">
              <option value="" disabled>
                Elegir…
              </option>
              {CATEGORIAS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.nombre}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label>Presentación (opcional)</Field.Label>
          <Input
            name="presentacion"
            defaultValue={producto?.presentacion ?? ''}
            placeholder="Caja x6 · Frasco 360g · Porción"
            bg="bg.panel"
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label>
            Precio (ARS) <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type="number"
            name="precio"
            min={0}
            step={1}
            defaultValue={producto?.precio}
            required
            bg="bg.panel"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Descripción</Field.Label>
          <Textarea
            name="descripcion"
            defaultValue={producto?.descripcion}
            placeholder="Contale al cliente qué lleva y por qué está tan rico."
            minH="110px"
            bg="bg.panel"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Fotos (la primera es la principal)</Field.Label>

          {fotosExistentes.length > 0 && (
            <Stack gap={2} mb={3} w="100%">
              <Text fontSize="sm" color="fg.muted">
                Fotos actuales — destildá las que quieras quitar:
              </Text>
              <SimpleGrid columns={{ base: 3, sm: 4 }} gap={3}>
                {fotosExistentes.map((url, idx) => (
                  <Checkbox.Root
                    key={url}
                    name="imagenes_existentes"
                    value={url}
                    defaultChecked
                    colorPalette="oliva"
                  >
                    <Checkbox.HiddenInput />
                    <Stack gap={1} align="center">
                      <Box position="relative" w="100%">
                        <Image
                          src={url}
                          alt={`Foto ${idx + 1}`}
                          w="100%"
                          aspectRatio={1}
                          objectFit="cover"
                          rounded="md"
                          borderWidth="1px"
                          borderColor="border.muted"
                        />
                        {idx === 0 && (
                          <Box
                            position="absolute"
                            top="4px"
                            left="4px"
                            fontSize="10px"
                            fontWeight="bold"
                            bg="terracota.solid"
                            color="terracota.contrast"
                            rounded="sm"
                            px={1.5}
                          >
                            Principal
                          </Box>
                        )}
                      </Box>
                      <Checkbox.Control />
                    </Stack>
                  </Checkbox.Root>
                ))}
              </SimpleGrid>
            </Stack>
          )}

          <Input type="file" name="imagenes" accept="image/*" multiple p={1.5} bg="bg.panel" />
          <Field.HelperText>
            Podés subir varias a la vez (hasta 8, máx. 4 MB cada una). Se agregan después de las actuales.
          </Field.HelperText>
        </Field.Root>

        <Checkbox.Root name="destacado" value="on" defaultChecked={producto?.destacado} colorPalette="terracota">
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Destacado (aparece en la portada)</Checkbox.Label>
        </Checkbox.Root>

        <Checkbox.Root
          name="disponible"
          value="on"
          defaultChecked={producto ? producto.disponible : true}
          colorPalette="oliva"
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Disponible para pedir</Checkbox.Label>
        </Checkbox.Root>

        <BotonGuardar />
      </Stack>
    </form>
  );
}
