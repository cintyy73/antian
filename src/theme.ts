import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

/**
 * Sistema de diseño de ANTIAN.
 * Paleta cálida y luminosa inspirada en el logo: crema, carbón suave,
 * terracota (membrillo) y oliva. Menos oscuro que la versión original.
 */
const config = defineConfig({
  globalCss: {
    'html, body': {
      bg: 'bg',
      color: 'fg',
      fontFamily: 'body',
      lineHeight: '1.6',
    },
    '::selection': {
      bg: 'terracota.200',
      color: 'terracota.900',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Fraunces', Georgia, serif" },
        body: { value: "'Karla', system-ui, -apple-system, sans-serif" },
      },
      colors: {
        // Crema / neutro cálido (fondos y textos)
        crema: {
          50: { value: '#fdfbf6' },
          100: { value: '#f7f1e5' },
          200: { value: '#f0e8d8' },
          300: { value: '#e4d8bf' },
          400: { value: '#d8cdb6' },
          500: { value: '#c3b493' },
          600: { value: '#a89873' },
          700: { value: '#7c6f52' },
          800: { value: '#4f4736' },
          900: { value: '#2f2a22' },
          950: { value: '#211d19' },
        },
        // Terracota / membrillo (acento principal, CTA, precios)
        terracota: {
          50: { value: '#fbf3ef' },
          100: { value: '#f6e0d6' },
          200: { value: '#ecc0ad' },
          300: { value: '#e0997c' },
          400: { value: '#d0714e' },
          500: { value: '#bf5733' },
          600: { value: '#a34a2a' },
          700: { value: '#843b23' },
          800: { value: '#6a3020' },
          900: { value: '#58291d' },
          950: { value: '#30140d' },
        },
        // Oliva (acento secundario)
        oliva: {
          50: { value: '#f5f6f1' },
          100: { value: '#e6e9dc' },
          200: { value: '#ccd3ba' },
          300: { value: '#adb891' },
          400: { value: '#8f9c6f' },
          500: { value: '#737f54' },
          600: { value: '#5a6242' },
          700: { value: '#474d36' },
          800: { value: '#3a3f2e' },
          900: { value: '#333628' },
          950: { value: '#191c13' },
        },
        // Verde WhatsApp
        whatsapp: {
          50: { value: '#e9f9ef' },
          500: { value: '#1faa53' },
          600: { value: '#1b9349' },
          700: { value: '#157a3c' },
        },
      },
      radii: {
        card: { value: '14px' },
      },
    },
    semanticTokens: {
      colors: {
        // Fondos cálidos (crema en claro, marrón carbón cálido en oscuro)
        bg: {
          DEFAULT: { value: { base: '{colors.crema.50}', _dark: '#1b1815' } },
          subtle: { value: { base: '{colors.crema.100}', _dark: '#211d19' } },
          muted: { value: { base: '{colors.crema.200}', _dark: '#2a251f' } },
          emphasized: { value: { base: '{colors.crema.300}', _dark: '#332d25' } },
          panel: { value: { base: '#ffffff', _dark: '#26221d' } },
          inverted: { value: { base: '{colors.crema.950}', _dark: '{colors.crema.50}' } },
        },
        // Texto
        fg: {
          DEFAULT: { value: { base: '{colors.crema.950}', _dark: '{colors.crema.100}' } },
          muted: { value: { base: '{colors.crema.700}', _dark: '{colors.crema.500}' } },
          subtle: { value: { base: '{colors.crema.600}', _dark: '{colors.crema.600}' } },
          inverted: { value: { base: '{colors.crema.50}', _dark: '{colors.crema.950}' } },
        },
        border: {
          DEFAULT: { value: { base: '{colors.crema.400}', _dark: '#3a342b' } },
          muted: { value: { base: '{colors.crema.300}', _dark: '#332d25' } },
        },
        // Superficie translúcida del header (con blur)
        header: {
          bg: { value: { base: 'rgba(253, 251, 246, 0.85)', _dark: 'rgba(27, 24, 21, 0.82)' } },
        },
        // Paleta terracota completa (para colorPalette="terracota")
        terracota: {
          solid: { value: { base: '{colors.terracota.600}', _dark: '{colors.terracota.500}' } },
          contrast: { value: '#ffffff' },
          fg: { value: { base: '{colors.terracota.700}', _dark: '{colors.terracota.300}' } },
          muted: { value: { base: '{colors.terracota.100}', _dark: '{colors.terracota.900}' } },
          subtle: { value: { base: '{colors.terracota.50}', _dark: '{colors.terracota.950}' } },
          emphasized: { value: { base: '{colors.terracota.700}', _dark: '{colors.terracota.400}' } },
          focusRing: { value: { base: '{colors.terracota.500}', _dark: '{colors.terracota.400}' } },
        },
        oliva: {
          solid: { value: { base: '{colors.oliva.600}', _dark: '{colors.oliva.500}' } },
          contrast: { value: '#ffffff' },
          fg: { value: { base: '{colors.oliva.700}', _dark: '{colors.oliva.300}' } },
          muted: { value: { base: '{colors.oliva.100}', _dark: '{colors.oliva.900}' } },
          subtle: { value: { base: '{colors.oliva.50}', _dark: '{colors.oliva.950}' } },
          emphasized: { value: { base: '{colors.oliva.700}', _dark: '{colors.oliva.400}' } },
          focusRing: { value: { base: '{colors.oliva.500}', _dark: '{colors.oliva.400}' } },
        },
        whatsapp: {
          solid: { value: '{colors.whatsapp.500}' },
          contrast: { value: '#ffffff' },
          fg: { value: { base: '{colors.whatsapp.700}', _dark: '{colors.whatsapp.500}' } },
          muted: { value: { base: '{colors.whatsapp.50}', _dark: '#12351f' } },
          subtle: { value: { base: '{colors.whatsapp.50}', _dark: '#0f2a19' } },
          emphasized: { value: { base: '{colors.whatsapp.600}', _dark: '{colors.whatsapp.600}' } },
          focusRing: { value: '{colors.whatsapp.500}' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
