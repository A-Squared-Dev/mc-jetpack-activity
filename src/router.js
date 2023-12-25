import { createRouter, createWebHistory } from 'vue-router';

const configModal = () => import(/* webpackChunkName: "configModal" */ '@/views/configModal.vue');
const runningHover = () => import(/* webpackChunkName: "runningHover" */ '@/views/runningHover.vue');
const runningModal = () => import(/* webpackChunkName: "runningModal" */ '@/views/runningModal.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: configModal },
    { path: '/hover', component: runningHover },
    { path: '/modal', component: runningModal }
  ]
});

export default router;
