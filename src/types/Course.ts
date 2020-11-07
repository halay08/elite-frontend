import { Session, mockSession1, mockSession2 } from './Session';

export enum TutorSessionStatus {
  AVAILABLE = 0,
  BOOKED = 1, // UNAVAILABLE
  CANCELLED = 2,
  PENDING = 3,
  COMPLETED = 4,
}

export type Course = {
  id: number;

  name: string;

  sessions: Session[];

  totalCost: number;

  status: TutorSessionStatus;

  policies?: unknown;
};

export const mockCourse1 = {
  id: 1,
  name: 'Speaking English fluently',
  sessions: [mockSession1],
  status: TutorSessionStatus.AVAILABLE,
  totalCost: 232,
};

export const mockCourse2 = {
  id: 2,
  name: 'Get started with React TS',
  sessions: [mockSession1, mockSession2],
  status: TutorSessionStatus.AVAILABLE,
  totalCost: 456,
};
