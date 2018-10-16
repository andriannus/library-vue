import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Header from './views/Header.vue';
import Home from './views/Home.vue';
import Book from './views/Book.vue';

Vue.use(Router);

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }

  next('/');
};

const ifAuhenticated = (to: any, from: any, next: any) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }

  next('/login');
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: ifNotAuthenticated,
      meta: {
        title: 'Register',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/',
      component: Header,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          beforeEnter: ifAuhenticated,
          meta: {
            title: 'Dashboard',
          },
        },
      ],
    },
    {
      path: '/books',
      component: Header,
      children: [
        {
          path: '',
          name: 'list-books',
          component: Book,
          beforeEnter: ifAuhenticated,
          meta: {
            title: 'List of Books',
          },
        },
      ],
    },
  ],
});
