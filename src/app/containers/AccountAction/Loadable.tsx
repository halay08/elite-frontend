/**
 * Asynchronously loads the component for AccountAction
 */

import { lazyLoad } from 'utils/loadable';

export const AccountAction = lazyLoad(
  () => import('./index'),
  module => module.AccountAction,
);
