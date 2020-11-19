import { UniversalRouteConfig, StudentRouteConfig } from 'config/routes';

type Item = { itemKey: string; link: string };

export type SidebarItem = Item & {
  icon: string;
  subItems: Item[];
};

const items: SidebarItem[] = [
  {
    itemKey: 'dashboard',
    icon: 'dashboard',
    link: UniversalRouteConfig.dashboard,
    subItems: [],
  },
  {
    itemKey: 'tutors',
    icon: 'supervised_user_circle',
    link: '/tutors',
    subItems: [
      { itemKey: 'tutorsList', link: UniversalRouteConfig.tutor.list },
    ],
  },
  {
    itemKey: 'calendar',
    icon: 'event',
    link: UniversalRouteConfig.calendar,
    subItems: [],
  },
  {
    itemKey: 'account',
    icon: 'account_circle',
    link: '/me',
    subItems: [
      { itemKey: 'accountSettings', link: StudentRouteConfig.account.setting },
    ],
  },
];

export { items };
