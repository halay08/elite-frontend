import { Tutor, mockTutor } from './Tutor';

export enum CostType {
  CASH = 'cash',
  COINT = 'coin',
}

type ISessionTime = {
  hour: number;

  minute: number;

  second?: number;
};

export type Session = {
  topicName: string;

  tutor: NonNullable<Tutor>;

  date: Date;

  startTime: ISessionTime;

  /**
   * Time for the session (minute)
   */
  duration: number;

  /**
   * [2020-10-19,2020-10-20,...]
   */
  repeatOn: Date[];

  /**
   * The cost of session, including service fee, tax
   */
  cost: number;

  /**
   * We might consider to use credit-coin to sell the session
   */
  costType: CostType;
};

export const mockSession1: Session = {
  topicName: 'Improve your English community',
  tutor: mockTutor,
  date: new Date('2020/11/1'),
  startTime: {
    hour: 9,
    minute: 0,
  },
  duration: 60,
  repeatOn: [
    new Date('2020/11/2'),
    new Date('2020/11/5'),
    new Date('2020/11/6'),
    new Date('2020/11/9'),
    new Date('2020/11/11'),
    new Date('2020/11/12'),
    new Date('2020/11/13'),
  ],
  cost: 22,
  costType: CostType.CASH,
};

export const mockSession2: Session = {
  topicName: 'Traning Logical thinking',
  tutor: mockTutor,
  date: new Date('2020/11/1'),
  startTime: {
    hour: 14,
    minute: 0,
  },
  duration: 120,
  repeatOn: [
    new Date('2020/11/3'),
    new Date('2020/11/4'),
    new Date('2020/11/6'),
    new Date('2020/11/8'),
    new Date('2020/11/9'),
    new Date('2020/11/10'),
    new Date('2020/11/13'),
  ],
  cost: 22,
  costType: CostType.CASH,
};
