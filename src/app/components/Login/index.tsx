import { lazyLoad } from 'utils/loadable';

export const LoginForm = lazyLoad(
  () => import('./LoginForm'),
  module => module.default,
);
