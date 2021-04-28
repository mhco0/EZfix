import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ToContract from "../views/ToContract.vue";
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
    path: "/tocontract/:provider_id",
    name: "ToContract",
    component: ToContract,
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
