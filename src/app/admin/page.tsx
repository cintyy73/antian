import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  Table,
  Text,
} from '@chakra-ui/react';
import { sesionValida } from '@/lib/auth';
import { getTodosAdmin } from '@/lib/supabase';
import { precioARS } from '@/lib/whatsapp';
import { alternarDisponible, eliminarProducto, logoutAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  if (!sesionValida()) redirect('/admin/login');

  let productos: Awaited<ReturnType<typeof getTodosAdmin>> = [];
  let errorDb = false;
  try {
    productos = await getTodosAdmin();
  } catch {
    errorDb = true;
  }

  return (
    <Container as="main" maxW="5xl" py={{ base: 8, md: 12 }}>
      <Flex align="center" justify="space-between" gap={3} wrap="wrap" mb={7}>
        <Heading as="h1" fontFamily="heading" fontWeight="600" fontSize="3xl">
          Productos
        </Heading>
        <Flex gap={2.5}>
          <Button asChild colorPalette="terracota" size="sm" rounded="full" fontWeight="bold">
            <NextLink href="/admin/productos/nuevo">+ Nuevo producto</NextLink>
          </Button>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm" rounded="full">
              Salir
            </Button>
          </form>
        </Flex>
      </Flex>

      {errorDb && (
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
          No pude conectar con Supabase. Revisá las variables NEXT_PUBLIC_SUPABASE_URL y
          SUPABASE_SERVICE_ROLE_KEY en el archivo .env, y que hayas corrido el script
          supabase/schema.sql.
        </Box>
      )}

      {!errorDb && productos.length === 0 && (
        <Text>
          Todavía no hay productos.{' '}
          <ChakraLink asChild color="terracota.fg" fontWeight="bold">
            <NextLink href="/admin/productos/nuevo">Cargá el primero →</NextLink>
          </ChakraLink>
        </Text>
      )}

      {productos.length > 0 && (
        <Box overflowX="auto" borderWidth="1px" borderColor="border.muted" rounded="card">
          <Table.Root size="sm" bg="bg.panel">
            <Table.Header>
              <Table.Row bg="oliva.700">
                {['Foto', 'Producto', 'Categoría', 'Precio', 'Estado', 'Acciones'].map((h) => (
                  <Table.ColumnHeader key={h} color="crema.50" fontWeight="bold" py={3}>
                    {h}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {productos.map((p) => (
                <Table.Row key={p.id}>
                  <Table.Cell>
                    {p.imagen_url ? (
                      <Image
                        src={p.imagen_url}
                        alt=""
                        w="54px"
                        h="40px"
                        objectFit="cover"
                        rounded="sm"
                        borderWidth="1px"
                        borderColor="border.muted"
                      />
                    ) : (
                      '—'
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontWeight="bold">{p.nombre}</Text>
                    {p.presentacion && (
                      <Text fontSize="xs" color="fg.muted">
                        {p.presentacion}
                      </Text>
                    )}
                    {p.destacado && (
                      <Text fontSize="xs" color="fg.muted">
                        ⭐ Destacado
                      </Text>
                    )}
                  </Table.Cell>
                  <Table.Cell textTransform="capitalize">{p.categoria}</Table.Cell>
                  <Table.Cell>{precioARS(p.precio)}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={p.disponible ? 'oliva' : 'terracota'}
                      variant="subtle"
                      rounded="full"
                      px={2.5}
                    >
                      {p.disponible ? 'Disponible' : 'Pausado'}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={2} wrap="wrap">
                      <Button asChild variant="outline" size="xs" rounded="full">
                        <NextLink href={`/admin/productos/${p.id}/editar`}>Editar</NextLink>
                      </Button>
                      <form action={alternarDisponible}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="actual" value={String(p.disponible)} />
                        <Button type="submit" variant="outline" colorPalette="oliva" size="xs" rounded="full">
                          {p.disponible ? 'Pausar' : 'Activar'}
                        </Button>
                      </form>
                      <form action={eliminarProducto}>
                        <input type="hidden" name="id" value={p.id} />
                        <Button type="submit" variant="outline" colorPalette="terracota" size="xs" rounded="full">
                          Borrar
                        </Button>
                      </form>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}
    </Container>
  );
}
