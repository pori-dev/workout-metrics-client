import Repository from './repository';

const resource = 'auth';
export default {
  login(email, password) {
    return Repository.post(`${resource}/login`, {
      email,
      password,
    });
  },

  register(email, password) {
    return Repository.post(`${resource}/register`, {
      email,
      password,
    });
  },

  logout() {
    return Repository.post(`${resource}/logout`);
  },
};
