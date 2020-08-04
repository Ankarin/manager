import Vue from "vue";
import VueRouter from "vue-router";
// import ProjectSpace from "../components/ProjectSpace.vue";
import AppView from "../components/AppView.vue";
import Summary from "../components/Summary.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AppView",
    component: AppView
  },
  {
    path: "/summary",
    name: "Summary",
    component: Summary
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
