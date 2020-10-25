/**
 * Asynchronously loads the component for ResetPassword
 */

import { lazyLoad } from 'utils/loadable';

export const ResetPassword = lazyLoad(
  () => import('./index'),
  module => module.ResetPassword,
);
