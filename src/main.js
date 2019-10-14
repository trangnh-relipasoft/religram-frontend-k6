import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuelidate from "vuelidate";
import VueTimeago from "vue-timeago";

Vue.config.productionTip = false;
Vue.use(VueTimeago, {
  name: "Timeago", // Component name, `Timeago` by default
  locale: "en" // Default locale
});
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
