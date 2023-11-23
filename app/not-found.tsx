import { Metadata } from 'next';

import NotFoundRoot from './components/NotFound/not-found-root';

export const metadata: Metadata = {
  title: 'Error 404 | Daily Manage',
  description: 'Página não encontrada.',
};

export default function NotFound() {
  return (
    <>
      <title>Error 404 | Daily Manage</title>
      <NotFoundRoot />
    </>
  );
}
