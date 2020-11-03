import { lazyLoad } from 'utils/loadable';

export const RecommendedTutors = lazyLoad(
  () => import('./index'),
  module => module.RecommendedTutors,
);
