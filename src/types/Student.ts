import { User, mockUser } from './User';

export type Student = User & {
  studyTitle?: string;

  studyPlace?: string;

  jobTitle?: string;

  jobPlace?: string;

  followings?: any;
};

export const mockStudent: Student = {
  ...mockUser,
  studyTitle: 'IT',
  studyPlace: 'DUT',
  jobTitle: 'Developer',
  jobPlace: 'Elite',
};
