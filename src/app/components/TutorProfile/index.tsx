import { lazyLoad } from 'utils/loadable';
export const TutorProfile = lazyLoad(
  () => import('./TutorProfile'),
  module => module.default,
);
