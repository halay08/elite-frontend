import { lazyLoad } from 'utils/loadable';

export const Information = lazyLoad(
  () => import('./Information'),
  module => module.Information,
);

export const Tabs = lazyLoad(
  () => import('./Tabs'),
  module => module.Tabs,
);
