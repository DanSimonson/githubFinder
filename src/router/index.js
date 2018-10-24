import Vue from "vue";
import Router from "vue-router";
import Searchme from "@/components/Searchme";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Searchme",
      component: Searchme
    }
  ]
});
