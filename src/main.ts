import { createApp } from "vue";
import { createRouter, createWebHistory, RouterView } from "vue-router";

import "./main.css";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("./pages/index.vue") },
        {
            path: "/collections",
            component: () => import("./pages/collections.vue"),
        },
    ],
});

createApp(RouterView).use(router).mount("body");
