import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('Home'),
  },
  {
    path: '/register',
    name: 'Register',
    component: loadView('Register'),
  },
  {
    path: '/login',
    name: 'Login',
    component: loadView('Login'),
  },
  {
    path: '/weight',
    name: 'Weight',
    component: loadView('WeightPage'),
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: loadView('SchedulePage'),
  },
  {
    path: '/404',
    name: '404',
    component: loadView('404'),
  },
  {
    path: '*',
    redirect: '404',
  },
];

function loadView(view) {
  return () => import(`@/views/${view}.vue`);
}

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
