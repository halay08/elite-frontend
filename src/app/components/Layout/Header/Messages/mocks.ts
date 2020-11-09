import { User, mockUser } from 'types/User';

export type Message = {
  id: number;
  message: string;
  user: User;
  read: boolean;
};

const messageData: Message[] = [
  {
    id: 201,
    message:
      'Hey man! Whatsapp? Go to the office tomorrow! Go to the office tomorrow!  Go to the office tomorrow!',
    read: false,
    user: mockUser,
  },
  {
    id: 202,
    message:
      'I am fine, what about you? I am fine, what about you? I am fine, what about you?',
    read: false,
    user: mockUser,
  },
  {
    id: 203,
    message: 'Call me when you are free!',
    read: false,
    user: mockUser,
  },
  {
    id: 204,
    message: 'Send your contact details!',
    read: true,
    user: mockUser,
  },
  {
    id: 205,
    message: 'Go to the office tomorrow!',
    read: true,
    user: mockUser,
  },
  {
    id: 206,
    message: 'Go to the office tomorrow!',
    read: true,
    user: mockUser,
  },
  {
    id: 207,
    message: 'Go to the office tomorrow!',
    read: true,
    user: mockUser,
  },
  {
    id: 208,
    message: 'Go to the office tomorrow!',
    read: true,
    user: mockUser,
  },
  {
    id: 209,
    message: 'Go to the office tomorrow!',
    read: true,
    user: mockUser,
  },
];
export default messageData;
