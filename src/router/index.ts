import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import WelcomeView from "../views/WelcomeView.vue";

const routes = [
    { path: "/", name: "home", component: HomeView },
    { path: "/favorites", name: "favorites", component: FavoritesView },
    { path: "/welcome", name: "welcome", component: WelcomeView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
