import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../layout/Main'),
  },
  {
    path: '/pick',
    component: () => import('../views/SpoonPick'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
