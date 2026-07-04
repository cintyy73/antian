import { Heading, Text, type HeadingProps, type TextProps } from '@chakra-ui/react';

/** Etiqueta pequeña en mayúsculas sobre los títulos de sección. */
export function Eyebrow(props: TextProps) {
  return (
    <Text
      as="span"
      display="inline-block"
      fontSize="xs"
      fontWeight="bold"
      letterSpacing="0.22em"
      textTransform="uppercase"
      color="oliva.600"
      {...props}
    />
  );
}

/** Título de sección con la tipografía serif de la marca. */
export function SectionTitle(props: HeadingProps) {
  return (
    <Heading
      as="h2"
      fontFamily="heading"
      fontWeight="600"
      lineHeight="1.15"
      fontSize={{ base: '28px', md: '40px' }}
      mt={2}
      mb={7}
      {...props}
    />
  );
}
