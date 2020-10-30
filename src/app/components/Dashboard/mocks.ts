import { User } from 'types/User';

const rows = [
  {
    id: 1,
    date: '05/08',
    day: 'Wed',
    session: '8:00 - 8:30',
    tutor: 'Vanessa N. (Ireland)',
  },
  {
    id: 2,
    date: '05/08',
    day: 'Wed',
    session: '8:00 - 8:30',
    tutor: 'Vanessa N. (Ireland)',
  },
  {
    id: 3,
    date: '05/08',
    day: 'Wed',
    session: '8:00 - 8:30',
    tutor: 'Vanessa N. (Ireland)',
  },
];

export const sessions = {
  upcoming: rows,
  completed: rows,
};

export type SessionData = {
  id: number;
  date: string;
  day: string;
  session: string;
  tutor: string;
};

export type TutorData = User & {
  id: string;
  country: string;
  stars: number;
};

export const recommendedTutors: TutorData[] = [
  {
    id: 'abc1',
    avatar:
      'https://lh3.googleusercontent.com/a-/AOh14GjyuVvwBsYXJ5mkY6dTG414E2Mfbk2fw9MYEyoe=s96-c',
    name: 'Niall',
    surname: 'Back',
    country: 'United Kingdom',
    stars: 126,
    coins: 0,
    sessions: {
      coming: 0,
      completed: 0,
    },
    profileCompleted: 0,
  },
  {
    id: 'abc2',
    avatar:
      'https://lh3.googleusercontent.com/a-/AOh14GjyuVvwBsYXJ5mkY6dTG414E2Mfbk2fw9MYEyoe=s96-c',
    name: 'Vanessa',
    surname: 'Niall',
    country: 'United State',
    stars: 80,
    coins: 0,
    sessions: {
      coming: 0,
      completed: 0,
    },
    profileCompleted: 0,
  },
  {
    id: 'abc3',
    avatar:
      'https://lh3.googleusercontent.com/a-/AOh14GjyuVvwBsYXJ5mkY6dTG414E2Mfbk2fw9MYEyoe=s96-c',
    name: 'Scott',
    surname: 'Ham',
    country: 'Australia',
    stars: 50,
    coins: 0,
    sessions: {
      coming: 0,
      completed: 0,
    },
    profileCompleted: 0,
  },
];
