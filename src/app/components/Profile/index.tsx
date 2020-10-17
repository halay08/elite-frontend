import { lazyLoad } from 'utils/loadable';

export const ProfileTab = lazyLoad(
  () => import('./ProfileTab'),
  module => module.default,
);
