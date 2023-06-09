import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("menu-user");
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
