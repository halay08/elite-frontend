import { lazyLoad } from 'utils/loadable';
export default lazyLoad(
  () => import('./ReviewBlock'),
  module => module.default,
);
