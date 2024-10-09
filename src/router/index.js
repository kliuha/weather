import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import FavoritsPage from "@/views/FavoritsPage.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;