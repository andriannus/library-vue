import Vue from 'vue';
import Router from 'vue-router';
import Header from './views/Header.vue';
import Home from './views/Home.vue';
import Book from './views/Book.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Header,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
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
          meta: {
            title: 'List of Books',
          },
        },
      ],
    },
  ],
});
