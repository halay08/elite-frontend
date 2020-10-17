import { User } from './User';

export type Student = {
  user: User;

  studyTitle?: string;

  studyPlace?: string;

  jobTitle?: string;

  jobPlace?: string;

  followings?: any;
};
