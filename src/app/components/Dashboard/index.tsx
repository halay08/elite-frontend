import { lazyLoad } from 'utils/loadable';

export const Information = lazyLoad(
  () => import('./Information'),
  module => module.Information,
);
