import { createWebHistory, createRouter } from "vue-router";
import mainPage from "@/components/mainPage.vue";
import stock from "@/components/stock.vue";
import knowledge from "@/components/knowledge.vue";
import hotwarn from "@/components/hotwarn.vue";

const routes = [
  {
    path: "/",
    name: "mainPage",
    component: mainPage,
  },
  {
    path: "/stock",
    name: "stock",
    component: stock,
  },
  {
    path: "/knowledge",
    name: "knowledge",
    component: knowledge,
  },
  {
    path: "/hotwarn",
    name: "hotwarn",
    component: hotwarn,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;