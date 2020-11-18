import { User, mockUser } from './User';

type ICategory = {
  name: string;
};

type IEducationMedia = {
  url: NonNullable<string>;
};

type IEducation = {
  start_date: Date;

  end_date: Date;

  is_present_learning: boolean;

  school_name: string;

  media?: IEducationMedia[];

  location?: string;
};

export type IExpertise = {
  name: string;

  level: string;
};

type ICertificate = {
  name: NonNullable<string>;

  url: string;

  description?: string;

  /**
   * Status: approved or not
   */
  status: NonNullable<boolean>;
};

type IContracts = {
  name: string;

  url: string;

  signature: string;

  description?: string;

  signed_date: string;

  updated_date?: string;
};

enum DocumentType {
  CURRICULUM = 'curriculum',
  SLIDE = 'slide',
  MEDIA = 'media',
  BOOK = 'book',
  OTHER = 'other',
}

type IDocument = {
  id: string;

  name: NonNullable<string>;

  type: DocumentType;

  url: string;

  description?: string;
};

enum TutorStatus {
  INVISIBLE = 0,
  ACTIVE = 1,
  AWAY = 2,
  BUSY = 3,
}

export type Tutor = User & {
  category: ICategory;

  educations: IEducation[];

  expertises: IExpertise[];

  certificates: ICertificate[];

  contracts?: IContracts[];

  documents?: IDocument[];

  followers?: NonNullable<number>;

  happyUsers?: NonNullable<number>;

  reviews?: NonNullable<number>;

  serviceFee?: NonNullable<number>;

  activeStatus: TutorStatus;
};

export const mockTutor = {
  ...mockUser,
  category: {
    name: 'Information Technology',
  },
  educations: [
    {
      start_date: new Date('2019/1/1'),
      end_date: new Date('2020/1/1'),
      is_present_learning: false,
      school_name: 'DUE',
    },
    {
      start_date: new Date('2020/1/1'),
      end_date: new Date(),
      is_present_learning: true,
      school_name: 'Elite',
    },
  ],
  expertises: [
    {
      name: 'IOS',
      level: '5+ years in IOS developer',
    },
    {
      name: 'Android',
      level: '5+ years in Android developer',
    },
  ],
  certificates: [],
  contracts: [],
  documents: [],
  followers: 100,
  happyUsers: 50,
  reviews: 100,
  serviceFee: 100,
  activeStatus: 1,
};
