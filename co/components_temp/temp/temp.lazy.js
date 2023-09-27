import React, { lazy, Suspense } from 'react';

const LazyTemp = lazy(() => import('./Temp'));

const Temp = props => (
  <Suspense fallback={null}>
    <LazyTemp {...props} />
  </Suspense>
);

export default Temp;
