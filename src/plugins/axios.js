'use strict';

import Vue from 'vue';
import axios from 'axios';
import store from '@/store';

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control

  // if set to `true` let axios to handle and show errors with snackbars.
  // if you don't want to show error with snackbars or want
  // to handle errors differntly, you should set defaultErrorHandler to
  // `false` in your request config.
  defaultErrorHandler: true,
};

const _axios = axios.create(config);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    if (error.config.defaultErrorHandler === false) {
      return Promise.reject(error);
    }
    if (error.response) {
      store.commit('snackbar/showSnackbar', {
        text: error.response.data.message,
      });
    } else {
      store.commit('snackbar/showSnackbar', {
        text: error.message,
      });
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
