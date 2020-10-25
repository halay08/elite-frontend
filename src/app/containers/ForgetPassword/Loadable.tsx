/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ForgetPassword = lazyLoad(
  () => import('./index'),
  module => module.ForgetPassword,
);
