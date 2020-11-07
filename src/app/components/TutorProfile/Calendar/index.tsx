import { lazyLoad } from 'utils/loadable';
export default lazyLoad(
  () => import('./Calendar'),
  module => module.default,
);
