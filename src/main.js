import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuelidate from "vuelidate";
import VueTimeago from "vue-timeago";
import TextareaAutosize from 'vue-textarea-autosize'

Vue.config.productionTip = false;
Vue.use(VueTimeago, {
  name: "Timeago", // Component name, `Timeago` by default
  locale: "en" // Default locale
});
Vue.use(Vuelidate);
Vue.use(TextareaAutosize)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
