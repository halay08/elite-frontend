import { lazyLoad } from 'utils/loadable';

export const Layout = lazyLoad(
  () => import('./Layout'),
  module => module.Layout,
);
