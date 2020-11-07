import { lazyLoad } from 'utils/loadable';
export default lazyLoad(
  () => import('./Course'),
  module => module.default,
);
