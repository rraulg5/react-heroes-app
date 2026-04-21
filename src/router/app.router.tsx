import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { AdminLayout } from '@/admin/pages/layouts/AdminLayout';
// import { AdminPage } from '@/admin/pages/AdminPage';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { SearchPage } from '@/heroes/pages/search/SearchPage';

/* Lazy load components */
const AdminPage = lazy(() => import('@/admin/pages/AdminPage'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/hero',
        element: <HeroPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
