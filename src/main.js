import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vuelidate from 'vuelidate'
import "../public/css/style.css"
import "../public/css/font-awesome.css"
import '../public/images/avatar-person.jpg'
import '../public/images/btn-like_01.png'
import '../public/images/btn-like_02.png'
import '../public/images/btn-like_03.png'
import '../public/images/btn-like.png'
import '../public/images/btn-message.png'
import '../public/images/btn-next.png'
import '../public/images/btn-prev.png'
import '../public/images/btn-upload.png'
import '../public/images/footer-icon-home.png'
import '../public/images/footer-icon-my-page.png'
import '../public/images/footer-icon-plus.png'
import '../public/images/image-thumb.jpg'


Vue.config.productionTip = false;
Vue.use(Vuelidate);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
