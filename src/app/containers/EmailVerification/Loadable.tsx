/**
 * Asynchronously loads the component for EmailVerification
 */

import { lazyLoad } from 'utils/loadable';

export const EmailVerification = lazyLoad(
  () => import('./index'),
  module => module.EmailVerification,
);
