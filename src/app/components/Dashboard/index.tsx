import { lazyLoad } from 'utils/loadable';

export const Profile = lazyLoad(
  () => import('./Profile'),
  module => module.Profile,
);
