import Vue from "vue";
import VueRouter from "vue-router";
import ProjectSpace from "../components/ProjectSpace.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ProjectSpace",
    component: ProjectSpace
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
