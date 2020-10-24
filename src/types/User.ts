export type User = {
  email?: string;
  name?: string;
  phoneNumber?: string;
  surname?: string;
  avatar?: string;
  shortIntro?: string;
  createdAt?: number;
  coins: number;
  level: string;
  profileCompleted: number;
  sessions: {
    coming: number;
    completed: number;
  };
};

export type SignUpUser = {
  role: string;
  email: string;
  uid: string;
  createdAt: string;
};

export const mockUser: User = {
  email: 'mock@test.com',
  name: 'User',
  surname: 'Mock',
  phoneNumber: '0123456789',
  shortIntro: 'this is a fake user',
  avatar:
    'https://lh3.googleusercontent.com/a-/AOh14GjyuVvwBsYXJ5mkY6dTG414E2Mfbk2fw9MYEyoe=s96-c',
  createdAt: 1603375420000,
  level: 'Gold',
  coins: 1,
  sessions: {
    coming: 5,
    completed: 5,
  },
  profileCompleted: 0,
};

export const initUser: User = {
  email: '',
  name: '',
  surname: '',
  phoneNumber: '',
  shortIntro: '',
  avatar: '',
  createdAt: 0,
  level: '',
  coins: 0,
  sessions: {
    coming: 0,
    completed: 0,
  },
  profileCompleted: 0,
};
