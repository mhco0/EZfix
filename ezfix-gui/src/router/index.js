import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ToContract from "../views/ToContract.vue";

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
];

const router = new VueRouter({
  routes,
});

export default router;
