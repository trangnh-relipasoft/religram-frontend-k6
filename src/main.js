import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuelidate from "vuelidate";
import VueTimeago from "vue-timeago";
import TextareaAutosize from "vue-textarea-autosize";
import Croppa from "vue-croppa";
import firebase from "firebase";

require("firebase/firestore");

function debounce(fn, delay = 300) {
  var timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  }
}

// this is where we integrate the v-debounce directive!
// We can add it globally (like now) or locally!
Vue.directive('debounce', (el, binding) => {
  if (binding.value !== binding.oldValue) {
    // window.debounce is our global function what we defined at the very top!
    el.oninput = debounce(ev => {
      el.dispatchEvent(new Event('change'));
    }, parseInt(binding.value) || 300);
  }
});

Vue.use(Croppa);

var firebaseConfig = {
    apiKey: "AIzaSyBFznD3t4-br42HcyI0C8yag4HpbVsdPcA",
    authDomain: "activity-9666b.firebaseapp.com",
    databaseURL: "https://activity-9666b.firebaseio.com",
    projectId: "activity-9666b",
    storageBucket: "activity-9666b.appspot.com",
    messagingSenderId: "595180244337",
    appId: "1:595180244337:web:93fcc68c59ee774474bad0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

window.db = db;

db.settings({
    timestampsInSnapshots: true
});

Vue.config.productionTip = false;


Vue.config.productionTip = false;
Vue.use(VueTimeago, {
    name: "Timeago", // Component name, `Timeago` by default
    locale: "en" // Default locale
});
export const eventBus = new Vue()
Vue.use(Vuelidate);
Vue.use(TextareaAutosize);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
