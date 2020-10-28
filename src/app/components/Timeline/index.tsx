import { lazyLoad } from 'utils/loadable';

export const Timeline = lazyLoad(
  () => import('./Dialog'),
  module => module.default,
);
