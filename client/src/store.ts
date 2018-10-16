import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'http://localhost:8081/api/v1/';

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('t-t') || '',
    user: JSON.parse(localStorage.getItem('u-d') || '{}'),
    status: '',
  },

  mutations: {
    AUTH_REQUEST: (state) => {
      state.status = 'loading';
    },

    AUTH_SUCCESS: (state, token) => {
      state.status = 'success';
      state.token = token;
    },

    AUTH_ERROR: (state) => {
      state.status = 'error';
    },

    AUTH_LOGOUT: (state) => {
      state.token = '';
      state.user = '';
      state.status = '';
    },

    USER_DATA: (state, user) => {
      state.user = user;
    },
  },

  actions: {
    AUTH_REQUEST: ({commit}, userData) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        axios.post('auth/login', userData)
          .then((res) => {
            if (res.data.status == 404) {
              let message = 'User not found';
              reject(message);
            }

            if (res.data.status == 401) {
              let message = 'Password does not match';
              reject(message);
            }

            if (res.data.status == 200) {
              const token = res.data.token;
              const user = JSON.stringify(res.data.user);

              localStorage.setItem('t-t', token);
              localStorage.setItem('u-d', user);

              commit('AUTH_SUCCESS', token);
              commit('USER_DATA', user);
              resolve(res);
            }
          })
          .catch((err) => {
            localStorage.removeItem('t-t');
            reject(err);
          });
      });
    },

    AUTH_LOGOUT: ({commit}) => {
      return new Promise((resolve) => {
        commit('AUTH_LOGOUT');

        localStorage.removeItem('t-t');
        localStorage.removeItem('u-d');

        delete axios.defaults.headers.common['t-t'];
        resolve();
      });
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token, // return boolean
    authStatus: (state) => state.status,
  },
});
