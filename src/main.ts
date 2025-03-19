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
      children: [
        {
          path: "",
          component: () => import("./pages/Collections/DefaultCollections.vue"),
        },
        {
          path: "all-time",
          component: () => import("./pages/Collections/AllTimeCollections.vue"),
        },
        {
          path: "season-time",
          component: () => import("./pages/Collections/SeasonCollections.vue"),
        },
      ],
    },
    {
      path: "/anime/:id",
      component: () => import("./pages/anime.vue"),
      props: true,
    },
  ],
});

createApp(RouterView).use(router).mount("body");
