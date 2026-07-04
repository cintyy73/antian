'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Box,
  Button,
  Checkbox,
  Field,
  Input,
  NativeSelect,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { guardarProducto } from '@/app/admin/actions';
import { CATEGORIAS, Producto } from '@/lib/types';

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
          <Field.Label>
            Foto {producto?.imagen_url ? '(subí una nueva solo si querés reemplazarla)' : ''}
          </Field.Label>
          <Input type="file" name="imagen" accept="image/*" p={1.5} bg="bg.panel" />
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
