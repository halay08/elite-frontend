export type User = {
  email?: string;
  phoneNumber?: string;
  name?: string;
  surname?: string;
  displayName?: string;
  avatar?: string;
  photoURL?: string;
  shortIntro?: string;
  videoIntro?: string;
  createdAt?: number;
  coins: number;
  level?: string;
  profileCompleted: number;
  sessions: {
    coming: number;
    completed: number;
  };

  country?: any;
};

export type SignUpUser = {
  role: string;
  email: string;
  uid: string;
  createdAt: string;
};

export const mockUser: User = {
  email: 'mock@test.com',
  name: 'Khiem',
  surname: 'Le',
  phoneNumber: '0123456789',
  shortIntro: 'this is a fake user',
  avatar: 'https://www.w3schools.com/w3css/img_avatar3.png',
  createdAt: 1603375420000,
  videoIntro: 'https://www.youtube.com/watch?v=uKxyLmbOc0Q',
  level: 'Gold',
  coins: 1,
  sessions: {
    coming: 5,
    completed: 5,
  },
  profileCompleted: 0,
  country: { name: 'US' },
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
