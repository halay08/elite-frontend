export type Activity = {
  id: string;
  title: string;
  color: string;
};

const activitiesData: Activity[] = [
  {
    id: '1000',
    title: 'You cancelled a session without  tutor’s approval',
    color: '#FF5C00',
  },
  {
    id: '1001',
    title: 'You have an upcoming session',
    color: '#48B2FF',
  },
  {
    id: '1002',
    title: 'You cancelled a session without  tutor’s approval',
    color: '#FF5C00',
  },
  {
    id: '1003',
    title: 'You have an upcoming session',
    color: '#48B2FF',
  },
  {
    id: '1004',
    title: 'You have an upcoming session',
    color: '#48B2FF',
  },
];
export default activitiesData;
