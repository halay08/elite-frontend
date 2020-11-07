import BaseService from './baseService';
import { Session } from 'types/Session';
import { Course, mockCourse1, mockCourse2 } from 'types/Course';

class CourseService extends BaseService {
  async getAll(): Promise<Array<Course>> {
    if (process.env.REACT_APP_USE_MOCK) return [mockCourse1, mockCourse2];
    return [];
  }

  async getSessionsByCourse(
    id: number,
    dateStart?: Date,
    dateEnd?: Date,
  ): Promise<Array<Session>> {
    if (process.env.REACT_APP_USE_MOCK)
      return (
        [mockCourse1, mockCourse2].find(course => course.id === id)?.sessions ||
        []
      );
    return [];
  }
}

export default new CourseService('course');
