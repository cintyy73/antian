import type { Metadata } from 'next';
import { Provider } from './provider';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import WhatsappFab from '@/components/WhatsappFab';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://antian.com.ar';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'ANTIAN · Conservas y Pastelería Artesanal',
    template: '%s · ANTIAN',
  },
  description:
    'Conservas, alfajores y pastelería 100% artesanal. Combos y pedidos personalizados. Pedí el tuyo por WhatsApp.',
  openGraph: {
    title: 'ANTIAN · Conservas y Pastelería Artesanal',
    description: 'Todo artesanal, hecho a pedido. Conservas, alfajores, pastelería y combos.',
    type: 'website',
    locale: 'es_AR',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'ANTIAN',
  description: 'Conservas y pastelería artesanal. Alfajores, combos y pedidos personalizados.',
  url: SITE,
  servesCuisine: 'Artesanal',
  priceRange: '$$',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Karla:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Provider>
          <Navbar />
          {children}
          <SiteFooter />
          <WhatsappFab />
        </Provider>
      </body>
    </html>
  );
}
