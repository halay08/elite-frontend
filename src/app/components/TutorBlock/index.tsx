import { lazyLoad } from 'utils/loadable';
export const TutorBlock = lazyLoad(
  () => import('./TutorBlock'),
  module => module.default,
);
