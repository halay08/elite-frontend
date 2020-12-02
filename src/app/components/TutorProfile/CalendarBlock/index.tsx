import { lazyLoad } from 'utils/loadable';
export default lazyLoad(
  () => import('./CalendarBlock'),
  module => module.default,
);
