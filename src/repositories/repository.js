'use strict';

import axios from 'axios';
import store from '@/store';
import router from '@/router';

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control

  // if set to `true` let axios to handle and show errors with snackbars.
  // if you don't want to show error with snackbars or want
  // to handle errors differntly, you should set isHandlerEnabled to
  // `false` in your request config.
  isHandlerEnabled: true,
};

const _axios = axios.create(config);

// Add a response interceptor
_axios.interceptors.response.use(null, function(error) {
  // if there is no response from the API
  if (!error.response) {
    store.commit('snackbar/showSnackbar', {
      text: error.message,
    });
    return Promise.reject();
  }

  const { status, config } = error.response;
  // if is unauthorized, send a request to refresh token to
  // get a new access token. If refresh token is not valid
  // redirects it to login page. If it is valid returns

  const isAuthEndpont = config.url.includes('auth/');
  if (
    status === 401 &&
    /* not send request to refresh token
     * if the request is sent to an auth
     * endpoint like: login, logout, register
     */
    !isAuthEndpont
  ) {
    return _axios
      .post('auth/refresh-token')
      .then(() => {
        localStorage.setItem('isAuthenticated', true);
        return _axios.request(error.config);
      })
      .catch(() => {
        localStorage.setItem('isAuthenticated', false);
        router.push({ name: 'Login' });
      });
  }

  if (!error.config.isHandlerEnabled) {
    return Promise.reject(error);
  } else {
    store.commit('snackbar/showSnackbar', {
      text: error.response.data.message,
    });
  }

  return Promise.reject(error);
});
export default _axios;
