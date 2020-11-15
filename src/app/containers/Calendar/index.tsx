import { lazyLoad } from 'utils/loadable';

export const Calendar = lazyLoad(
  () => import('./Calendar'),
  module => module.Calendar,
);
