import './globals.scss';

import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import NavRoot from './components/Navbar/nav-root';
import QueryClientProviderHandler from './components/QueryClientProviderHandler';
import UnloadProvider from './providers/unload-provider';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Daily Manage',
  description: 'Aplicação que auxilia na criação de formulários rotineiros',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-light-100 dark:bg-zinc-900`}>
        <ToastContainer icon={true} limit={3} />
        <QueryClientProviderHandler>
          <NavRoot />
          {children}
          <UnloadProvider />
        </QueryClientProviderHandler>
      </body>
    </html>
  );
}
