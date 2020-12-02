import { Session, mockSession1, mockSession2 } from './Session';

export enum TutorSessionStatus {
  AVAILABLE = 0,
  BOOKED = 1, // UNAVAILABLE
  CANCELLED = 2,
  PENDING = 3,
  COMPLETED = 4,
}

type ICoursePolicyCondition = {
  allow: boolean;

  condition?: number;

  refundPercent?: number;
};

type ICoursePolicy = {
  freeFirstCourse: ICoursePolicyCondition;

  // Allow to cancel course before starting
  cancelBeforeStarting: ICoursePolicyCondition;

  // Allow to cancel course while it's in progress
  cancelInProgress: ICoursePolicyCondition;

  // Allow to cancel session before the course starts
  cancelSessionBeforeStarting: ICoursePolicyCondition;

  // Allow to cancel session while the course is in progress
  cancelSessionInProgress: ICoursePolicyCondition;
};

export type Course = {
  id: number;

  name: string;

  sessions: Session[];

  totalCost: number;

  status: TutorSessionStatus;

  policies: ICoursePolicy;
};

export const mockCourse1 = {
  id: 1,
  name: 'Speaking English fluently',
  sessions: [mockSession1],
  status: TutorSessionStatus.AVAILABLE,
  totalCost: 232,
  policies: {
    freeFirstCourse: {
      allow: true,
    },
    cancelBeforeStarting: {
      allow: false,
    },
    cancelInProgress: {
      allow: true,
      condition: 2,
      refundPercent: 50,
    },
    cancelSessionBeforeStarting: {
      allow: false,
    },
    cancelSessionInProgress: {
      allow: false,
    },
  },
};

export const mockCourse2 = {
  id: 2,
  name: 'Get started with React TS',
  sessions: [mockSession1, mockSession2],
  status: TutorSessionStatus.AVAILABLE,
  totalCost: 456,
  policies: {
    freeFirstCourse: {
      allow: false,
    },
    cancelBeforeStarting: {
      allow: true,
      refundPercent: 70,
    },
    cancelInProgress: {
      allow: true,
      condition: 2,
      refundPercent: 50,
    },
    cancelSessionBeforeStarting: {
      allow: false,
    },
    cancelSessionInProgress: {
      allow: false,
    },
  },
};
