import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vuelidate from 'vuelidate';
import VModal from 'vue-js-modal'

Vue.use(VModal, {dynamic: true, injectModalsContainer: true });
Vue.config.productionTip = false;
Vue.use(Vuelidate);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
