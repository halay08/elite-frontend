import { lazyLoad } from 'utils/loadable';

export const UserAvatar = lazyLoad(
  () => import('./Avatar'),
  module => module.default,
);
