import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/find",
    },
    {
      path: "/zhuce",
      // redirect: '/shouye/nowplaying',
      component: () => import("../views/zhuce"),
    },
    {
      path: "/jump/:id",
      // redirect: '/shouye/nowplaying',
      component: () => import("../views/jump"),
    },
    {
      path: "/music",
      // redirect: '/shouye/nowplaying',
      component: () => import("../views/music"),
    },
    {
      path: "/find",
      // redirect: '/shouye/nowplaying',
      component: () => import("../views/find/index"),
      children: [
        {
          path: "search",
          component: () => import("../views/find/search.vue"),
        },
      ],
    },
    {
      path: "/boke",
      component: () => import("../views/boke/index"),
      children: [
        {
          path: "/bktj",
          component: () => import("../views/bktj/bktj"),
        },
        {
          path: "/bkfl",
          component: () => import("../views/bkfl/bkfl"),
        },
      ],
    },
    {
      path: "/mine",
      component: () => import("../views/mine/index"),
    },
    {
      path: "/kge",
      component: () => import("../views/kge/index"),
    },
    {
      path: "/kgebang",
      component: () => import("../views/kgebang/index"),
    },
    {
      path: "/yuncun",
      component: () => import("../views/yuncun/index"),
    },
    {
      path: "/deng",
      component: () => import("../views/deng"),
    },
  ],
  linkActiveClass: "active",
});

export default router;
