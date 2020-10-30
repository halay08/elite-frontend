import BaseService from './baseService';
import { mockTutor, Tutor } from 'types/Tutor';

class TutorService extends BaseService {
  async getRecommendedTutors(): Promise<Array<Tutor>> {
    if (process.env.REACT_APP_USE_MOCK) return Array<Tutor>(4).fill(mockTutor);
    return [];
  }

  async getOnlineTutors(): Promise<Array<Tutor>> {
    if (process.env.REACT_APP_USE_MOCK) return Array<Tutor>(13).fill(mockTutor);
    return [];
  }

  async getAllTutors(): Promise<Array<Tutor>> {
    if (process.env.REACT_APP_USE_MOCK) return Array<Tutor>(20).fill(mockTutor);
    return [];
  }
}

export default new TutorService('tutors');
