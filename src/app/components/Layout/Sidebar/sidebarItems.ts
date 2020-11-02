import RoutePath from 'config/routes';

type Item = { itemKey: string; link: string };

export type SidebarItem = Item & {
  icon: string;
  subItems: Item[];
};

const items: SidebarItem[] = [
  {
    itemKey: 'dashboard',
    icon: 'dashboard',
    link: RoutePath.dashboard,
    subItems: [],
  },
  {
    itemKey: 'account',
    icon: 'account_box',
    link: '/account',
    subItems: [
      { itemKey: 'accountSettings', link: RoutePath.accountSettings },
      { itemKey: 'accountTutors', link: RoutePath.accountTutors },
    ],
  },
];

export { items };
