import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Payment from "../views/Payment.vue"
import Contracts from "../views/ContractsBoard.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/contracts",
    name: "Contracts",
    component: Contracts,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
