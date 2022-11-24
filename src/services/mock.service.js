import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://54.251.253.72:3000';

class MockService {
  mock() {
    return axios.get(API_URL + '/mock', { headers: authHeader() });
  }

  mockform(id) {
    return axios.get(API_URL + '/mock/'+id, { headers: authHeader() });
  }

}

export default new MockService();
