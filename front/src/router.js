import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/Home.vue';
import User from './pages/User.vue';
import NotFound from './pages/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/user/:login', component: User },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
