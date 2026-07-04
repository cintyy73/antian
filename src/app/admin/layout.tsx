import { headers } from 'next/headers';

export const metadata = { title: 'Panel ANTIAN', robots: { index: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  headers(); // fuerza renderizado dinámico (cookies por request)
  return <>{children}</>;
}
