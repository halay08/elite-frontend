/**
 * Asynchronously loads the component for ForgetPasswordForm
 */

import { lazyLoad } from 'utils/loadable';

export const ForgetPasswordForm = lazyLoad(
  () => import('./ForgetPasswordForm'),
  module => module.ForgetPasswordForm,
);
