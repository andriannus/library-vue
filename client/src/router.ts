import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Register from './views/Register.vue';
import Login from './views/Login.vue';
import LayoutAdmin from './views/LayoutAdmin.vue';
import LayoutUser from './views/LayoutUser.vue';
import HomeAdmin from './views/HomeAdmin.vue';
import HomeUser from './views/HomeUser.vue';
import Book from './views/Book.vue';

Vue.use(Router);

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }

  next('/');
};

const ifAdmin = (to: any, from: any, next: any) => {
  if (store.getters.isAdmin) {
    next();
    return;
  }

  next('/login');
};

const ifUser = (to: any, from: any, next: any) => {
  if (store.getters.ifUser) {
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
      path: '/admin',
      component: LayoutAdmin,
      beforeEnter: ifAdmin,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeAdmin,
          meta: {
            title: 'Dashboard',
          },
        },
        {
          path: 'books',
          name: 'list-books',
          component: Book,
          meta: {
            title: 'List of Books',
          },
        },
      ],
    },
    {
      path: '/',
      component: LayoutUser,
      children: [
        {
          path: '',
          name: 'home-user',
          component: HomeUser,
          meta: {
            title: 'Welcome to Library App',
          },
        },
      ],
    },
  ],
});
