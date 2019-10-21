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
Vue.use(Vuelidate);
Vue.use(TextareaAutosize);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
