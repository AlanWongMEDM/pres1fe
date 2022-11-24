import axios from 'axios';

const API_URL = 'http://54.251.253.72:3000';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/account/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
