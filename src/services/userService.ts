import BaseService from './baseService';
import { Student } from 'types/Student';

class UserService extends BaseService {
  async get(_id: String) {
    if (!_id) return {};
    try {
      const url = `${this.baseUrl}/${_id}`;
      const data = this.requestWithToken('GET', url);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async update(_id: String, user: Student) {
    if (!_id) return {};
    try {
      const url = `${this.baseUrl}/${_id}`;
      const requestOption = { payload: user };
      const data = this.requestWithToken('PUT', url, requestOption);
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService('users');
