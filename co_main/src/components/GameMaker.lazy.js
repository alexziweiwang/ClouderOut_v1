import React, { lazy, Suspense } from 'react';

const LazyGameMaker = lazy(() => import('./GameMaker'));

const GameMaker = props => (
  <Suspense fallback={null}>
    <LazyGameMaker {...props} />
  </Suspense>
);

export default GameMaker;
