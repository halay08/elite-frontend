import { lazyLoad } from 'utils/loadable';
export default lazyLoad(
  () => import('./VideoIntro'),
  module => module.default,
);
