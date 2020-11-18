import { lazyLoad } from 'utils/loadable';
export default lazyLoad(
  () => import('./Sidebar'),
  module => module.default,
);
