/**
 * # router
 * ---
 * - 간단설명: /location 라우트 등록. lazy 로드 적용
 * ---
 */

import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LocationPage = lazy(() => import('../pages/LocationPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LocationPage />
      </Suspense>
    ),
  },
]);
