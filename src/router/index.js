import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    exact: true,
  },
  {
    path: '/weight',
    name: 'Weight',
    component: () => import('../views/WeightPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Register') {
    return next();
  }

  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated !== 'true' && to.name !== 'Login') {
    next({ name: 'Login', query: { redirectTo: to.path } });
  } else {
    next();
  }
});
export default router;
