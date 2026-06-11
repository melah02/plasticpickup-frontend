import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const routes = [
  { path: "/", component: () => import("../views/Landing.vue") },
  { path: "/login", component: () => import("../views/Login.vue") },
  { path: "/register", component: () => import("../views/Register.vue") },
  {
    path: "/dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/request",
    component: () => import("../views/PickupRequest.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/history",
    component: () => import("../views/History.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    component: () => import("../views/AdminDashboard.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (auth.token && !auth.user) {
    await auth.fetchProfile();
  }

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return "/login";
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return "/dashboard";
  }
});

export default router;
