export type Notification = {
  id: string;
  message: string;
  read: boolean;
};

const notificationData: Notification[] = [
  {
    id: '1000',
    message: 'You have an upcoming session',
    read: false,
  },
  {
    id: '1001',
    message: 'You have an upcoming session',
    read: true,
  },
  {
    id: '1002',
    message: 'You have an upcoming session',
    read: false,
  },
  {
    id: '1003',
    message: 'You have an upcoming session',
    read: true,
  },
  {
    id: '1004',
    message: 'You have an upcoming session',
    read: true,
  },
  {
    id: '1005',
    message: 'You have an upcoming session',
    read: true,
  },
  {
    id: '1006',
    message: 'You have an upcoming session',
    read: true,
  },
  {
    id: '1007',
    message: 'You have an upcoming session',
    read: true,
  },
  {
    id: '1008',
    message: 'You have an upcoming session',
    read: true,
  },
  {
    id: '1009',
    message: 'You have an upcoming session',
    read: true,
  },
];
export default notificationData;
