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
