import BaseService from './baseService';
import { Student } from 'types/Student';
import { SignUpUser } from 'types/User';

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

  async signUp(user: SignUpUser) {
    try {
      const url = this.baseUrl;
      const data = this.requestWithoutToken('POST', url, { payload: user });
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService('users');
